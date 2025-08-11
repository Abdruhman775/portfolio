import express from 'express';
import fs from 'fs';
import 'dotenv/config';
import cors from 'cors';
import multer from 'multer';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __filename & __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));

// MongoDB connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('❌ MONGODB_URI environment variable not set');
  process.exit(1);
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// ====== MODELS ====== //
const settingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed }
});
const Setting = mongoose.model('Setting', settingSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// ====== UPLOADS ====== //
const uploadFolder = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}
app.use('/uploads', express.static(uploadFolder));

const createStorage = (prefix) => multer.diskStorage({
  destination: uploadFolder,
  filename: (_req, file, cb) => {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${prefix}-${suffix}${path.extname(file.originalname)}`);
  },
});

const uploadProjectImage = multer({ storage: createStorage('project-image') });

// ====== ROUTES ====== //

// Health-check
app.get('/', (_req, res) => {
  res.send('Backend server is running. Use /data, /login, or upload endpoints.');
});

// GET /data
app.get('/data', async (_req, res) => {
  try {
    const settings = await Setting.find({});
    const result = {};
    settings.forEach(s => {
      result[s.key] = s.value;
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// POST /data
app.post('/data', async (req, res) => {
  try {
    const updates = req.body;
    const keys = Object.keys(updates);
    await Promise.all(
      keys.map(key =>
        Setting.findOneAndUpdate(
          { key },
          { value: updates[key] },
          { upsert: true, new: true }
        )
      )
    );
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error in POST /data:', error.message);
    res.status(500).json({ error: 'Failed to update data' });
  }
});

// POST /login (MongoDB authentication)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.json({ message: 'Login successful', user: { username: user.username } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /upload-project-image
app.post('/upload-project-image', uploadProjectImage.single('projectImage'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

// ====== START SERVER ====== //
app.listen(PORT, '0.0.0.0', () =>
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
);

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI environment variable not set');
  process.exit(1);
}

// remove deprecated options
mongoose.connect(mongoUri).then(() => {
  console.log('Connected to MongoDB');
  migrateData();
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Define Setting schema and model
const settingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed }
});
const Setting = mongoose.model('Setting', settingSchema);

async function migrateData() {
  try {
    // Read JSON data from file
    const dataPath = path.join(__dirname, 'data', 'dynamicData.json');
    let jsonData;
    try {
      const fileContent = fs.readFileSync(dataPath, 'utf-8');
      jsonData = JSON.parse(fileContent);
    } catch (err) {
      console.warn('Could not read dynamicData.json file, using hardcoded data');
      // <your hardcoded fallback here (kept short in this example)>
       jsonData = {
        "profile": {
          "name": "Raad Alzaeem",
          "title": "Full Stack Developer & Gamer",
          "description": "Passionate developer with experience in building web applications.",
          "image": "",
          "email": "alzaeemraad7@gmail.com",
          "bio": "Experienced in React, Node.js, and database management. Na",
          "phone": "+91 9318395822",
          "githubLink": "asfsf",
          "linkedinLink": "asffa",
          "instagramLink": "afsa",
          "twitterLink": "da",
          "resumePdf": "https://portfolio-5xxf.onrender.com/uploads/resume.pdf",
          "location": "Sanaa",
          "aboutMeText": "raad",
          "whoAmIText": "raad want to extend my current theme toggling (dark mode/light mode) by adding theme presets in the Admin Settings page.\nThere should be at least three predefined theme presets — each preset having a cohesive color palette.\n\nd",
          "footerCopyrightText": "@ 2025 Raad Alzaeem All Right Reserved",
          "footerDesignCreditText": "Designed with React",
          "profileimage": "https://portfolio-5xxf.onrender.com/uploads/profile-image-1745778390278-237421215.jpg",
          "showInteractiveBalls": true
        },
        "users": [
          {
            "username": "Raad",
            "password": "123"
          }
        ],
        "projects": [
          {
            "id": "1",
            "title": "Project One",
            "description": "saleh",
            "image": "",
            "tags": [
              "React",
              "Node.js"
            ],
            "demoUrl": "https://projectone.demo",
            "repoUrl": "https://github.com/johndoe/projectone",
            "featured": true
          },
          {
            "id": "1745528823795qm752xsl2",
            "title": "Frontend Developer & UI/UX Designer",
            "description": "emad",
            "image": "",
            "tags": [
              "fafa"
            ],
            "featured": true,
            "repoUrl": "haj"
          },
          {
            "id": "1745530059501kc5phlsoz",
            "title": "zuuppy",
            "description": "zuppy almuzabzb",
            "image": "asf",
            "tags": [
              "kjflljlhas"
            ],
            "featured": false
          }
        ],
        "experience": [
          {
            "id": "1",
            "title": "Software Engineer",
            "company": "Tech Company",
            "location": "New York",
            "role": "Developer",
            "type": "Full-time",
            "startDate": "2020-01-01",
            "endDate": null,
            "description": "Hallo"
          },
          {
            "id": "17455301400417fpa6c0r1",
            "title": "muzapzap",
            "company": "zuppy",
            "location": "zuppppy",
            "role": "zuuppy",
            "startDate": "5411-02-15",
            "endDate": "2000-01-01",
            "description": "mdri",
            "type": "work"
          },
          {
            "id": "edu1",
            "title": "Bachelor of Science in Computer Science",
            "company": "delhi",
            "location": "Example City",
            "role": "Computer Science",
            "startDate": "2015-09-01",
            "endDate": "2019-06-30",
            "description": "Studied core computer science concepts and software development.",
            "type": "education"
          },
          {
            "id": "edu2",
            "title": "Master of Science in Software Engineering",
            "company": "Example Institute of Technology",
            "location": "Example City",
            "role": "Software Engineering",
            "startDate": "2019-09-01",
            "endDate": "2021-06-30",
            "description": "Focused on advanced software engineering principles and project management.",
            "type": "education"
          }
        ],
        "skills": [
          {
            "id": "1",
            "title": "Hallo",
            "description": "messi",
            "percentage": 37,
            "icon": null},
          {
            "id": "2",
            "title": "UI/UX Design",
            "description": "Creating intuitive interfaces with a focus on usability, accessibility, and aesthetics.",
            "percentage": 100,
            "icon": null
          },
          {
            "id": "3",
            "title": "Visual Design",
            "description": "Crafting beautiful visual systems with attention to typography, color, and composition.",
            "percentage": 81,
            "icon": null
          },
          {
            "id": "4",
            "title": "Brand Identity",
            "description": "Developing cohesive brand identities that communicate the essence of a product or company.",
            "percentage": 42,
            "icon": null
          },
          {
            "id": "1745765750167",
            "title": "mal ",
            "description": "hjaskfh",
            "percentage": 27,
            "icon": null
          }
        ],
        "messages": [
          {
            "id": "1745575415409kxtiwdfvc",
            "date": "2025-04-25T10:03:35.409Z",
            "name": "hgj",
            "email": "alzaeemraad7@gmail.com",
            "content": "sfs"
          },
          {
            "id": "1745576316395b0xbco2mm",
            "date": "2025-04-25T10:18:36.395Z",
            "name": "hgj",
            "email": "alzaeemraad7@gmail.com",
            "content": "hi"
          },
          {
            "id": "1745782991456vc0n2d9v1",
            "date": "2025-04-27T19:43:11.456Z",
            "name": "hgj",
            "email": "alzaeemraad7@gmail.com",
            "content": "hiiiiiiiiiiiiiiiii"
          }
        ]
      };

    }

    // Upsert each top-level key and value into Setting collection
    const keys = Object.keys(jsonData);
    for (const key of keys) {
      await Setting.findOneAndUpdate(
        { key },
        { value: jsonData[key] },
        { upsert: true, new: true }
      );
      console.log(`Migrated key: ${key}`);
    }

    console.log('Data migration completed successfully.');
  } catch (error) {
    console.error('Data migration failed:', error);
    process.exitCode = 1;
  } finally {
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (e) {
      console.warn('Error while disconnecting:', e);
    }
    process.exit(process.exitCode || 0);
  }
}

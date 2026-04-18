const admin = require('firebase-admin');

// Load service account details from ENV
const isRealKey = process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_PRIVATE_KEY.includes('BEGIN PRIVATE KEY');

const serviceAccountKey = isRealKey
  ? {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }
  : null;

if (serviceAccountKey && !admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
  });
  console.log("Firebase Admin initialized");
} else if (!serviceAccountKey) {
  console.warn("WARNING: Firebase credentials are not fully configured in .env");
}

const db = admin.apps.length ? admin.firestore() : null;

module.exports = { admin, db };

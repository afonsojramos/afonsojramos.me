import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      projectId: process.env.FIREBASE_PROJECT_ID
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}

export default admin.database();

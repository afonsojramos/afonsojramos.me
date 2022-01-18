import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      projectId: 'afonsojramos-me'
    }),
    databaseURL:
      'https://afonsojramos-me-default-rtdb.europe-west1.firebasedatabase.app/'
  })
}

export default admin.database()

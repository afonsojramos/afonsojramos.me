import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      project_id: 'afonsojramos-me'
    }),
    databaseURL:
      'https://afonsojramos-me-default-rtdb.europe-west1.firebasedatabase.app/'
  })
}

export default admin.database()

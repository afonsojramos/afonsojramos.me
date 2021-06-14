import db from '@lib/firebase'

export default async (req, res) => {
  if (req.method === 'GET') {
    const snapshot = await db.ref('views').child(req.query.slug).once('value')
    const views = snapshot.val()

    return res.status(200).json({ total: views })
  }

  if (req.method === 'POST') {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const ref = db.ref('views').child(req.query.slug)
    const { snapshot } = await ref.transaction((currentViews) => {
      if (currentViews === null) {
        return '–––'
      }

      return currentViews + 1
    })

    return res.status(200).json({
      total: snapshot.val(),
    })
  }
}

import db from '@lib/firebase'
import { NextApiRequest, NextApiResponse } from 'next'
import { ViewsTotalInterface } from '../interfaces/firebase.interface'

const views = async (
  _req: NextApiRequest,
  res: NextApiResponse<ViewsTotalInterface>
) => {
  const snapshot = await db.ref('views').once('value')
  const views: number = snapshot.val()
  const allViews = Object.values(views).reduce((total, value) => total + value)

  console.log(snapshot)
  console.log(views)
  console.log(allViews)

  return res.status(200).json({ total: allViews })
}

export default views

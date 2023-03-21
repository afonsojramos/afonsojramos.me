import db from 'lib/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IViewsTotal } from 'interfaces/firebase';

const slugViews = async (
  req: NextApiRequest,
  res: NextApiResponse<IViewsTotal>
) => {
  if (!req.query.slug) return res.status(400).json({ total: -1 });

  const ref =
    req.query.slug === 'home'
      ? db.ref('home')
      : db.ref('views').child(req.query.slug.toString());

  if (req.method === 'GET') {
    const snapshot = await ref.once('value');
    const views = snapshot.val();

    return res.status(200).json({ total: views });
  }

  if (req.method === 'POST' && process.env.NODE_ENV === 'production') {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { snapshot } = await ref.transaction((currentViews) => {
      if (currentViews === null) {
        return `———`;
      }

      return currentViews + 1;
    });

    return res.status(200).json({
      total: snapshot.val()
    });
  }
};

export default slugViews;

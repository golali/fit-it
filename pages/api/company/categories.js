import nc from 'next-connect';
import Company from '../../../models/Company';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const categories = await Company.find().distinct('categories');
  await db.disconnect();
  res.send(categories);
});

export default handler;

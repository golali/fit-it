import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const company = await Company.find({});
  await db.disconnect();
  res.send(company);
});

export default handler;

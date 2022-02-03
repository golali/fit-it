import nc from 'next-connect';
import Company from '../../../models/Company';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const comptypes = await Company.find().distinct('companyType');
  await db.disconnect();
  res.send(comptypes);
});

export default handler;

import nc from 'next-connect';
import Company from '../../models/Company';
import db from '../../utils/db';
import data from '../../utils/data';
import User from '../../models/User';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Company.deleteMany();
  await Company.insertMany(data.companies);
  await db.disconnect();
  res.send({ message: 'Mockdata seeded !!' });
});

export default handler;

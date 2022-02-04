import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import Company from '../../../models/Company';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newCompany = new Company({
    companyName: req.body.companyName,
    slug: req.body.companyName,
    companyType: req.body.companyType,
    companyWebsite: req.body.companyWebsite,
    companyLogo: "/images/esentri.jpg",
    companyIndustry: req.body.companyIndustry,
    knowHow: req.body.knowHow,
    description: req.body.description,
  });
  const company = await newCompany.save();
  await db.disconnect();


const token = signToken(user);
res.send("OK Done!");
});

export default handler;

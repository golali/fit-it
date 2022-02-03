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
    companyType: "IT-Consulting",
    companyWebsite: "https://new.comi.com",
    companyLogo: "/images/esentri.jpg",
    companyIndustry: "Government",
    knowHow: ["Google", "AWS", "Scrum"],
  });
  const company = await newCompany.save();
  await db.disconnect();


const token = signToken(user);
res.send("OK Done!");
});

export default handler;

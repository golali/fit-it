import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    companyType: { 
      type: String, 
      enum: ['IT-Consulting', 'Freelancer','Other'],
      required: true },
    companyWebsite: { type: String, required: true },
    companyLogo: { type: String, required: true },
    companyIndustry: { type: String, required: true },
    knowHow: { type: String},
    description: { type: String},
  },
  {
    timestamps: true,
  }
);

const Company = 
  mongoose.models.Company || mongoose.model('Company', companySchema);
 export default Company; 


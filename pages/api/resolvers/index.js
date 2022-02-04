import axios from "axios";

export const resolvers = {
  Query: {
    getCompanies: async () => {
      try {
        const company = await axios.get("http://localhost:3000/api/company");
        return company.data.map(({ id, companyName, companyType, companyWebsite, companyIndustry, knowHow }) => ({
          id,
          companyName,
          companyType,
          companyWebsite, 
          companyIndustry, 
          knowHow 
        }));
      } catch (error) {
        throw error;
      }
    },
  }
};
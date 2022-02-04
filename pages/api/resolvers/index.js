import axios from "axios";

let companyName;
let companyType; 
let companyWebsite; 
let companyIndustry;  
let knowHow;
let description;

//
// B2B - Interface (GraphQL for Creating Companies and Request for Get all Companies)
//
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
  },

  Mutation: {
    createCompany: async (_, args) => {
    try { 
    
    companyName = args.companyName;
    companyType = args.companyType;
    companyWebsite = args.companyWebsite;
    companyIndustry = args.companyIndustry;
    knowHow = args.knowHow;
    description = args.description;
    

    const company = await axios.post('http://localhost:3000/api/users/company', {
        companyName,
        companyType,
        companyWebsite,
        companyIndustry,
        knowHow,
        description,
      });

    } catch (error) {
        throw error;  
    }
    return "company"
    }}
  }

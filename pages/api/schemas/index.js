import  {  gql  }  from  "apollo-server-micro"; 

export  const  typeDefs  =  gql`
    type  Company {
        id: ID
        companyName: String
        companyType: String
        companyWebsite: String
        companyIndustry: String
        knowHow: String
    }

    type  Query {
        getCompanies: [Company]
    }`
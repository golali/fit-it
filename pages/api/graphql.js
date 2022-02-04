import  {  ApolloServer  }  from  "apollo-server-micro";
import  {  typeDefs  }  from  "./schemas";
import  {  resolvers  }  from  "./resolvers";

const  apolloServer  =  new  ApolloServer({  typeDefs,  resolvers  });

export  const  config  =  {
    api:  {
        bodyParser:  false
    }
};

export  default  apolloServer.createHandler({ path:  "/api/graphql"  });

/*
# Write your query here
{
  getCompanies {
    id
    companyName,
    companyType,
    companyWebsite, 
    companyIndustry, 
    knowHow 
  }  
}

# Write your query here

mutation CreateCompany(
  $companyName: String!
  $companyType: String
  $companyWebsite: String
  $companyIndustry: String
  $knowHow: String
  $description: String
	)
{
  createCompany(
    companyName: $companyName
    companyType: $companyType
    companyWebsite: $companyWebsite
    companyIndustry: $companyIndustry
    knowHow: $knowHow
    description: $description
  )
}

QueryVAriable

{
  "companyName": "Abgabe",
  "companyType": "Other",
  "companyWebsite": "www.gouhbuli.com",
  "companyIndustry": "Startup",
  "knowHow": "Kube, Test, Mest", 
  "description":"Bla Bla, ewdwe, wedw"
}
*/  
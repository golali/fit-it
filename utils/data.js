import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  companies: [
    {
      companyName: "Techbold",
      slug: "techbold",
      companyType: "IT-Consulting",
      companyWebsite: "https://www.techbold.at",
      companyLogo: "/images/techbold.jpg",
      companyIndustry: "Government",
      knowHow: "Terraform, AWS, Scrum",
      description: "LOREM IPSUM DERWDQ",
    },
    {
      companyName: "HXS",
      slug: "hxs",
      companyType: "IT-Consulting",
      companyWebsite: "https://www.hxs.at",
      companyLogo: "images/hxs.jpg",
      companyIndustry: "Gopvernment",
      knowHow: "Kubernetes, GoLang, Docker",
    },
    {
      companyName: "Parkside-Interactive",
      slug: "parksideinteractive",
      companyType: "Other",
      companyWebsite: "https://www.parkside-interactive.com",
      companyLogo: "images/parkside.jpg",
      companyIndustry: "Startup",
      knowHow: "Userexperience and Design, Individual Software Development",
    },
    {
      companyName: "Towa-Digital",
      slug: "towadigital",
      companyType: "Other",
      companyWebsite: "https://www.towa-digital.com",
      companyLogo: "/images/towad.jpg",
      companyIndustry: "Startup",
      knowHow: "Digital Solutions, Salesforce Implementation",
    },
    {
      companyName: "Venko",
      slug: "venko",
      companyType: "IT-Consulting",
      companyWebsite: "https://test.de",
      companyLogo: "/images/venko.jpg",
      companyIndustry: "Government",
      knowHow: "Online Marketing, Brand Design, Promo",
    },

    {
      companyName: "Jaggaer",
      slug: "jaggaer",
      companyType: "Other",
      companyWebsite: "https://www.jaggaer.com",
      companyLogo: "/images/jaggaer.jpg",
      companyIndustry: "Government",
      knowHow: "EProcurement, IT Solution, E Contracts",
    },
  
    {
      companyName: "ACP",
      slug: "acp",
      companyType: "IT-Consulting",
      companyWebsite: "https://www.acp.at",
      companyLogo: "/images/acp.jpg",
      companyIndustry: "Startup",
      knowHow: "Security Threat, Digitalization, IT-Portfolio",
    },

    {
      companyName: "HPE",
      slug: "hpe",
      companyType: "IT-Consulting",
      companyWebsite: "https://www.hpe.com",
      companyLogo: "/images/hpe.jpg",
      companyIndustry: "Startup",
      knowHow: "Digital Transformation Support, Cloud Consulting, AI and Dataservice",
    },

    {
      companyName: "This Is DMG",
      slug: "thisisdmg",
      companyType: "Other",
      companyWebsite: "https://www.jaggaer.com",
      companyLogo: "/images/thisisdmg.jpg",
      companyIndustry: "Government",
      knowHow: "Software Solution, Process Definition, User Interface Components",
    },
  ],
};
export default data;

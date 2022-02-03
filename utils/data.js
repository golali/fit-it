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
      companyName: "esentri",
      slug: "esentri",
      companyType: "IT-Consulting",
      companyWebsite: "https://esentri.comi.com",
      companyLogo: "/images/esentri.jpg",
      companyIndustry: "Government",
      knowHow: ["Terraform", "AWS", "Scrum"],
    },
    {
      companyName: "innovate",
      slug: "innovate",
      companyType: "IT-Consulting",
      companyWebsite: "https://innovate-karlsruhe.de",
      companyLogo: "images/innovate.jpg",
      companyIndustry: "Startup",
      knowHow: ["Kubernetes", "GoLang", "Docker"],
    },
    {
      companyName: "Testcompany",
      slug: "test",
      companyType: "IT-Consulting",
      companyWebsite: "https://test.de",
      companyLogo: "/images/innovate.jpg",
      companyIndustry: "Startup",
      knowHow: ["Kubernetes", "GoLang", "Docker"],
    },
    {
      companyName: "Testcompany01",
      slug: "test01",
      companyType: "IT-Consulting",
      companyWebsite: "https://test.de",
      companyLogo: "/images/innovate.jpg",
      companyIndustry: "Startup",
      knowHow: ["Kubernetes", "GoLang", "Docker"],
    },
    {
      companyName: "Testcompany02",
      slug: "test02",
      companyType: "IT-Consulting",
      companyWebsite: "https://test.de",
      companyLogo: "/images/innovate.jpg",
      companyIndustry: "Startup",
      knowHow: ["Kubernetes", "GoLang", "Docker"],
    },
  
  ],
};
export default data;

/* eslint-disable @next/next/no-img-element */
import NextLink from 'next/link';
import { Grid, Link, Typography } from '@material-ui/core';
import Layout from '../components/Layout';
import db from '../utils/db';
import Company from '../models/Company';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import CompanyItem from '../components/CompanyItem';
import useStyles from '../utils/styles';

export default function Home(props) {
  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { allcompanies } = props;

  console.log(allcompanies);
  return (
    <Layout>
      <Typography variant="h2">All Companies</Typography>
      <Grid container spacing={3}>
        {allcompanies.map((company) => (
          <Grid item md={4} key={company.name}>
            <CompanyItem
              company={company}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const companyDocs = await Company.find({}).lean();
  console.log("CompanyDocs=" + companyDocs[0]);
  await db.disconnect();
  return {
    props: {
      allcompanies: companyDocs.map(db.convertDocToObj),
    },
  };
}

import React, { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
} from '@material-ui/core';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Layout from '../../components/Layout';
import useStyles from '../../utils/styles';
import Company from '../../models/Company';
import db from '../../utils/db';
import axios from 'axios';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

export default function CompanyScreen(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { company } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  if (!company) {
    return <div>Company could not be found</div>;
  }

  return (
    <Layout title={company.companyName} description={company.companyType}>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h2">
                Company Name
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <Typography>Company Type</Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <Typography >Company Website </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <Typography >Company Industry</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h2" style={{color: "#802030"}}>
                {company.companyName}
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <Typography style={{color: "#802030"}}>{company.companyType}</Typography>
            </ListItem>
            <Divider />
            <ListItem>
                <Typography >
                  <Link style={{color: "#802030"}}>{company.companyWebsite}</Link>
                </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <Typography style={{color: "#802030"}}>{company.companyIndustry}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={5}>
        <Typography component="h1" variant="h2">
                Description
              </Typography>
          <Card>
          <CardMedia
          component="img"
          image={company.companyLogo}
          height="120"
          width="100"
          alt={company.companyName}
        ></CardMedia>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Description</Typography>
                    <Typography style={{color: "#802030"}}>{company.description}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
      <div className={classes.absolute}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>back to all companies</Typography>
          </Link>
        </NextLink>
      </div>  
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const company = await Company.findOne({ slug }).lean();
  console.log(company);
  await db.disconnect();
  return {
    props: {
      company: db.convertDocToObj(company),
    },
  };
}

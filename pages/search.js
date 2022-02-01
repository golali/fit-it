import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import db from '../utils/db';
import Company from '../models/Company';
import useStyles from '../utils/styles';
import CompanyItem from '../components/CompanyItem';
import { Store } from '../utils/Store';
import axios from 'axios';
import { Pagination } from '@material-ui/lab';

const PAGE_SIZE = 3;



export default function Search(props) {
  const classes = useStyles();
  const router = useRouter();
  const { query = 'all', comptype = 'all',} = router.query;
  const { companies, countProducts, comptypes, pages } = props;

  const filterSearch = ({
    page,
    comptype,
    searchQuery,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (searchQuery) query.searchQuery = searchQuery;
    if (comptype) query.comptype = comptype;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const comptypeHandler = (e) => {
    filterSearch({ comptype: e.target.value });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };
 
  const { state, dispatch } = useContext(Store);
  
  return (
    <Layout title="Search">
      <Grid className={classes.mt1} container spacing={1}>
        <Grid item md={4}>
          <List>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Categories</Typography>
                <Select fullWidth value={comptype} onChange={comptypeHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {comptypes &&
                    comptypes.map((comptype) => (
                      <MenuItem key={comptype} value={comptype}>
                        {comptype}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={9}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {companies.length === 0 ? 'No' : countProducts} Results
              {query !== 'all' && query !== '' && ' : ' + query}
              {comptype !== 'all' && ' : ' + comptype}
              {(query !== 'all' && query !== '') ? (
                <Button onClick={() => router.push('/search')}>
                  <CancelIcon />
                </Button>
              ) : null}
            </Grid>
          </Grid>
          <Grid className={classes.mt1} container spacing={3}>
            {companies.map((company) => (
              <Grid item md={4} key={company.companyName}>
                <CompanyItem
                  company={company}
                />
              </Grid>
            ))}
          </Grid>
          <Pagination
            className={classes.mt1}
            defaultPage={parseInt(query.page || '1')}
            count={pages}
            onChange={pageHandler}
          ></Pagination>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const comptype = query.comptype || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};

  const categoryFilter = comptype && comptype !== 'all' ? { comptype } : {};

  const comptypes = await Company.find().distinct('CompanyType');
  const companyDocs = await Company.find(
    {
      ...queryFilter,
      ...categoryFilter,
    },

  )
    .sort()
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Company.countDocuments({
    ...queryFilter,
    ...categoryFilter,
  });
  await db.disconnect();

  const companies = companyDocs.map(db.convertDocToObj);

  return {
    props: {
      companies,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      comptypes,
    },
  };
}

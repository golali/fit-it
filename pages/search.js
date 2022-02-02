import { Box, Button, Grid, List, ListItem, MenuItem, Select, Typography,} from '@material-ui/core';
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

const PAGE_SIZE = 10;

export default function Search(props) {
  const classes = useStyles();
  const router = useRouter();
  const {
    query = 'all',
    brand = 'all',
  } = router.query;
  const { companies, countCompanies, types, pages } = props;

  const filterSearch = ({
    page,
    brand,
    searchQuery,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (brand) query.brand = brand;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };
  const brandHandler = (e) => {
    filterSearch({ brand: e.target.value });
  };

  const { state, dispatch } = useContext(Store);
  return (
    <Layout title="Search">
      <Grid className={classes.mt1} container spacing={1}>
        <Grid item md={3}>
          <List>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Company Type</Typography>
                <Select value={brand} onChange={brandHandler} fullWidth>
                  <MenuItem value="all">All</MenuItem>
                  {types &&
                    types.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
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
              {companies.length === 0 ? 'No' : countCompanies} Results
              {query !== 'all' && query !== '' && ' : ' + query}
              {brand !== 'all' && ' : ' + brand}
              {(query !== 'all' && query !== '') ||
              brand !== 'all' ? (
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
  const brand = query.brand || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          companyName: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};

  const brandFilter = brand && brand !== 'all' 
      ? { 
        companyType: brand
        } 
      : {};
 
  const types = await Company.find().distinct('companyType')
  const companyDocs = await Company.find(
    {
      ...queryFilter,
      ...brandFilter,
    },
  )
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countCompanies = await Company.countDocuments({
    ...queryFilter,
    ...brandFilter,
  });
  await db.disconnect();

  const companies = companyDocs.map(db.convertDocToObj);

  return {
    props: {
      companies,
      countCompanies,
      page,
      pages: Math.ceil(countCompanies / pageSize),
      types,
    },
  };
}
import React, { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Layout from '../../components/Layout';
import useStyles from '../../utils/styles';
import Company from '../../models/Company';
import db from '../../utils/db';
import axios from 'axios';
import { Store } from '../../utils/Store';
import { getError } from '../../utils/error';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

export default function CompanyScreen(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { company } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `/api/products/${product._id}/reviews`,
        {
          rating,
          comment,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      setLoading(false);
      enqueueSnackbar('Review submitted successfully', { variant: 'success' });
      fetchReviews();
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/products/${product._id}/reviews`);
      setReviews(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (!company) {
    return <div>Product Not Found</div>;
  }
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

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
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>$product.price</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
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
  console.log("Slug= " + slug);
  
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

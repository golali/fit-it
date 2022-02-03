import React, { useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Select,
  MenuItem,
  Button,
  Card,
  List,
  ListItem,
} from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import useStyles from '../utils/styles';
import CheckoutWizard from '../components/CheckoutWizard';

function PlaceOrder() {
  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems, billingAddress, paymentMethod, aboModell }, //shippingAddress instead of billingAddress
  } = state;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const billingPrice = itemsPrice > 200 ? 0 : 15;  //shippingPrice
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + billingPrice + taxPrice); //shippingPrice

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, []);


  return (
    <Layout title="Shopping Cart">
      <CheckoutWizard activeStep={4}></CheckoutWizard>
      <Typography component="h1" variant="h1">
        Please check your choice again:
      </Typography>
      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>    
            <List>
              <ListItem>      
                <Typography component="h2" variant="h2">
                  Billing Address
                </Typography>
              </ListItem>            
              <ListItem>
                {billingAddress.fullName}, {billingAddress.address},{' '} 
                {billingAddress.city}, {billingAddress.postalCode},{' '}
                {billingAddress.country}
              </ListItem>
            </List>   
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Payment Method
                </Typography>
              </ListItem>
              <ListItem>{paymentMethod}</ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Abo Modell
                </Typography>
              </ListItem>
              <ListItem>{aboModell}</ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography variant="h2">Click to get the Abo:</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={5}>
                    <Typography></Typography>
                  </Grid>

                </Grid>
              </ListItem>
              <ListItem>
                <Button variant="contained" color="primary" fullWidth>
                  {aboModell}
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
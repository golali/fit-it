import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import useStyles from '../utils/styles';
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

export default function Abo() { 
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const router = useRouter();
  const [aboModell, setAboModell] = useState(''); 
  const { state, dispatch } = useContext(Store);
  const {                                          
    cart: { billingAddress },  
  } = state; 

  useEffect(() => {
    if (!billingAddress.address) { 
      router.push('/billing'); 
    } else {
      setAboModell(Cookies.get('aboModell') || '');
    }
  }, []);

  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!aboModell) { 
      enqueueSnackbar('Abo-Modell is required', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_ABO_MODELL', payload: aboModell }); 
      Cookies.set('aboModell', aboModell); 
      router.push('/payment'); 
    }
  };
                                   
                                        
  return (
    <Layout title="Abo Modell"> 
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Choose your Abo-Modell:
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Abo Modell" 
                name="aboModell" 
                value={aboModell} 
                onChange={(e) => setAboModell(e.target.value)} 
              >
                <FormControlLabel
                  label="Monthly - 5€"
                  value="Monthly"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Yearly - 50€"
                  value="Yearly"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Ten Years - 400€"
                  value="Ten Years"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="contained"
              onClick={() => router.push('/billing')} 
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
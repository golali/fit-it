import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import React from 'react';
import NextLink from 'next/link';

export default function CompanyItem({ company, addToCartHandler }) {
  return (
    <Card>
      <NextLink href={`/company/${company.slug}`} passHref>
        <CardActionArea>
        <CardMedia
          component="img"
          image={company.companyLogo}
          height="80"
          width="100"
          alt={company.companyName}
        ></CardMedia>
          <CardContent>
            <Typography variant="h4">{company.companyName}</Typography>
          </CardContent>
          <CardContent>
          <Typography variant="button">{company.companyType}</Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography> More information ?</Typography>
        <Button
          size="small"
          color="primary"
          onClick={() => addToCartHandler(product)}
        >
          Click here !
        </Button>
      </CardActions>
    </Card>
  );
}

import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Product from '../Product/Product';
import './listProduct.scss';

export default function ListProduct({ img, elementPerRow }) {
  return (
    <div className="listProductWrapper">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {Array.from(Array(3)).map((_, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Product img={img} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

import styled from '@emotion/styled';
import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Categories() {
  return (
    <div className="categoriesWrapper">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(8)).map((_, index) => (
            <Grid item xs={2} sm={3} md={3} key={index}>
              <Item>xs=2</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

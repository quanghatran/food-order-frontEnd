import { Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import './category.scss';

export default function Category() {
  const { categoryID } = useParams();
  console.log(categoryID);

  return (
    <div className="categoryWrapper ">
      <Typography className="titleCurve" component="h1" variant="h3">
        Món ăn gần bạn
      </Typography>
    </div>
  );
}

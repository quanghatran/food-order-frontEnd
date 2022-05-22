import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './titleUserPage.scss';

export default function TitleUserPage({ title, link }) {
  return (
    <div className="titleUserPageWrapper">
      <Link className="textDecorationNone" to={link ? link : '#'}>
        <Typography className="titleContent" variant="h1">
          {title ? title : ''}
        </Typography>
      </Link>
    </div>
  );
}

import { Box, Typography } from '@mui/material';
import './titleUserPage.scss';
import React from 'react';

export default function TitleUserPage({ title }) {
  return (
    <div className="titleUserPageWrapper">
      <Box className="textDecorationNone">
        <Typography className="titleContent" variant="h1">
          {title ? title : ''}
        </Typography>
      </Box>
    </div>
  );
}

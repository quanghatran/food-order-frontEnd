import { Box, Typography } from '@mui/material';
import React from 'react';
import './titleAdminStorePage.scss';

export default function TitleAdminStorePage({ title }) {
  return (
    <div className="titleAdminStoreWrapper">
      <Box className="textDecorationNone">
        <Typography className="titleContent" variant="h1">
          {title ? title : ''}
        </Typography>
      </Box>
    </div>
  );
}

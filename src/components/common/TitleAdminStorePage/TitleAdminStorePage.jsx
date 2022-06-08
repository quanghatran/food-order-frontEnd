import { Box, Typography } from '@mui/material';
import React from 'react';
import './titleAdminStorePage.scss';

export default function TitleAdminStorePage({ title, styleTitle }) {
  return (
    <div className="titleAdminStoreWrapper">
      <Box className="textDecorationNone">
        <Typography className="titleContent" variant="h1" style={styleTitle}>
          {title ? title : ''}
        </Typography>
      </Box>
    </div>
  );
}

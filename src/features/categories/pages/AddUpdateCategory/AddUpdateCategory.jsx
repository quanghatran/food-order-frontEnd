import { Box } from '@mui/material';
import React from 'react';
import TitleAdminStorePage from '../../../../components/common/TitleAdminStorePage/TitleAdminStorePage';
import './addUpdateCategory.scss';

export default function AddUpdateCategory() {
  return (
    <Box className="addUpdateCategoryWrapper">
      <Box className="headerListCategory">
        <TitleAdminStorePage title="Add Update Category" />
      </Box>
      <Box>
        <h1>TODO: add update category field</h1>
      </Box>
    </Box>
  );
}

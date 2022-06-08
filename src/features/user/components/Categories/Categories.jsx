import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchProductByCategory } from '../../../categories/categoriesSlice';
import './categories.scss';
import React from 'react';

export default function Categories({ listCategory }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickSearchProductByCategory = (cateogryName) => {
    dispatch(searchProductByCategory(cateogryName));
    navigate('/categories');
  };

  return (
    <div className="categoriesWrapper">
      {listCategory && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            className="listCategory"
            container
            spacing={{ xs: 3, md: 6 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {listCategory.map((category) => (
              <Grid className="categoryItem" item xs={2} sm={3} md={3} key={category.id}>
                <Box
                  className="categoryBox"
                  onClick={(e) => handleClickSearchProductByCategory(category.name)}
                >
                  {/* <Link to={`categories/${category.name}`}> */}
                  <img
                    width="80"
                    height="80"
                    className="categoryCard"
                    src={category.image}
                    alt="category"
                  />
                  <div className="categoryBoxOverlay">
                    <h1>{category.name}</h1>
                  </div>
                  {/* </Link> */}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </div>
  );
}

import { Grid, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
// import storeImage from '../../../../assets/images/common/food-store.png';
import storeImage from '../../../../assets/images/user/storeImage.webp';

import './stores.scss';

export default function Stores({ listStore }) {
  const navigate = useNavigate();

  const handleClickSearchProductByStore = (storeId) => {
    // dispatch(searchProductByCategory(cateogryName));
    navigate(`/restaurant/${storeId}`);
  };

  return (
    <div className="storeWrapper">
      <Grid
        className="listStoreWrapper"
        container
        spacing={{ xs: 3, md: 6 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {listStore &&
          listStore.map((store) => (
            <Grid key={store.id} item xs={2} sm={3} md={3}>
              <Box
                className="listStoreItem"
                onClick={(e) => handleClickSearchProductByStore(store.id)}
              >
                <Box className="imageStore">
                  <img with="120" height="120" src={store.iamges ?? storeImage} alt="storeImage" />
                </Box>
                <Box className="storeInfo">
                  <Typography
                    className="nameStore"
                    variant="h5"
                    style={{ fontSize: '25px', fontWeight: '500' }}
                  >
                    {store.name}
                  </Typography>
                  <p className="phoneNumberStore">
                    <b>Phone</b> : {store.phoneNumber}
                  </p>
                  <p className="starStore">
                    <b>Rating</b>:{' '}
                    <Rating
                      style={{ marginLeft: '7px' }}
                      name="read-only"
                      value={store.star}
                      readOnly
                      size="small"
                    />
                  </p>
                  {/* <Box className="storeTimeActive">
                    <p>Time Open: {store.timeOpen ?? 'Not Information'}</p>
                    <p>Time Close: {store.timeClose ?? 'Not Information'}</p>
                  </Box> */}
                </Box>
                <div className="storeBoxOverlay"></div>
              </Box>
            </Grid>
          ))}
      </Grid>

      {!listStore && <p className="altTitle">Don`t have any stores to show</p>}
    </div>
  );
}

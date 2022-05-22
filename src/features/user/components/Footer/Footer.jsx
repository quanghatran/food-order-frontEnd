import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Link } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import TitleUserPage from '../../../../components/common/TitleUserPage/TitleUserPage';
import './footer.scss';

export default function Footer() {
  return (
    <div className="footerWrapper paddingLeftRight">
      <Box className="footerContact">
        <Box className="footerContactItem">
          <LocationOnOutlinedIcon fontSize="large" />
          <div>
            <h3>School of Information and Communication Technology</h3>
            <p>Hanoi University of Science and Technology</p>
          </div>
        </Box>
        <Box className="footerContactItem">
          <LocalPhoneOutlinedIcon fontSize="large" />
          <div>
            <h3>0964-295-870</h3>
          </div>
        </Box>
        <Box className="footerContactItem">
          <EmailOutlinedIcon fontSize="large" />
          <div>
            <h3>HA.TQ176016@sis.hust.edu.vn</h3>
          </div>
        </Box>
      </Box>

      <Box className="footerDetail">
        <TitleUserPage title="Food Order App" />

        <p>
          This is the Graduation thesis of Tran Quang Ha in semester 20212, under the instruction of
          PhD. Tran Hai Anh
        </p>
        <div className="footerSocialMedia">
          <div className="footerSocialLinks">
            <Link href="https://www.facebook.com/quangha2106">
              <i className="fa-brands fa-facebook"></i>
            </Link>
          </div>
          <div className="footerSocialLinks">
            <Link href="https://github.com/quanghatran">
              <i className="fa-brands fa-github"></i>
            </Link>
          </div>
          <div className="footerSocialLinks">
            <Link href="https://www.linkedin.com/in/quang-ha-tran-945b29220/">
              <i className="fa-brands fa-linkedin"></i>
            </Link>
          </div>

          {/* {listContactIcon.map((item) => (
            <Button key={item.id} variant="text">
              <img src={item.icon} alt={item} />
            </Button>
          ))} */}
        </div>
      </Box>
    </div>
  );
}

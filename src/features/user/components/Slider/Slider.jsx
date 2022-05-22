import React from 'react';
import { Keyboard, Mousewheel, Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import banner1 from '../../../../assets/images/user/banner-1.png';
import banner4 from '../../../../assets/images/user/banner-4.png';
import banner2 from '../../../../assets/images/user/banner-2.png';
import './slider.scss';

const banners = [banner2, banner1, banner4];

export default function Slider() {
  return (
    <div className="sliderWrapper">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img src={banner} alt="slider" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

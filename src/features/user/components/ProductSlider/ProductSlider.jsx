import { FreeMode, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import Product from '../Product/Product';
import './productSlider.scss';

export default function ProductSlider({ productByStore }) {
  return (
    <div className="productSliderWrapper">
      {productByStore ? (
        <Swiper
          slidesPerView={5}
          spaceBetween={60}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {productByStore.map((product) => (
            <SwiperSlide key={product.id}>
              <Product data={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>Don`t have any product yet!</p>
      )}
    </div>
  );
}

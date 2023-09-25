import { A11y, Autoplay, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IConcert } from '../interfaces/music';
import Entry from './entry';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Carousel = ({ images }: { images: IConcert[] }) => {
  return (
    <Swiper
      modules={[Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={16}
      speed={800}
      slidesPerView={1}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => swiper.autoplay.resume()}
      rewind
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      style={{ borderRadius: 'var(--radius)' }}
    >
      {images?.map((image, index) => (
        <SwiperSlide key={image.title}>
          <Entry
            key={image.title}
            title={image.title}
            image={image.image}
            description={image.festival}
            index={index}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;

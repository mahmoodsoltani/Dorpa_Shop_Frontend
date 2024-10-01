import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useState } from "react";

import "../../css/component/cardSlider.css";
import { baseServerAddress } from "../../app/service/shared/baseUrl";
import { ImageSliderProps } from "../../type/propsType";

const ImageSlider: React.FC<ImageSliderProps> = ({ images, title }) => {
  return (
    <div className='image-slider-container'>
      <div className='slider-title'>{title}</div>
      <div className='carousel-wrapper'>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=''
          containerClass='container-with-dots'
          dotListClass=''
          draggable
          focusOnSelect={false}
          itemClass=''
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 1,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=''
          slidesToSlide={1}
          swipeable
        >
          {images.map((image) => (
            <div key={image.id} className='product-image-container'>
              <img
                src={
                  (image.imageUrl as string)?.includes("product")
                    ? `${baseServerAddress}/${image.imageUrl}`
                    : image.imageUrl
                }
                alt={image.altText}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ImageSlider;

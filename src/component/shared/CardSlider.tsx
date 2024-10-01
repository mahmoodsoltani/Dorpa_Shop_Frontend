import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useState } from "react";

import "../../css/component/cardSlider.css";
import ProductCard from "./ProductCard";
import { CardSliderProps } from "../../type/propsType";

const CardSlider: React.FC<CardSliderProps> = ({ products, title }) => {
  return (
    <div className='card-slider-container'>
      <div className='slider-title'>{title}</div>
      <div className='carousel-wrapper'>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          containerClass='container-padding-bottom'
          dotListClass=''
          draggable
          focusOnSelect={false}
          infinite
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
              items: 5,
              partialVisibilityGutter: 10,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 10,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 1,
              partialVisibilityGutter: 10,
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
          {products.map((product) => {
            return (
              <div key={product.id}>
                <ProductCard key={product.id} product={product} />
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default CardSlider;

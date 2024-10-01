import React from "react";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../app/service/shared/store";
import { baseServerAddress } from "../../app/service/shared/baseUrl";
import { ProductReadDto } from "../../app/data/dto/productAggregate/productDtos";
import "../../css/component/orderCard.css";
import "../../css/component/cardSlider.css";
import { OrderCardProps } from "../../type/propsType";

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { data } = useSelector((state: RootState) => state.productR);

  const products: (ProductReadDto | null)[] = [];
  order.orderDetails.forEach((od) => {
    products.push(data.items.find((p) => p.id == od.productId) ?? null);
  });
  const date = new Date(order.orderDate).toLocaleDateString();
  const time = new Date(order.orderDate).toLocaleTimeString();
  return (
    <div className='order-card'>
      <div className='order-card-left'>
        <div className='image-slider-container'>
          <div className='slider-title'>Products</div>
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
                  partialVisibilityGutter: 1,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                  partialVisibilityGutter: 1,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 1,
                  partialVisibilityGutter: 1,
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
              {order.orderDetails.map((item, index) => (
                <div key={index} className='product-image-container'>
                  <img
                    className='image'
                    src={
                      (products[index]?.imageUrl as string)?.includes("product")
                        ? `${baseServerAddress}/${products[index]?.imageUrl}`
                        : products[index]?.imageUrl
                    }
                    alt={item.product?.altTxt}
                  />
                  <div className='m-5'>
                    <p>
                      <strong>Name :</strong>
                      {products[index]?.name}
                    </p>
                    <p>
                      <strong>Price :</strong>
                      {item.price}
                    </p>
                    <p>
                      <strong>Count :</strong>
                      {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <div className='order-card-right'>
        <p>
          <strong>Date:</strong> {date.toString()}
        </p>
        <p>
          <strong>Time:</strong> {time.toString()}
        </p>
        <p>
          <strong>Total Amount:</strong> ${order.total?.toFixed(2)}
        </p>
        <p>
          <strong>Total Discount:</strong> {order.discount?.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Price from "./Price";
import { ProductReadDto } from "../../app/data/dto/productAggregate/productDtos";
import { CartDetailCreateDto } from "../../app/data/dto/orderAggregate/cartDetailDto";
import { baseServerAddress } from "../../app/service/shared/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/service/shared/store";
import { cartDetailActions } from "../../app/service/orderAggregate/cartDetailSlice";
import { FavouriteCreateDto } from "../../app/data/dto/userAggregate/favouriteDto";
import { favouriteActions } from "../../app/service/useAggregate/FavouriteSlice";
import "../../css/component/productCard.css";

interface ProductCardProps {
  product: ProductReadDto;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isFavourite, setIsFavourite] = useState(false);

  const { userId, isAdmin, isLoggedIn } = useSelector(
    (state: RootState) => state.authR
  );
  const { data } = useSelector((state: RootState) => state.favouriteR);

  useEffect(() => {
    var result = data.items.findIndex((f) => f.productId === product.id);
    setIsFavourite(result >= 0);
  }, []);

  const toggleFavourite = () => {
    const newFavourite: FavouriteCreateDto = {
      userId: userId,
      productId: product.id,
    };
    if (!isFavourite) {
      const resultAction = dispatch(
        favouriteActions.createFavourite(newFavourite) as any
      );
    } else {
      const resultAction = dispatch(
        favouriteActions.deleteByDataFavourite(newFavourite) as any
      );
    }
    setIsFavourite((prev) => !prev);
  };

  const addToCart = () => {
    if (isLoggedIn) {
      const newCartDetail: CartDetailCreateDto = {
        userId: userId,
        productId: product.id,
        quantity: 1,
      };
      dispatch(
        cartDetailActions.createOrUpdateCartDetail(newCartDetail)
      ).unwrap();
      toast.success("Product was added to your cart!");
    }
  };

  const finalPrice = product.discountPercentage
    ? (
        product.price -
        (product.price * product.discountPercentage) / 100
      )?.toFixed(2)
    : product.price?.toFixed(2);

  return (
    <div className='product-card'>
      <div className='product-image-container'>
        {product.discountPercentage && (
          <div className='discount'>
            <span>{product.discountPercentage}%</span>
          </div>
        )}
        <img
          onClick={() => navigate(`/product/${product.id}`)}
          src={
            (product.imageUrl as string)?.includes("product")
              ? `${baseServerAddress}/${product.imageUrl}`
              : product.imageUrl
          }
          alt={product.altTxt}
          className='product-image'
        />
        {isLoggedIn && product.stock > 0 && (
          <div onClick={addToCart}>
            <span className='add-to-cart'>🛒</span>
          </div>
        )}
      </div>

      <div className='product-info'>
        <h2 className='product-title'>{product.name}</h2>
        <p className='product-description'>
          {product.description.substring(
            0,
            product.description.length > 50 ? 50 : product.description.length
          ) + " ..."}
        </p>
        {product.stock > 0 ? (
          <p>
            <strong>Stock:</strong>
            {product.stock}
          </p>
        ) : (
          <p className='price'>
            <strong> Sold out!</strong>
          </p>
        )}
        <div className='product-pricing'>
          <Price
            price={product.price}
            discountPercentage={product.discountPercentage ?? 0}
          />
        </div>

        {/* Rating and icons in one line */}
        <div className='product-rating-icons'>
          <div className='product-rating'>
            {product.rate && "⭐".repeat(Math.round(product.rate))}
            {product.rate && "☆".repeat(5 - Math.round(product.rate))}
          </div>

          {/* Favorite icon */}
          {isLoggedIn && (
            <div className='favourite-heart' onClick={toggleFavourite}>
              {isFavourite ? "❤️" : "🤍"}
            </div>
          )}

          {/* Add to Cart icon */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

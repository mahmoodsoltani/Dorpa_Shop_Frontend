import React, { useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import ReviewList from "../../component/shared/ReviewList";
import { productActions } from "../../app/service/productAggregate/productSlice";
import { AppDispatch, RootState } from "../../app/service/shared/store";
import ImageSlider from "../../component/shared/ImageSlider";
import Price from "../../component/shared/Price";
import { CartDetailCreateDto } from "../../app/data/dto/orderAggregate/cartDetailDto";
import { cartDetailActions } from "../../app/service/orderAggregate/cartDetailSlice";
import ReviewForm from "../../component/user/AddReview";

const ProductDetails = () => {
  const param = useParams();
  const { item: product } = useSelector((state: RootState) => state.productR);

  const { data } = useSelector((state: RootState) => state.reviewR);

  const { isLoggedIn, userId, isAdmin } = useSelector(
    (state: RootState) => state.authR
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (param.id) {
      const fetchProduct = async () => {
        try {
          await dispatch(
            productActions.getProduct(parseInt(param.id ?? "0"))
          ).unwrap();
        } catch (err: any) {}
      };

      fetchProduct();
    }
  }, [data]);

  const HandleAddToCart = () => {
    if (isLoggedIn) {
      const newCartDetail: CartDetailCreateDto = {
        userId: userId,
        productId: product ? product.id : 0,
        quantity: 1,
      };
      dispatch(
        cartDetailActions.createOrUpdateCartDetail(newCartDetail)
      ).unwrap();
      toast.success("Product was added to your cart!");
    }
  };

  return (
    <Box sx={{ width: "100%", p: 10 }}>
      <Grid container spacing={20}>
        {/* Left side - Image Slider */}
        <Grid item xs={2} md={6}>
          {product && (
            <ImageSlider images={product.productImages} title='Images' />
          )}
        </Grid>

        {/* Right side - Product Details */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant='h4' gutterBottom>
              {" "}
              {product && `${product.name}`}{" "}
            </Typography>
            <Typography variant='body1' color='textSecondary' paragraph>
              {product && `${product.description}`}
            </Typography>

            <Typography variant='body1' color='textSecondary' paragraph>
              Barand: {product && `${product.brandName}`}
            </Typography>
            <Typography variant='h5' sx={{ mb: 2 }}>
              {product && (
                <Price
                  price={product.price}
                  discountPercentage={product.discountPercentage ?? 0}
                />
              )}
            </Typography>
            {!isAdmin && (
              <>
                {" "}
                <IconButton
                  color='primary'
                  sx={{ alignSelf: "flex-start" }}
                  onClick={HandleAddToCart}
                >
                  <ShoppingCartIcon />
                  <Typography variant='body2' sx={{ ml: 1 }}>
                    Add to Cart
                  </Typography>
                </IconButton>
              </>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Review List - Bottom Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant='h5' gutterBottom>
          Reviews
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {product && <ReviewList reviews={product.reviews ?? []} />}
      </Box>
      {isLoggedIn && product && <ReviewForm productId={product.id} />}
    </Box>
  );
};

export default ProductDetails;

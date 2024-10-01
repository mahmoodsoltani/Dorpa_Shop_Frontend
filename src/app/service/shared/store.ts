import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { categoryReducer } from "../productAggregate/categorySlice";
import { userReducer } from "../useAggregate/userSlice";
import { authReducer } from "./authSlice";
import { productReducer } from "../productAggregate/productSlice";
import { cartDetailReducer } from "../orderAggregate/cartDetailSlice";
import { colorReducer } from "../productAggregate/colorSlice";
import { brandReducer } from "../productAggregate/bransSlice";
import { sizeReducer } from "../productAggregate/SizeSlice";
import { favouriteReducer } from "../useAggregate/FavouriteSlice";
import { orderReducer } from "../orderAggregate/orderSlice";
import { reviewReducer } from "../useAggregate/ReviewSlice";

const rootReducer = combineReducers({
  categoryR: categoryReducer,
  userR: userReducer,
  authR: authReducer,
  productR: productReducer,
  cartDetailR: cartDetailReducer,
  colorR: colorReducer,
  brandR: brandReducer,
  sizeR: sizeReducer,
  favouriteR: favouriteReducer,
  orderR: orderReducer,
  reviewR: reviewReducer,
});
export const store = configureStore({
  reducer: rootReducer,

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(logger as Middleware<{}, any, any>),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
//Project Imports
import {
  OrderCreateDto,
  OrderReadDto,
  OrderUpdateDto,
} from "../../data/dto/orderAggregate/orderDtos";
import BaseSlice, { BaseState } from "../shared/baseSlice";
import { baseUrl } from "../shared/baseUrl";
import authHeader from "../shared/authService";

const checkout = createAsyncThunk<OrderReadDto, number>(
  `orders/checkout`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get<OrderReadDto>(
        `${baseUrl}/orders/checkout/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
const customAsyncReducer = (
  builder: ActionReducerMapBuilder<BaseState<OrderReadDto>>
) => {
  builder
    .addCase(checkout.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    })
    .addCase(
      checkout.fulfilled,
      (state, action: PayloadAction<OrderReadDto>) => {
        const items = action.payload as OrderReadDto;
        state.loading = false;
      }
    )
    .addCase(checkout.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.error as string;
    });
};

const orderSlice = new BaseSlice<OrderReadDto, OrderCreateDto, OrderUpdateDto>(
  "orders",
  "orders",

  {
    ...authHeader(),
  },
  customAsyncReducer
);

export const orderActions = {
  getAllOrder: orderSlice.getAll,
  getOrder: orderSlice.get,
  createOrder: orderSlice.create,
  updateOrder: orderSlice.update,
  deleteOrder: orderSlice.delete,
  checkoutOrder: checkout,
};
export const { reducer: orderReducer } = orderSlice.genericSlice;

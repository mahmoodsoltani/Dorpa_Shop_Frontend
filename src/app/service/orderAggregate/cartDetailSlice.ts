import {
  ActionReducerMapBuilder,
  Draft,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

import {
  CartDetailCreateDto,
  CartDetailReadDto,
  CartDetailUpdateDto,
} from "../../data/dto/orderAggregate/cartDetailDto";
import BaseSlice, { BaseState } from "../shared/baseSlice";
import { baseUrl } from "../shared/baseUrl";
import { PaginatedResult } from "../../data/dto/shared/paginatedResult";
import authHeader from "../shared/authService";

const getByUser = createAsyncThunk<PaginatedResult<CartDetailReadDto>, number>(
  `cartDetails/getByUser`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get<PaginatedResult<CartDetailReadDto>>(
        `${baseUrl}/cartDetails/user/${id}`,
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
const createOrUpdate = createAsyncThunk<CartDetailReadDto, CartDetailCreateDto>(
  `cartDetails/createOrUpdate`,
  async (newItem, { rejectWithValue }) => {
    try {
      const response = await axios.post<CartDetailReadDto>(
        `${baseUrl}/cartDetails`,
        newItem,
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
  builder: ActionReducerMapBuilder<BaseState<CartDetailReadDto>>
) => {
  builder
    .addCase(getByUser.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    })
    .addCase(
      getByUser.fulfilled,
      (state, action: PayloadAction<PaginatedResult<CartDetailReadDto>>) => {
        const items = action.payload as PaginatedResult<CartDetailReadDto>;
        state.data = items;
        state.loading = false;
      }
    )
    .addCase(getByUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.error as string;
    })
    .addCase(createOrUpdate.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    })
    .addCase(
      createOrUpdate.fulfilled,
      (state, action: PayloadAction<CartDetailReadDto>) => {
        state.loading = false;
        var response = action.payload as Draft<CartDetailReadDto>;
        console.log(response);
        const index = state.data.items.findIndex(
          (cd) =>
            cd.userId == response.userId && cd.productId == response.productId
        );
        if (index == -1) {
          state.data.items.push(response);
        } else {
          state.data.items[index].quantity += response.quantity;
          if (state.data.items[index].quantity == 0) {
            state.data.items = state.data.items.filter(
              (cd) =>
                cd.userId == response.userId &&
                cd.productId == response.productId
            );
          }
        }
      }
    )
    .addCase(createOrUpdate.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.error as string;
    });
};
const cartDetailSlice = new BaseSlice<
  CartDetailReadDto,
  CartDetailCreateDto,
  CartDetailUpdateDto
>(
  "cartDetails",
  "cartDetails",
  {
    ...authHeader(),
  },
  customAsyncReducer
);

export const cartDetailActions = {
  ...cartDetailSlice,
  getAllCartDetail: cartDetailSlice.getAll,
  getCartDetail: cartDetailSlice.get,
  createCartDetail: cartDetailSlice.create,
  createOrUpdateCartDetail: createOrUpdate,
  updateCartDetail: cartDetailSlice.update,
  deleteCartDetail: cartDetailSlice.delete,
  getByUserCartDetail: getByUser,
};
export const { reducer: cartDetailReducer } = cartDetailSlice.genericSlice;

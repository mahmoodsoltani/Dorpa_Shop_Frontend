import {
  ActionReducerMapBuilder,
  Draft,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import BaseSlice, { BaseState } from "../shared/baseSlice";
import axios from "axios";
import { baseUrl } from "../shared/baseUrl";
import {
  FavouriteCreateDto,
  FavouriteReadDto,
  FavouriteUpdateDto,
} from "../../data/dto/userAggregate/favouriteDto";
import { PaginatedResult } from "../../data/dto/shared/paginatedResult";
import authHeader from "../shared/authService";

const getByUser = createAsyncThunk<PaginatedResult<FavouriteReadDto>, number>(
  `favourites/getByUser`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get<PaginatedResult<FavouriteReadDto>>(
        `${baseUrl}/favourites/user/${id}`,
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
const deleteByData = createAsyncThunk<FavouriteReadDto, FavouriteCreateDto>(
  `favourites/deleteByData`,
  async (newItem, { rejectWithValue }) => {
    try {
      console.log(newItem);
      await axios.post(`${baseUrl}/favourites/delete`, newItem, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return {
        userId: newItem.userId,
        productId: newItem.productId,
      } as FavouriteReadDto;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const customAsyncReducer = (
  builder: ActionReducerMapBuilder<BaseState<FavouriteReadDto>>
) => {
  builder
    .addCase(getByUser.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    })
    .addCase(
      getByUser.fulfilled,
      (state, action: PayloadAction<PaginatedResult<FavouriteReadDto>>) => {
        state.data = action.payload as Draft<PaginatedResult<FavouriteReadDto>>;
        state.loading = false;
      }
    )
    .addCase(getByUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.error as string;
    })
    .addCase(deleteByData.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.error as string;
    })
    .addCase(deleteByData.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    })
    .addCase(
      deleteByData.fulfilled,
      (state, action: PayloadAction<FavouriteReadDto>) => {
        state.loading = false;
        var response = action.payload as Draft<FavouriteReadDto>;
        state.data.items = state.data.items.filter(
          (i) =>
            !(
              i.userId === response.userId && i.productId === response.productId
            )
        );
      }
    );
};
const favouriteSlice = new BaseSlice<
  FavouriteReadDto,
  FavouriteCreateDto,
  FavouriteUpdateDto
>("favourites", "favourites", 
  {
    ...authHeader(),
  }, customAsyncReducer);

export const favouriteActions = {
  getAllFavourite: favouriteSlice.getAll,
  getFavourite: favouriteSlice.get,
  createFavourite: favouriteSlice.create,
  updateFavourite: favouriteSlice.update,
  deleteFavourite: favouriteSlice.delete,
  deleteByDataFavourite: deleteByData,
  getByUserFavourite: getByUser,
};
export const { reducer: favouriteReducer } = favouriteSlice.genericSlice;

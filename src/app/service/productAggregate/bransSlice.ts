import {
  BrandCreateDto,
  BrandReadDto,
  BrandUpdateDto,
} from "../../data/dto/productAggregate/brandDtos";
import authHeader from "../shared/authService";
import BaseSlice, { BaseState } from "../shared/baseSlice";

const brandSlice = new BaseSlice<BrandReadDto, BrandCreateDto, BrandUpdateDto>(
  "brands",
  "brands",
  {
    ...authHeader(),
  }
);

export const brandActions = {
  getAllBrand: brandSlice.getAll,
  getBrand: brandSlice.get,
  createBrand: brandSlice.create,
  updateBrand: brandSlice.update,
  deleteProduct: brandSlice.delete,
};
export const { reducer: brandReducer } = brandSlice.genericSlice;

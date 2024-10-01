import {
  SizeCreateDto,
  SizeReadDto,
  SizeUpdateDto,
} from "../../data/dto/productAggregate/SizeDtos";
import authHeader from "../shared/authService";
import BaseSlice from "../shared/baseSlice";

const sizeSlice = new BaseSlice<SizeReadDto, SizeCreateDto, SizeUpdateDto>(
  "sizes",
  "sizes",
  {
    ...authHeader(),
  }
);

export const sizeActions = {
  getAllSize: sizeSlice.getAll,
  getSize: sizeSlice.get,
  createSize: sizeSlice.create,
  updateSize: sizeSlice.update,
  deleteProduct: sizeSlice.delete,
};
export const { reducer: sizeReducer } = sizeSlice.genericSlice;

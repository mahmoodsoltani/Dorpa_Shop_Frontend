import {
  ColorCreateDto,
  ColorReadDto,
  ColorUpdateDto,
} from "../../data/dto/productAggregate/colorDtos";
import authHeader from "../shared/authService";
import BaseSlice, { BaseState } from "../shared/baseSlice";

const colorSlice = new BaseSlice<ColorReadDto, ColorCreateDto, ColorUpdateDto>(
  "colors",
  "colors",
  {
    ...authHeader(),
  }
);

export const colorActions = {
  getAllColor: colorSlice.getAll,
  getColor: colorSlice.get,
  createColor: colorSlice.create,
  updateColor: colorSlice.update,
  deleteProduct: colorSlice.delete,
};
export const { reducer: colorReducer } = colorSlice.genericSlice;

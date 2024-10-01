import {
  CategoryCreateDto,
  CategoryReadDto,
  CategoryUpdateDto,
} from "../../data/dto/productAggregate/categoryDtos";
import authHeader from "../shared/authService";
import BaseSlice, { BaseState } from "../shared/baseSlice";


const categorySlice = new BaseSlice<
  CategoryReadDto,
  CategoryCreateDto,
  CategoryUpdateDto
>("categorys", "categorys", {
  ...authHeader(),
});

export const categoryActions = {
  getAllCategory: categorySlice.getAll,
  getCategory: categorySlice.get,
  createCategory: categorySlice.create,
  updateCategory: categorySlice.update,
  deleteCategory: categorySlice.delete,
};
export const { reducer: categoryReducer } = categorySlice.genericSlice;

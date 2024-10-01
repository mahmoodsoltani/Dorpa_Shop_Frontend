import {
  ProductCreateDto,
  ProductReadDto,
  ProductUpdateDto,
} from "../../data/dto/productAggregate/productDtos";
import authHeader from "../shared/authService";
import BaseSlice, { BaseState } from "../shared/baseSlice";

const productSlice = new BaseSlice<
  ProductReadDto,
  ProductCreateDto,
  ProductUpdateDto
>("products", "products", {
  "Content-Type": "multipart/form-data",
  ...authHeader(),
});

export const productActions = {
  getAllProduct: productSlice.getAll,
  getProduct: productSlice.get,
  createProduct: productSlice.create,
  updateProduct: productSlice.update,
  deleteProduct: productSlice.delete,
};

export const { reducer: productReducer } = productSlice.genericSlice;

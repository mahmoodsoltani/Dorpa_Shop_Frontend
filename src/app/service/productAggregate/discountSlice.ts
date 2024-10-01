import {
  DiscountCreateDto,
  DiscountReadDto,
  DiscountUpdateDto,
} from "../../data/dto/productAggregate/discountDtos";
import authHeader from "../shared/authService";
import BaseSlice, { BaseState } from "../shared/baseSlice";


const discountSlice = new BaseSlice<
  DiscountReadDto,
  DiscountCreateDto,
  DiscountUpdateDto
>("discounts", "discounts", {
  ...authHeader(),
});

export const discountActions = {
  getAllDiscount: discountSlice.getAll,
  getDiscount: discountSlice.get,
  createDiscount: discountSlice.create,
  updateDiscount: discountSlice.update,
  deleteProduct: discountSlice.delete,
};
export const { reducer: DiscountReducer } = discountSlice.genericSlice;

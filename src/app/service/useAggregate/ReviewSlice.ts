import BaseSlice, { BaseState } from "../shared/baseSlice";
import {
  ReviewCreateDto,
  ReviewReadDto,
  ReviewUpdateDto,
} from "../../data/dto/userAggregate/reviewDtos";
import authHeader from "../shared/authService";

const reviewSlice = new BaseSlice<
  ReviewReadDto,
  ReviewCreateDto,
  ReviewUpdateDto
>("reviews", "reviews", {
  ...authHeader(),
});

export const reviewActions = {
  getAllReview: reviewSlice.getAll,
  getReview: reviewSlice.get,
  createReview: reviewSlice.create,
  updateReview: reviewSlice.update,
  deleteReview: reviewSlice.delete,
};
export const { reducer: reviewReducer } = reviewSlice.genericSlice;

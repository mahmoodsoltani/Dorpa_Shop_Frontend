import {
  UserCreateDto,
  UserReadDto,
  UserUpdateDto,
} from "../../data/dto/userAggregate/userDtos";
import authHeader from "../shared/authService";
import BaseSlice, { BaseState } from "../shared/baseSlice";

const userSlice = new BaseSlice<UserReadDto, UserCreateDto, UserUpdateDto>(
  "users",
  "users",
  {
    ...authHeader(),
  }
);

export const userActions = {
  getAllUser: userSlice.getAll,
  getUser: userSlice.get,
  createUser: userSlice.create,
  updateUser: userSlice.update,
  deleteUser: userSlice.delete,
};
export const { reducer: userReducer } = userSlice.genericSlice;

import { BaseUpdateDto, BaseReadDto } from "../shared/baseDtos.js";

export interface UserReadDto extends BaseReadDto {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  is_Admin: boolean;
  is_Deleted: boolean;
}

export interface UserCreateDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber?: string;
  isAdmin: boolean;
}

export interface UserUpdateDto extends BaseUpdateDto {
  id: number;
  firstName: string | null;
  lastName: string | null;
  password: string | null;
  phoneNumber: string | null;
}

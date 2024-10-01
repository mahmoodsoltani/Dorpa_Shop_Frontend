import { BaseReadDto, BaseUpdateDto } from "../shared/baseDtos";

export interface FavouriteReadDto extends BaseReadDto {
  userId: number;
  productId: number;
  created_Date: string;
  updated_Date: string;
}

export interface FavouriteCreateDto {
  userId: number;
  productId: number;
}

export interface FavouriteUpdateDto extends BaseUpdateDto {
  userId: number;
  productId: number;
}

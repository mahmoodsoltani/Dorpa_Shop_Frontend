import { BaseReadDto, BaseUpdateDto } from "../shared/baseDtos";

export interface ReviewReadDto extends BaseReadDto {
  message: string;
  reviewDate: string;
  rate: number;
  userId: number;
  productId: number;
}

export interface ReviewCreateDto {
  message: string;
  rate: number;
  userId: number;
  productId: number;
}

export interface ReviewUpdateDto extends BaseUpdateDto {
  id: number;
  message: string | null;
  rate: number | null;
}

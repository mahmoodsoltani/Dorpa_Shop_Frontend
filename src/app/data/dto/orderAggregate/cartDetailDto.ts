import { BaseReadDto, BaseUpdateDto } from "../shared/baseDtos";

export interface CartDetailReadDto extends BaseReadDto {
  quantity: number;
  userId: number;
  productId: number;
  productName: string | null;
  price: number | null;
  discount: number | null;
}

export interface CartDetailCreateDto {
  userId: number;
  productId: number;
  quantity: number;
}

export interface CartDetailUpdateDto extends BaseUpdateDto {
  quantity: number;
  id: number;
}

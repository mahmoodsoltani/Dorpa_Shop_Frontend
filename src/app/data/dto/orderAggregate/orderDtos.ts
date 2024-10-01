import { BaseReadDto, BaseUpdateDto } from "../shared/baseDtos";
import { OrderDetailReadDto } from "./orderDetailDtos";

export interface OrderReadDto extends BaseReadDto {
  orderDate: string;
  total: number | null;
  discount: number | null;
  userId: number;
  orderDetails: OrderDetailReadDto[];
}

export interface OrderCreateDto {}

export interface OrderUpdateDto extends BaseUpdateDto {
  id: number;
}

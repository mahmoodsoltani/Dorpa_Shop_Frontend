import { ProductReadDto } from "../productAggregate/productDtos";
import { BaseReadDto, BaseUpdateDto } from "../shared/baseDtos";

export interface OrderDetailReadDto extends BaseReadDto {
  orderId: number;
  productName: string;
  price: number;
  discount?: number;
  quantity: number;
  product?: ProductReadDto;
  productId: number;
}

export interface OrderDetailCreateDto {
  orderId: number;
  productVariantId: number;
  price: number;
  quantity: number;
}

export interface OrderDetailUpdateDto extends BaseUpdateDto {
  quantity: number;
  id: number;
}

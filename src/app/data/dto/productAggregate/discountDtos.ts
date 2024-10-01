import { BaseReadDto, BaseUpdateDto } from "../shared/baseDtos";

export interface DiscountReadDto extends BaseReadDto {
  productId: number;
  discountPercentage: number;
  startDate: string;
  endDate: string;
}

export interface DiscountCreateDto {
  discountPercentage: number;
  startDate: string;
  endDate: string;
  productId: number;
}

export interface DiscountUpdateDto extends BaseUpdateDto {
  id: number;
  discountPercentage: number | null;
  startDate: string | null;
  endDate: string | null;
}

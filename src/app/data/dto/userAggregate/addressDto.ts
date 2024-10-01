import { BaseReadDto, BaseUpdateDto } from "../shared/baseDtos";

export interface AddressReadDto extends BaseReadDto {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface AddressCreateDto {
  street: string;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  userId: number;
}

export interface AddressUpdateDto extends BaseUpdateDto {
  id: number;
  street: string;
  city: string | null;
  state: string | null;
  postalCode: string | null;
}

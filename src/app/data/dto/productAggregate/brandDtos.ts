import { BaseReadDto, BaseUpdateDto } from "../shared/baseDtos";

export interface BrandReadDto extends BaseReadDto {
  name: string;
  description: string;
  imageUrl: string | null;
  altText: string | null;
}

export interface BrandCreateDto {
  name: string;
  description: string;
  imageUrl: string | null;
  altText: string | null;
}

export interface BrandUpdateDto extends BaseUpdateDto {
  id: number;
  name: string | null;
  description: string | null;
  imageUrl: string | null;
  altText: string | null;
}

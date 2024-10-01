import { BaseReadDto, BaseUpdateDto } from "../shared/baseDtos";

export interface ProductImageReadDto extends BaseReadDto {
  imageUrl: string;
  isPrimary: boolean;
  altText: string;
  productId: number;
}

export interface ProductImageCreateDto {
  productId: number;
  image: File;
  isPrimary: boolean | null;
  altText: string | null;
}

export interface ProductImageUpdateDto extends BaseUpdateDto {
  id: number;
  imageUrl: string | null;
  isPrimary: boolean | null;
  altText: string | null;
}

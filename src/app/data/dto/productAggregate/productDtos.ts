import { BaseReadDto } from "../shared/baseDtos";
import { ReviewReadDto } from "../userAggregate/reviewDtos";
import { ProductImageReadDto } from "./productImageDtos";

export interface ProductReadDto extends BaseReadDto {
  name: string;
  description: string;
  brandId: number | null;
  categoryId: number | null;
  sizeId: number | null;
  colorId: number | null;
  stock: number;
  price: number;
  imageUrl: string;
  brandName: string | null;
  colorCode: string | null;
  sizeName: string | null;
  categoryName: string | null;
  altTxt: string;
  isFavourite: boolean | null;
  discountPercentage: number | null;
  rate: number | null;
  productImages: ProductImageReadDto[];
  reviews: ReviewReadDto[];
}

export interface ProductCreateDto {
  name: string;
  description: string | null;
  brandId: number | null;
  categoryId: number | null;
  stock: number;
  sizeId: number | null;
  colorId: number | null;
  price: number;
  image: File | null;
  altText: string | null;
}

export interface ProductUpdateDto {
  id: number;
  name: string | null;
  description: string | null;
  brandId: number | null;
  stock: number | null;
  categoryId: number | null;
  sizeId: number | null;
  colorId: number | null;
  price: number | null;
}

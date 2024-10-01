import { OrderReadDto } from "../app/data/dto/orderAggregate/orderDtos";
import { CategoryReadDto } from "../app/data/dto/productAggregate/categoryDtos";
import { ProductReadDto } from "../app/data/dto/productAggregate/productDtos";
import { ProductImageReadDto } from "../app/data/dto/productAggregate/productImageDtos";
import { ReviewReadDto } from "../app/data/dto/userAggregate/reviewDtos";

export interface CategoryTreeSelectProps {
  categories: CategoryReadDto[];
  loadingCategory: boolean;
  onSelect: (categoryId: number | null) => void;
}

export interface ImageSliderProps {
  images: ProductImageReadDto[];
  title: string;
}
export interface ProductDetailsProps {
  product: ProductReadDto;
}

export interface ReviewListProps {
  reviews: ReviewReadDto[];
}
export type searchPanelPropsType = {
  searchTerm: string | null;
  onHandelSearchChange: (
    searchTerm: React.ChangeEvent<HTMLInputElement>
  ) => void;
};
export type SortPanelPropsType = {
  sortBy: string;
  order: boolean;
  onHandelSortByChange: (
    searchTerm: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onHandelOrderChange: () => void;
};

export interface CardSliderProps {
  products: ProductReadDto[];
  title: string;
}

export interface OrderCardProps {
  order: OrderReadDto;
}

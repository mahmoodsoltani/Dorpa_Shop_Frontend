import { BaseUpdateDto, BaseReadDto } from "../shared/baseDtos.js";

export interface CategoryReadDto extends BaseReadDto {
  name: string;
  description: string;
  parentId: number | null;
  parentName: string | null;
}

export interface CategoryCreateDto {
  name: string;
  description: string;
  parentId: number | null;
}

export interface CategoryUpdateDto extends BaseUpdateDto {
  id: number;
  name: string | null;
  description: string | null;
  parentId: number | null;
}

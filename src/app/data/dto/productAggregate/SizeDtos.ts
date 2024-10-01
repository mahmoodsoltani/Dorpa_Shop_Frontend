import { BaseReadDto } from "../shared/baseDtos";

export interface SizeReadDto extends BaseReadDto {
  name: string;
}

export interface SizeCreateDto {
  name: string;
}

export interface SizeUpdateDto {
  id: number;
  name: string | null;
}

import { BaseReadDto } from "../shared/baseDtos";

export interface ColorReadDto extends BaseReadDto {
  name: string;
  code: string;
}

export interface ColorCreateDto {
  name: string;
  code: string;
}

export interface ColorUpdateDto {
  id: number;
  name: string | null;
  code: string | null;
}

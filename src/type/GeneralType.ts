import { OrderReadDto } from "../app/data/dto/orderAggregate/orderDtos";


export interface TreeNode {
  value: number;
  title: string;
  children?: TreeNode[];
}

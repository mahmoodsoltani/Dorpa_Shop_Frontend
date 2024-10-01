import { CategoryReadDto } from "../../app/data/dto/productAggregate/categoryDtos";
import { TreeNode } from "../../type/GeneralType";

export const buildTreeData = (
  categories: CategoryReadDto[],
  parentId: number | null = null
): TreeNode[] => {
  return categories
    .filter((category) => category.parentId === parentId)
    .map((category) => ({
      value: category.id,
      title: category.name,
      children: buildTreeData(categories, category.id),
    }));
};

export const ConvertDateToUTCFormat = (date: string): string => {
  const startDate = new Date(date); // Create a Date object from the string input

  // Convert to UTC and return in ISO format
  return new Date(
    Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes(),
      startDate.getSeconds()
    )
  ).toISOString();
};

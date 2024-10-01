import { useState } from "react";
import { TreeSelect } from "antd";
import { Controller, useForm } from "react-hook-form";
//-------------------------------
import { TreeNode } from "../../type/GeneralType";
import { buildTreeData } from "../../utils/productAggregate/function";
import { CategoryTreeSelectProps } from "../../type/propsType";

interface FormValues {
  categoryId: number | null;
}

export const CategoryTreeSelect: React.FC<CategoryTreeSelectProps> = ({
  categories,
  loadingCategory,
  onSelect,
}) => {
  const { control, setValue } = useForm<FormValues>();

  const [selectedNodeKey, setSelectedNodeKey] = useState<number | null>(null);

  const treeData: TreeNode[] = buildTreeData(categories);
  const handleChange = (value: number | null) => {
    setSelectedNodeKey(value);
    setValue("categoryId", value); // Update form value
    if (onSelect) {
      onSelect(value); // Call the onSelect callback with the selected value
    }
  };
  return (
    <Controller
      name='categoryId'
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <TreeSelect
          {...field}
          treeData={treeData}
          value={field.value}
          onChange={handleChange}
          placeholder={
            loadingCategory ? "Loading Categories" : "Select Category"
          }
          style={{ width: "100%" }}
          treeDefaultExpandAll
        />
      )}
    />
  );
};

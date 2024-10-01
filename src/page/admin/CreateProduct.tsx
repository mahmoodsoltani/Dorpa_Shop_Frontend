import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Select, MenuItem, TextField, Button, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { AppDispatch, RootState } from "../../app/service/shared/store";
import { categoryActions } from "../../app/service/productAggregate/categorySlice";
import { productActions } from "../../app/service/productAggregate/productSlice";
import { sizeActions } from "../../app/service/productAggregate/SizeSlice";
import { ProductCreateDto } from "../../app/data/dto/productAggregate/productDtos";
import { colorActions } from "../../app/service/productAggregate/colorSlice";
import { brandActions } from "../../app/service/productAggregate/bransSlice";
import { CategoryTreeSelect } from "../../component/shared/CategorySelection";
import "../../css/page/form.css";

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { control, handleSubmit, setValue } = useForm();
  const [image, setImage] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const { loading, error } = useSelector((state: RootState) => state.productR);

  const { data: categories, loading: loadingCategory } = useSelector(
    (state: RootState) => state.categoryR
  );
  const { data: brands, loading: loadingBrand } = useSelector(
    (state: RootState) => state.brandR
  );
  const { data: sizes, loading: loadingSize } = useSelector(
    (state: RootState) => state.sizeR
  );
  const { data: colors, loading: loadingColor } = useSelector(
    (state: RootState) => state.colorR
  );

  useEffect(() => {
    const fetchData = async () => {
      const resultAction = await dispatch(
        categoryActions.getAllCategory({
          pageNumber: null,
          pageSize: null,
          sortBy: "id",
          isAscending: true,
          searchTerm: null,
          searchBy: null,
        })
      );

      const sizeResult = await dispatch(
        sizeActions.getAllSize({
          pageNumber: null,
          pageSize: null,
          sortBy: "id",
          isAscending: true,
          searchTerm: null,
          searchBy: null,
        })
      );

      const colorResult = await dispatch(
        colorActions.getAllColor({
          pageNumber: null,
          pageSize: null,
          sortBy: "name",
          isAscending: true,
          searchTerm: null,
          searchBy: null,
        })
      );

      const brandResult = await dispatch(
        brandActions.getAllBrand({
          pageNumber: null,
          pageSize: null,
          sortBy: "name",
          isAscending: true,
          searchTerm: null,
          searchBy: null,
        })
      );
    };
    fetchData();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const onFormSubmit = async (data: any) => {
    const newProduct: ProductCreateDto = {
      name: data.name,
      description: data.description,
      brandId: data.brandId,
      categoryId: categoryId,
      stock: data.stock,
      sizeId: data.sizeId,
      colorId: data.colorId,
      price: data.price,
      image: image,
      altText: data.altText,
    };
    try {
      const resultAction = await dispatch(
        productActions.createProduct(newProduct) as any
      );

      if (productActions.createProduct.fulfilled.match(resultAction)) {
        toast.success("New product was created.");
      } else {
        toast.error(error);
      }
    } catch (error) {
      toast.error("Failed! Please try again");
    }
  };

  return (
    <div
      className='form-container'
      style={{ maxWidth: 800, margin: "auto", padding: "2rem" }}
    >
      {error && (
        <div className='error-message' style={{ color: "red" }}>
          {error}
        </div>
      )}
      <div className='form-box'>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          style={{ width: "100%" }}
          className='.form-box'
        >
          <div className='form-row'>
            <label htmlFor='name'>Name:</label>
            <Controller
              name='name'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField {...field} id='name' fullWidth />
              )}
            />
          </div>

          <div className='form-row'>
            <label htmlFor='description'>Description:</label>
            <Controller
              name='description'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField {...field} id='description' fullWidth />
              )}
            />
          </div>

          <div className='form-row'>
            <label htmlFor='brandId'>Brand:</label>
            <Controller
              name='brandId'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <Select {...field} id='brandId' displayEmpty fullWidth>
                  <MenuItem value='' disabled>
                    {loadingBrand ? "Loading Brands" : "Select Brand"}
                  </MenuItem>
                  {brands.items.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </div>

          <div className='form-row'>
            <label htmlFor='categoryId'>Category:</label>
            <CategoryTreeSelect
              categories={categories.items}
              loadingCategory={loadingCategory}
              onSelect={setCategoryId}
            />
          </div>

          <div className='form-row'>
            <label htmlFor='sizeId'>Size:</label>
            <Controller
              name='sizeId'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <Select {...field} id='sizeId' displayEmpty fullWidth>
                  <MenuItem value='' disabled>
                    {loadingSize ? "Loading Sizes" : "Select Size"}
                  </MenuItem>
                  {sizes.items.map((size) => (
                    <MenuItem key={size.id} value={size.id}>
                      {size.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </div>

          <div className='form-row'>
            <label htmlFor='colorId'>Color:</label>
            <Controller
              name='colorId'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <Select {...field} id='colorId' displayEmpty fullWidth>
                  <MenuItem value='' disabled>
                    {loadingColor ? "Loading Colors" : "Select Color"}
                  </MenuItem>
                  {colors.items.map((color, index) => (
                    <MenuItem key={index} value={index}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          backgroundColor: color.code,
                          marginRight: 1,
                          display: "inline-block",
                          border: "1px solid #000",
                        }}
                      />
                      {color.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </div>

          <div className='form-row'>
            <label htmlFor='stock'>Stock:</label>
            <Controller
              name='stock'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField {...field} id='stock' type='number' fullWidth />
              )}
            />
          </div>

          <div className='form-row'>
            <label htmlFor='price'>Price:</label>
            <Controller
              name='price'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField {...field} id='price' type='number' fullWidth />
              )}
            />
          </div>

          <div className='form-row'>
            <label htmlFor='altText'>Alt Text:</label>
            <Controller
              name='altText'
              control={control}
              defaultValue='Image'
              render={({ field }) => (
                <TextField {...field} id='altText' fullWidth />
              )}
            />
          </div>

          <div className='form-row'>
            <label htmlFor='image'>Image:</label>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='file-input'
              id='image'
              style={{ width: "100%" }}
            />
          </div>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={loading}
            className='submit-btn'
          >
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "../../app/service/shared/store";
import { productActions } from "../../app/service/productAggregate/productSlice"; // Adjust import path
import {
  ProductReadDto,
  ProductUpdateDto,
} from "../../app/data/dto/productAggregate/productDtos";
import { categoryActions } from "../../app/service/productAggregate/categorySlice";
import { sizeActions } from "../../app/service/productAggregate/SizeSlice";
import { colorActions } from "../../app/service/productAggregate/colorSlice";
import { brandActions } from "../../app/service/productAggregate/bransSlice";
import { discountActions } from "../../app/service/productAggregate/discountSlice";
import { ConvertDateToUTCFormat } from "../../utils/productAggregate/function";
import { baseServerAddress } from "../../app/service/shared/baseUrl";

const ProductManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector((state: RootState) => state.productR.data); // Adjust state path
  const loading = useSelector((state: RootState) => state.productR.loading); // Adjust state path
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDiscountDialog, setOpenDiscountDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductUpdateDto | null>(
    null
  );
  const [editedProduct, setEditedProduct] = useState<ProductUpdateDto | null>(
    null
  );
  const [discountDetails, setDiscountDetails] = useState<{
    startDate: string;
    endDate: string;
    percentage: number;
    productId: number;
  }>({
    startDate: "",
    endDate: "",
    percentage: 0,
    productId: 0,
  });

  const { data: categories } = useSelector(
    (state: RootState) => state.categoryR
  );
  const { data: brands } = useSelector((state: RootState) => state.brandR);
  const { data: sizes } = useSelector((state: RootState) => state.sizeR);
  const { data: colors } = useSelector((state: RootState) => state.colorR);

  useEffect(() => {
    // Fetch products and other data
    dispatch(
      productActions.getAllProduct({
        pageNumber: null,
        pageSize: null,
        sortBy: "id",
        isAscending: false,
        searchTerm: null,
        searchBy: null,
      })
    );

    try {
      const fetchData = async () => {
        await Promise.all([
          dispatch(
            categoryActions.getAllCategory({
              pageNumber: null,
              pageSize: null,
              sortBy: "id",
              isAscending: true,
              searchTerm: null,
              searchBy: null,
            })
          ),
          dispatch(
            sizeActions.getAllSize({
              pageNumber: null,
              pageSize: null,
              sortBy: "id",
              isAscending: true,
              searchTerm: null,
              searchBy: null,
            })
          ),
          dispatch(
            colorActions.getAllColor({
              pageNumber: null,
              pageSize: null,
              sortBy: "name",
              isAscending: true,
              searchTerm: null,
              searchBy: null,
            })
          ),
          dispatch(
            brandActions.getAllBrand({
              pageNumber: null,
              pageSize: null,
              sortBy: "name",
              isAscending: true,
              searchTerm: null,
              searchBy: null,
            })
          ),
        ]);
      };
      fetchData();
    } catch (err) {
      console.error("Error fetching options", err);
    }
  }, [dispatch]);

  const handleEditClick = (product: ProductReadDto) => {
    setCurrentProduct(product);
    setEditedProduct({ ...product });
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (productId: number) => {
    dispatch(productActions.deleteProduct(productId));
    toast.success("Product deleted successfully.");
  };

  const handleDiscountClick = (product: ProductReadDto) => {
    setCurrentProduct(product);
    setOpenDiscountDialog(true);
  };

  const handleSaveChanges = () => {
    if (editedProduct) {
      dispatch(productActions.updateProduct(editedProduct));
      setOpenEditDialog(false);
      toast.success("Product updated successfully.");
    }
  };

  const handleDiscountSave = () => {
    if (currentProduct && discountDetails) {
      dispatch(
        discountActions.createDiscount({
          startDate: ConvertDateToUTCFormat(discountDetails.startDate),
          endDate: ConvertDateToUTCFormat(discountDetails.endDate),
          discountPercentage: discountDetails.percentage,
          productId: currentProduct.id,
        })
      );
      setOpenDiscountDialog(false);
      toast.success("Discount Added.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: any }>
  ) => {
    if (editedProduct) {
      const { name, value } = e.target as HTMLInputElement;
      setEditedProduct({ ...editedProduct, [name]: value });
    }
  };

  const handleDropdownChange = (e: SelectChangeEvent<string | number>) => {
    if (editedProduct) {
      const { name, value } = e.target;
      setEditedProduct({ ...editedProduct, [name]: value });
    }
  };

  const handleDiscountInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setDiscountDetails({
      ...discountDetails,
      [name]: name === "percentage" ? Number(value) : value,
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ p: 7 }}>
      <Typography variant='h4' gutterBottom sx={{ mb: 4 }}>
        Admin Product List
      </Typography>
      <List>
        {products.items.map((product) => (
          <ListItem key={product.id} divider>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={
                  (product.imageUrl as string)?.includes("product")
                    ? `${baseServerAddress}/${product.imageUrl}`
                    : product.imageUrl
                }
                alt={product.name}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "contain",
                  marginRight: 16,
                }}
              />
              <ListItemText
                primary={product.name}
                secondary={
                  <>
                    <Typography variant='body2' color='textSecondary'>
                      <strong>Category: </strong>
                      {product.categoryName}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      <strong>Description: </strong> {product.description}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      <strong> Price: $</strong>
                      {product.price.toFixed(2)}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      <strong>Discount:</strong> {product.discountPercentage}%
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      <strong>Stock:</strong> {product.stock}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      <strong>Color:</strong> {product.colorCode}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      <strong> Size:</strong> {product.sizeName}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      <strong>Brand:</strong> {product.brandName}
                    </Typography>
                  </>
                }
              />
            </Box>
            <ListItemSecondaryAction>
              <IconButton edge='end' onClick={() => handleEditClick(product)}>
                <EditIcon />
              </IconButton>
              <IconButton
                edge='end'
                onClick={() => handleDeleteClick(product.id)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                edge='end'
                onClick={() => handleDiscountClick(product)}
              >
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Edit Product Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {editedProduct && (
            <Box>
              <TextField
                label='Name'
                name='name'
                value={editedProduct.name}
                onChange={handleInputChange}
                fullWidth
                margin='dense'
              />
              <FormControl fullWidth margin='dense'>
                <InputLabel>Category</InputLabel>
                <Select
                  name='categoryId'
                  value={editedProduct.categoryId ?? ""}
                  onChange={handleDropdownChange}
                >
                  {categories.items.map((category) => (
                    <MenuItem key={category.name} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin='dense'>
                <InputLabel>Color</InputLabel>
                <Select
                  name='colorId'
                  value={editedProduct.colorId ?? ""}
                  onChange={handleDropdownChange}
                >
                  {colors.items.map((color) => (
                    <MenuItem key={color.name} value={color.id}>
                      {color.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin='dense'>
                <InputLabel>Size</InputLabel>
                <Select
                  name='sizeId'
                  value={editedProduct.sizeId ?? ""}
                  onChange={handleDropdownChange}
                >
                  {sizes.items.map((size) => (
                    <MenuItem key={size.name} value={size.id}>
                      {size.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin='dense'>
                <InputLabel>Brand</InputLabel>
                <Select
                  name='brandId'
                  value={editedProduct.brandId ?? ""}
                  onChange={handleDropdownChange}
                >
                  {brands.items.map((brand) => (
                    <MenuItem key={brand.name} value={brand.id}>
                      {brand.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label='Description'
                name='description'
                value={editedProduct.description}
                onChange={handleInputChange}
                fullWidth
                margin='dense'
              />
              <TextField
                label='Price'
                name='price'
                type='number'
                value={editedProduct.price}
                onChange={handleInputChange}
                fullWidth
                margin='dense'
              />
              <TextField
                label='Stock'
                name='stock'
                type='number'
                value={editedProduct.stock}
                onChange={handleInputChange}
                fullWidth
                margin='dense'
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveChanges} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Discount Dialog */}
      <Dialog
        open={openDiscountDialog}
        onClose={() => setOpenDiscountDialog(false)}
      >
        <DialogTitle>Add Discount</DialogTitle>
        <DialogContent>
          {currentProduct && (
            <Box>
              <TextField
                label='Start Date'
                name='startDate'
                type='date'
                InputLabelProps={{ shrink: true }}
                value={discountDetails?.startDate || ""}
                onChange={handleDiscountInputChange}
                fullWidth
                margin='dense'
              />
              <TextField
                label='End Date'
                name='endDate'
                type='date'
                InputLabelProps={{ shrink: true }}
                value={discountDetails?.endDate || ""}
                onChange={handleDiscountInputChange}
                fullWidth
                margin='dense'
              />

              <TextField
                label='Discount Percentage'
                name='percentage'
                type='number'
                value={discountDetails?.percentage || ""}
                onChange={handleDiscountInputChange}
                fullWidth
                margin='dense'
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDiscountDialog(false)}>Cancel</Button>
          <Button onClick={handleDiscountSave} color='primary'>
            Save Discount
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;

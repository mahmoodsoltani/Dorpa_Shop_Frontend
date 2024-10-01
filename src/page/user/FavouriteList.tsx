import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/service/shared/store";
import { useEffect, useState } from "react";
import { productActions } from "../../app/service/productAggregate/productSlice";
import CardSlider from "../../component/shared/CardSlider";
import { ProductReadDto } from "../../app/data/dto/productAggregate/productDtos";

const FavouriteList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    error,
    data: products,
  } = useSelector((state: RootState) => state.productR);
  const { data: favourites } = useSelector(
    (state: RootState) => state.favouriteR
  );
  const [favouriteList, setFavouriteList] = useState<ProductReadDto[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        productActions.getAllProduct({
          pageNumber: 1,
          pageSize: null,
          sortBy: "name",
          isAscending: false,
          searchTerm: null,
          searchBy: null,
        })
      );
    };

    fetchData().catch(console.error);
    setFavouriteList(
      products.items.filter((product) =>
        favourites.items.some((fav) => fav.productId === product.id)
      )
    );
  }, [favourites]);

  return (
    <div className='mt-5'>
      <CardSlider products={favouriteList} title='Your favourite list:' />
    </div>
  );
};

export default FavouriteList;

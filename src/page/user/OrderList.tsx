import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../app/service/shared/store";
import { orderActions } from "../../app/service/orderAggregate/orderSlice";
import { OrderReadDto } from "../../app/data/dto/orderAggregate/orderDtos";
import OrderCard from "../../component/shared/OrderCard";

const OrderListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Get orders from the Redux store
  const { data, loading, error } = useSelector(
    (state: RootState) => state.orderR
  );

  const { userId } = useSelector((state: RootState) => state.authR);

  useEffect(() => {
    dispatch(
      orderActions.getAllOrder({
        pageNumber: null,
        pageSize: null,
        sortBy: "orderDate",
        isAscending: false,
        searchTerm: `${userId}`,
        searchBy: "userId",
      })
    );
  }, []);

  return (
    <div className='order-list-page'>
      <h1>Your Orders</h1>
      {data && data.items.length > 0 ? (
        <div className='order-list'>
          {data.items.map((order: OrderReadDto, index: number) => (
            <OrderCard key={index} order={order} />
          ))}
        </div>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default OrderListPage;

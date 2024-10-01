import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { AppDispatch, RootState } from "../../app/service/shared/store";
import { cartDetailActions } from "../../app/service/orderAggregate/cartDetailSlice";

const CartIcon: React.FC = () => {
  const navigate = useNavigate();

  const { userId, isAdmin, isLoggedIn, userName } = useSelector(
    (state: RootState) => state.authR
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(cartDetailActions.getByUserCartDetail(userId));
    }
  }, []);

  const cartItemCount = useSelector(
    (state: RootState) => state.cartDetailR.data.items.length
  );

  const handleClick = () => {
    navigate("user/cartDetail");
  };
  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      onClick={handleClick}
    >
      <Badge badgeContent={cartItemCount} color='primary'>
        <ShoppingCartIcon />
      </Badge>
    </div>
  );
};

export default CartIcon;

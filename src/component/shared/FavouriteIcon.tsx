import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@mui/material";
//-------------------------------
import { AppDispatch, RootState } from "../../app/service/shared/store";
import { cartDetailActions } from "../../app/service/orderAggregate/cartDetailSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { favouriteActions } from "../../app/service/useAggregate/FavouriteSlice";


const FavouriteIcon: React.FC = () => {
  const navigate = useNavigate();

  const { userId, isAdmin, isLoggedIn, userName } = useSelector(
    (state: RootState) => state.authR
  );
  const { data } = useSelector((state: RootState) => state.favouriteR);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (isLoggedIn) {
      console.log(userId);
      dispatch(favouriteActions.getByUserFavourite(userId));
    }
  }, []);

  const favouriteCount = data?.items.length;
  const handleClick = () => {
    navigate("user/favourite-list");
  };
  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      onClick={handleClick}
    >
      <Badge badgeContent={favouriteCount} color='primary'>
        <FavoriteIcon />
      </Badge>
    </div>
  );
};

export default FavouriteIcon;

import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Login from "../../page/shared/login";
import { RootState } from "../../app/service/shared/store";

const ProtectUser = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.authR);
  if (!isLoggedIn) {
    toast.warning("To access this page you should log in.");
  }
  return isLoggedIn ? <Outlet /> : <Login />;
};

export default ProtectUser;

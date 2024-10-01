import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import Login from "../../page/shared/login";
import { useSelector } from "react-redux";
import { RootState } from "../../app/service/shared/store";

const ProtectAdmin = () => {
  const { isAdmin } = useSelector((state: RootState) => state.authR);
  if (!isAdmin) {
    toast.warning("To access this page you should log in as an admin user!");
  }
  return isAdmin ? <Outlet /> : <Login />;
};

export default ProtectAdmin;

import { Outlet } from "react-router-dom";

import TopMenu from "./TopMenu";
import Footer from "./Footer";
import "../../css/page/homepage.css";

const MainContainer = () => {
  return (
    <div>
      <TopMenu />
      <div className='main-container container'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainContainer;

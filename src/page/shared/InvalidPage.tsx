import { Link, useRouteError } from "react-router-dom";

import "../../css/page/login.css";
import { Footer } from "antd/es/layout/layout";
import TopMenu from "../../component/shared/TopMenu";

const InvalidPage = () => {
  return (
    <>
      <div>
        <TopMenu />
        <div className='not-found-container'>
          <div className='not-found-content'>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>
              Oops! The page you are looking for doesn't exist or has been
              moved.
            </p>
            <Link to='/home' className='home-button'>
              Return to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default InvalidPage;

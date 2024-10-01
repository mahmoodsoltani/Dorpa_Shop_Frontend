import React from "react";
import { createRoot } from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/service/shared/store";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import InvalidPage from "./page/shared/InvalidPage";
import Login from "./page/shared/login";
import Register from "./page/shared/Register";
import ProductList from "./page/shared/ProductList";
import ProductDetails from "./page/shared/ProductDetail";
import MainContainer from "./component/shared/MainContainer";
import Home from "./page/shared/Homepage";
import FavouriteList from "./page/user/FavouriteList";
import CartDetail from "./page/user/CartDetail";
import About from "./page/shared/About";
import ProtectUser from "./component/user/ProtectUser";
import ProtectAdmin from "./component/admin/ProtectAdmin";
import OrderListPage from "./page/user/OrderList";
import CreateProduct from "./page/admin/CreateProduct";
import AdminMainPage from "./page/admin/AdminMainPage";
import ProductManagement from "./page/admin/ProductManagement";
import UserManagement from "./page/admin/UserManagement";

const router = createBrowserRouter([
  {
    path: "/",
    //element: <Sidebar />,
    element: <MainContainer />,
    errorElement: <InvalidPage />,
    children: [
      {
        index: true,
        element: <Navigate to='/home' />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
      },

      {
        path: "/product",
        element: <ProductList />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/user",
        element: <ProtectUser />,
        children: [
          {
            path: "favourite-list",
            element: <FavouriteList />,
          },
          {
            path: "order-list",
            element: <OrderListPage />,
          },
          {
            path: "cartDetail",
            element: <CartDetail />,
          },
        ],
      },
      {
        path: "/admin",
        element: <ProtectAdmin />,
        children: [
          {
            path: "createproduct",
            element: <CreateProduct />,
          },
          {
            path: "home",
            element: <AdminMainPage />,
          },
          {
            path: "products",
            element: <ProductManagement />,
          },
          {
            path: "users",
            element: <UserManagement />,
          },
        ],
      },
    ],
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <>
    <Provider store={store}>
      <GoogleOAuthProvider clientId='31679719050-em69l38t04bjvma0qcbq4397pdt7puer.apps.googleusercontent.com'>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React, { useContext } from "react";
import { GlobalContext } from "./Home/CustomerViewPage/ViewGrid/Context/Context";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectiveRoute = () => {
  const { userLoggedIn, setUserLoggedIn } = useContext(GlobalContext);
  const location = useLocation();

  return userLoggedIn ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default ProtectiveRoute;

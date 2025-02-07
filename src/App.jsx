import { useContext, useEffect, useState } from "react";

import "./App.css";
import CustomerView from "./Home/CustomerViewPage/CustomerView";

import CreateNewUser from "./Home/CustomerViewPage/CreateNewUser/CreateNewUser";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { Bounce, ToastContainer } from "react-toastify";

import Deposit from "./Home/CustomerViewPage/CreateNewUser/Deposit";
import TransactionPage from "./Home/CustomerViewPage/ExtraCombinePage/TransactionPage";

import MoneyTransferPage from "./Home/CustomerViewPage/CreateNewUser/MoneyTransferPage";
import NoPageFound from "./Home/NoPageFound";
import ProtectiveRoute from "../src/ProtectiveRoute";
import LogInPage from "./Home/RegisterPage/LogInPage";
import Signup from "./Home/RegisterPage/SignInPage";
import { GlobalContext } from "./Home/CustomerViewPage/ViewGrid/Context/Context";
import UserDatails from "./Home/CustomerViewPage/CreateNewUser/UserDatails";
import TransactionHistory from "./Home/CustomerViewPage/CreateNewUser/transactionHistory";
import { Dashboard } from "@mui/icons-material";

function App() {
  const { userLoggedIn } = useContext(GlobalContext);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Routes>
        {/* 🔹 PUBLIC ROUTES (No Authentication Required) */}
        {!userLoggedIn ? (
          <>
            <Route path="/" element={<LogInPage />} />

            <Route path="newUser" element={<CreateNewUser />} />
            <Route path="signUp" element={<Signup />} />
          </>
        ) : (
          <Route path="/" element={<Navigate to={"/home"} replace />} />
        )}

        {/* 🔹 PRIVATE ROUTES (Protected) */}
        <Route element={<ProtectiveRoute />}>
          <Route path="home" element={<CustomerView />} />

          <Route path="TransactionHistory" element={<TransactionHistory />} />

          <Route path="transaction" element={<TransactionPage />} />
          <Route path="userDatails" element={<UserDatails />} />
          <Route path="MoneyTransfer" element={<MoneyTransferPage />} />
          <Route path="Dashboard" element={<Dashboard />} />

          <Route path="deposit" element={<Deposit />} />
        </Route>

        {/* 🔹 ADMIN DIPOSIT PAGE */}

        {/* 🔹 WILDCARD ROUTE (Redirect Users) */}
        <Route
          path="*"
          element={<Navigate to={userLoggedIn ? "/home" : "/"} replace />}
        />
      </Routes>
    </>
  );
}

export default App;

import React, { createContext, useEffect, useState } from "react";
import { auth, database } from "../../../../Main-Redux/FireBase/fireBaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { get, ref } from "firebase/database";

export const GlobalContext = createContext(null);

const Context = ({ children }) => {
  const [navbar, setNavbar] = useState(true);

  const [isSigned, setIsSigned] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const [storeLogin, setStoreLogin] = useState([]);

  const [getStored, setGetStored] = useState([]);

  const [getStoreKeys, setGetStoreKeys] = useState([]);

  const [loginUserData, setLoginUserData] = useState([]);

  const [afterNewAc, setAfterNewAc] = useState(null);
  const [isNewAc, setIsNewAc] = useState(false);
  const [localHistory, setLocalHistory] = useState([]);

  function handleButtonChange() {
    setNavbar(!navbar);
  }

  function handleSignUpSubmit() {
    setIsSigned(true);
  }

  useEffect(() => {
    const auther = onAuthStateChanged(auth, initializeUser);
    return auther;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
      setLoading(false);
    } else {
      setUserLoggedIn(false);
      setCurrentUser(null);
    }
    setLoading(false);
  }

  const getFilter = async () => {
    const db = database;
    const refer = ref(db, "customAc/customerAc");
    const getuser = get(refer);
    if ((await getuser).exists()) {
      const forFilter = Object.values((await getuser).val());
      setGetStored(forFilter);
    }
  };
  useEffect(() => {
    getFilter();
  }, []);

  async function getKeys() {
    const db = database;
    const up = ref(db, "customAc/customerAc");
    const updater = await get(up);
    if (updater.exists()) {
      const vals = updater.val();

      if (vals) {
        setGetStoreKeys(vals);
      }
    } else {
      alert("error");
    }
  }
  useEffect(() => {
    getKeys();
  }, []);

  const value = {
    handleButtonChange,
    navbar,
    currentUser,
    loading,
    handleSignUpSubmit,
    isSigned,
    getStored,
    storeLogin,
    setStoreLogin,
    getStoreKeys,
    afterNewAc,
    setAfterNewAc,
    isNewAc,
    setIsNewAc,
    userLoggedIn,
    setUserLoggedIn,
    localHistory,
    setLocalHistory,
    loginUserData,
    setLoginUserData,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default Context;

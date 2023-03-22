import axios from "axios";
import CryptoJS from "crypto-js";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    // console.log("inputs =>", inputs);
    const res = await axios.post("http://localhost:8800/auth/login", inputs, {
      withCredentials: true,
    });
    // console.log("res =>", res.data);
    const token = res.data.token;
    const role = CryptoJS.AES.encrypt(res.data.role, "10").toString();
    // const salt = bcrypt.genSaltSync(10);
    // const role = bcrypt.hashSync(res.data.role, salt);
    // const role = bcrypt.hash(res.data.role, salt);

    // return { token, role };
    // const role = res.data.role;
    const dataResponse = {
      token: token,
      role: role,
    };
    // console.log("dataResponse => ", dataResponse);
    return dataResponse;
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};

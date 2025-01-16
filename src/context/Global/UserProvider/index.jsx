import { useDecodeToken } from "@/hook";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();
const getCookie = (name) => {
    const cookieMatch = document.cookie.match("(?:^|; )" + name + "=([^;]*)");
    return cookieMatch ? decodeURIComponent(cookieMatch[1]) : "";
  };
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState("");
  const [decodedToken, setDecodedToken] = useState(null);
  const decodeToken = () => {
    let token =
      localStorage.getItem(import.meta.env.VITE_TOKEN_NAME) ||
      sessionStorage.getItem(import.meta.env.VITE_TOKEN_NAME) ||
      getCookie(import.meta.env.VITE_TOKEN_NAME);

    if (!token) {
      toast.error(
        "Token not found in localStorage, sessionStorage, or cookies"
      );
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
      setUserData(decoded)
    } catch (error) {
      console.error("Error decoding token:", error);
      setDecodedToken(null);
    }
  };
  useEffect(() => {
    decodeToken();
  }, []);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, role, setRole }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => useContext(UserContext);

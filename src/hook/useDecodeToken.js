import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const getCookie = (name) => {
  const cookieMatch = document.cookie.match("(?:^|; )" + name + "=([^;]*)");
  return cookieMatch ? decodeURIComponent(cookieMatch[1]) : "";
};

export const useDecodeToken = () => {
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
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
      } catch (error) {
        console.error("Error decoding token:", error);
        setDecodedToken(null);
      }
    };

    decodeToken();
  }, []);

  return { token: decodedToken };
};

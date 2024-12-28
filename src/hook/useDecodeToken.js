import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export const useDecodeToken = () => {
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const decodeToken = () => {
      let token;
      token = localStorage.getItem(import.meta.env.VITE_TOKEN_NAME);

      if (!token) {
        toast.error(
          "Token not found in cookies, localStorage, or sessionStorage"
        );
        return;
      }

      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error(`Error decoding token:`, error);
        setDecodedToken(null);
      }
    };

    decodeToken();
  }, []);

  const token = decodedToken;
  return { token };
};

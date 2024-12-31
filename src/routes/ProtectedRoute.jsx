import Cookies from "js-cookie";
import { use, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const token = Cookies.get(import.meta.env.VITE_TOKEN_NAME);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return children;
}

export default ProtectedRoute;

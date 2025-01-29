import { useAppNavigation } from "@/utils/useAppNavigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { goToLogin } = useAppNavigation();
  const location = useLocation();

  const tokenName = Cookies.get(import.meta.env.VITE_TOKEN_NAME);
  let token;
  if (tokenName) {
    token = jwtDecode(tokenName);
  }
  const userData = token?.userData;
  const role = userData?.role;

  useEffect(() => {
    if (!tokenName || !role) {
      goToLogin();
    }

    if (location.pathname.startsWith("/admin") && role !== "admin") {
      goToLogin();
    } else if (location.pathname.startsWith("/doctor") && role !== "doctor") {
      goToLogin();
    } else if (location.pathname.startsWith("/patient") && role !== "patient") {
      goToLogin();
    } else if (
      location.pathname.startsWith("/reception") &&
      role !== "receptionist"
    ) {
      goToLogin();
    }
  }, []);

  useEffect(() => {
    if (role === "admin" && !location.pathname.startsWith("/admin")) {
      navigate("/admin");
    } else if (role === "doctor" && !location.pathname.startsWith("/doctor")) {
      navigate("/doctor");
    } else if (
      role === "patient" &&
      !location.pathname.startsWith("/patient")
    ) {
      navigate("/patient");
    } else if (
      role === "receptionist" &&
      !location.pathname.startsWith("/reception")
    ) {
      navigate("/reception");
    }
  }, [role]);

  return children;
}

export default ProtectedRoute;

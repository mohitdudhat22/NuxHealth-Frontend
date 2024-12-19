import { createContext, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useGlobal } from "../hooks/useGlobal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Login,
  Logout,
  RegisterAdmin,
  RegisterPatient,
} from "@/axiosApi/ApiHelper";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );
  const [loading, setLoading] = useState(true);
  const { getAdminProfile, getDoctorProfile, getPatientProfile } = useGlobal();

  const PatientRegister = async (userData) => {
    setLoading(true);
    const { data } = await RegisterPatient(userData);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    toast.success("Registration Successful");
    navigate("/login");
    setLoading(false);
  };

  const AdminRegister = async (userData) => {
    setLoading(true);
    const { data } = await RegisterAdmin(userData);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    toast.success("Registration Successful");
    setLoading(false);
  };

  const UniversalLogin = async function (userData) {
    setLoading(true);
    try {
      const response = await Login(userData);
      console.log(response);
      localStorage.setItem("token", response?.token);
      localStorage.setItem("user", JSON.stringify(response?.user));
      setUser(response?.user);
      toast.success("Login Successful");
      if (response?.user.role === "doctor") {
        toast.success("Doctor login successful");
        window.location.href = "/doctor";
        await getDoctorProfile(response?.user?.id);
      } else if (response?.user.role === "admin") {
        toast.success("Admin login successful");
        window.location.href = "/";
        await getAdminProfile(response?.user?.id);
      } else if (response?.user.role === "receptionist") {
        toast.success("Reception login successful");
        window.location.href = "/reception";
        await getReceptionProfile(response?.user?.id);
      } else {
        toast.success("Patient login successful");
        window.location.href = "/patient";
        await getPatientProfile(response?.user?.id);
      }
      return response?.user?.role;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await Logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logout Successful");
    navigate("/login");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        PatientRegister,
        AdminRegister,
        UniversalLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

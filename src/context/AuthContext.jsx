import { createContext, useState } from "react";
import axios from "axios";
import apiService from "../services/api";
import PropTypes from "prop-types";
import { useGlobal } from "../hooks/useGlobal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );
  const [loading, setLoading] = useState(true);
  const { getAdminProfile, getDoctorProfile, getPatientProfile } = useGlobal();
  const PatientLogin = async (userData) => {
    setLoading(true);
    try {
      const response = await apiService.PatientLogin(userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.patient));
      axios.defaults.headers.common["Authorization"] =
        `Barer ${response.data.token}`;
      setUser(response.data.user);
      toast.success("Login Successful");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login Failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const PatientRegister = async (userData) => {
    setLoading(true);
    try {
      const { data } = await apiService.PatientRegister(userData);
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setUser(data.user);
      toast.success("Registration Successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const AdminLogin = async (userData) => {
    setLoading(true);
    try {
      const response = await apiService.AdminLogin(userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.patient));
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${response.data.token}`;
      setUser(response.data.user);
      toast.success("Login Successful");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login Failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const AdminRegister = async (userData) => {
    setLoading(true);
    try {
      const { data } = await apiService.AdminRegister(userData);
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setUser(data.user);
      toast.success("Registration Successful");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration Failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const DoctorLogin = async (userData) => {
    setLoading(true);
    try {
      const response = await apiService.DoctorLogin(userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${response.data.token}`;
      setUser(response.data.user);
      toast.success("Login Successful");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login Failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const UniversalLogin = async function (userData) {
    setLoading(true);
    try {
      const response = await apiService.UniversalLogin(userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${response.data.token}`;
      setUser(response.data.user);
      toast.success("Login Successful");

      // Here we have to call the function based on the user role
      if (response.data.user.role === "doctor") {
        toast.success("Doctor login successful");
        // navigate('/doctor', { replace: true });
        window.location.href = "/doctor";

        await getDoctorProfile(response.data.user.id);
      } else if (response.data.user.role === "admin") {
        toast.success("Admin login successful");
        window.location.href = "/";
        await getAdminProfile(response.data.user.id);
      } else {
        toast.success("Patient login successful");
        // navigate('/patient', { replace: true });
        window.location.href = "/patient";

        await getPatientProfile(response.data.user.id);
      }
      return response.data.user.role;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiService.UniversalLogout();

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      toast.success("Logout Successful");
      navigate("/login");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout Failed");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        PatientLogin,
        logout,
        PatientRegister,
        DoctorLogin,
        AdminLogin,
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

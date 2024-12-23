import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useAside = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    switch (location.pathname) {
      //  Website
      case "/admin":
        setCurrentPage("admin");
      case "/admin/doctor-management":
        setCurrentPage("/doctor-management");
    }
  }, [location.pathname]);

  return { currentPage };
};
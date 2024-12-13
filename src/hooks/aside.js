import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useAside = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    switch (location.pathname) {
      //  Website
      case "/":
        setCurrentPage("Home");
        break;
      // Admin
      // Doctor
      case "/doctor":
        setCurrentPage("/doctor");
        break;
      // patient
      case "/patient":
        setCurrentPage("/patient");
        break;
      case "/patient/appointment":
        setCurrentPage("/appointment");
        break;
      case "/patient/priscriptionAccess":
        setCurrentPage("/priscriptionAccess");
        break;
      case "/patient/teleconsultation":
        setCurrentPage("/teleconsultation");
        break;
      case "/patient/chatScreen":
        setCurrentPage("/chatScreen");
        break;
      case "/patient/bills":
        setCurrentPage("/bills");
        break;
      // Reception
      case "/reception":
        setCurrentPage("/reception");
        break;
      case "/reception/appointment":
        setCurrentPage("/appointment");
        break;
      case "/reception/priscriptionAccess":
        setCurrentPage("/priscriptionAccess");
        break;
      case "/reception/teleconsultation":
        setCurrentPage("/teleconsultation");
        break;
      case "/reception/chatScreen":
        setCurrentPage("/chatScreen");
        break;
      case "/reception/bills":
        setCurrentPage("/bills");
        break;
    }
  }, [location.pathname]);

  return { currentPage };
};

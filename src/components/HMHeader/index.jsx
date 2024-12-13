import { useLocation } from "react-router-dom";
import PatientHeader from "@/component/PatientComponents/PatientHeader";
import { Menu, X } from "lucide-react";
import Header from "@/component/Header";

export const HMHeader = ({ handleClick, isSidebarOpen }) => {
  const location = useLocation();

  const header = () => {
    if (location.pathname.includes("/patient")) {
      return <PatientHeader />;
    }
    return <Header />;
  };

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-10xl mx-auto py-1 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <button onClick={handleClick} className="lg:hidden">
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        {header()}
      </div>
    </header>
  );
};

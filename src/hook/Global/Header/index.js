import { headerOption } from "@/constants/data";
import { useSearch } from "@/context";
import { useDecodeToken } from "@/hook/";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useHeader = () => {
  const location = useLocation();
  const { token } = useDecodeToken();

  const { searchValue, setSearchValue,  setRole } = useSearch();
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [options, setOptions] = useState(headerOption);

  const BreadCrumb =
    location.pathname === "/admin" ||
    location.pathname === "/patient" ||
    location.pathname === "/doctor" ||
    location.pathname === "/reception";

  const firstName = token?.userData?.fullName?.split(" ")[0];
  const isAdmin = location.pathname.startsWith("/admin");
  const isDoctor = location?.pathname?.startsWith("/doctor");
  const isPatient = location?.pathname?.startsWith("/patient");
  const isReception = location?.pathname?.startsWith("/reception");

  const defaultOption = isAdmin
    ? "all"
    : isDoctor
    ? "patient"
    : isPatient
    ? "doctor"
    : "doctor";

  const filteredOptions = () => {
    if (isAdmin) {
      return headerOption;
    } else if (isReception) {
      return headerOption.map((option) =>
        option.key === "reception" ? { ...option, disabled: true } : option
      );
    } else if (isDoctor) {
      return headerOption.map((option) =>
        option.key === "doctor" || option.key === "all"
          ? { ...option, disabled: true }
          : option
      );
    }
    return headerOption;
  };

  useEffect(() => {
    setOptions(filteredOptions());
  }, [isAdmin, isDoctor, isPatient, isReception]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleRoleChange = (value) => {
    const role = value.toLowerCase();
    setRole(role);
  };

  return {
    notificationVisible,
    setNotificationVisible,
    defaultOption,
    options,
    handleSearch,
    handleRoleChange,
    BreadCrumb,
    firstName,
    isDoctor,
    searchValue,
    isPatient,
  };
};

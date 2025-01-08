import { headerOption } from "@/constants/data";
import { useSearch } from "@/context";
import { useDecodeToken } from "@/hook/";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const useHeader = () => {
  const location = useLocation();
  const { token } = useDecodeToken();

  const { searchValue, setSearchValue } = useSearch();
  const [notificationVisible, setNotificationVisible] = useState(false);

  const BreadCrumb =
    location.pathname === "/admin" ||
    location.pathname === "/patient" ||
    location.pathname === "/doctor" ||
    location.pathname === "/reception";

  const firstName = token?.userData?.fullName?.split(" ")[0];
  const isDoctor = location?.pathname?.startsWith("/doctor");
  const isReception = location?.pathname?.startsWith("/reception");

  const defaultOption = isDoctor ? "patient" : "doctor";
  const filteredOptions = isReception
    ? headerOption?.filter((option) => option?.key !== "reception")
    : headerOption;

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return {
    notificationVisible,
    setNotificationVisible,
    defaultOption,
    filteredOptions,
    handleSearch,
    BreadCrumb,
    firstName,
    isDoctor,
    searchValue,
  };
};

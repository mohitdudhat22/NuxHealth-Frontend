import {
  Bill1,
  Bill2,
  Bill3,
  NHCard,
  StaticBill1,
  StaticBill2,
  StaticBill3,
} from "@/components";
import Icons from "@/constants/icons";
import { useAppNavigation } from "@/utils/useAppNavigation";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const InsuranceBillView = () => {
  const location = useLocation();
  const { billData } = location.state || {};
  const { goBack } = useAppNavigation();
  const selectedInvoice = localStorage.getItem("selectedBill") || "Bill";

  const handleBack = () => {
    navigate(-1);
  };

  const renderBill = () => {
    switch (selectedInvoice) {
      case "Bill":
        return <Bill1 billData={billData} />;
      case "Bill2":
        return <Bill2 billData={billData} />;
      case "Bill3":
        return <Bill3 billData={billData} />;
      default:
        return <Bill1 billData={billData} />;
    }
  };

  return <div className="big-container">{renderBill()}</div>;
};

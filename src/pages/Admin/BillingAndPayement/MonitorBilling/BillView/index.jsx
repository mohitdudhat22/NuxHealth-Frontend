import { Bill1, Bill2, Bill3, NHCard } from '@/components';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icons from '@/constants/icons';

export const BillView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { billData } = location.state || {};
  const selectedInvoice = localStorage.getItem('selectedBill') || "Bill";

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

  return (
    <div className="big-container">
      <button onClick={handleBack} className="close-back-button">{Icons?.CloseCircle}</button>
      <NHCard>
        {renderBill()}
      </NHCard>
    </div>
  );
};
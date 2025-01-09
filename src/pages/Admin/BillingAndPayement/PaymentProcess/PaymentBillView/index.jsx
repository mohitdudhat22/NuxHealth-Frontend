import { Bill1, Bill2, Bill3, StaticBill1, StaticBill2, StaticBill3 } from '@/components'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

export const PaymentBillView = () => {
  const location = useLocation();
    const { billData } = location.state || {};

  const selectedInvoice = (localStorage.getItem('selectedBill') || "Bill")
  switch (selectedInvoice) {
    case "Bill":
      return <Bill1 billData={billData} />
    case "Bill2":
      return <Bill2 billData={billData} />
    case "Bill3":
      return <Bill3 billData={billData} />
    default:
      return <Bill1 billData={billData} />
  }
}
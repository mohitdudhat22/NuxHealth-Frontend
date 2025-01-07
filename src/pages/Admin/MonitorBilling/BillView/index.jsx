import { Bill1, Bill2, Bill3, StaticBill1, StaticBill2, StaticBill3 } from '@/components'
import React, { useState } from 'react'

export const BillView = () => {
  const selectedInvoice = (localStorage.getItem('selectedBill') || "Bill")
  switch (selectedInvoice) {
    case "Bill":
      return <Bill1 />
    case "Bill2":
      return <Bill2 />
    case "Bill3":
      return <Bill3 />
    default:
      return <Bill1 />
  }
}
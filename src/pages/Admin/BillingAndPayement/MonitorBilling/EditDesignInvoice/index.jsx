import { StaticBill1, StaticBill2, StaticBill3 } from '@/components'
import Icons from '@/constants/icons';
import { useAppNavigation } from '@/utils/useAppNavigation';
import React, { useState } from 'react'

export const EditDesignInvoice = () => {
    const { goBack } = useAppNavigation();
  const [selectedInvoice, setSelectedInvoice] = useState(localStorage.getItem('selectedBill') || "Bill")  // Add state
  const handleSelectInvoice = (billType) => {
    setSelectedInvoice(billType);
    localStorage.setItem("selectedBill", billType);
  };
  return (
    <>
      <div className="bg-[#F6F8FB] p-6 h-[93%] rounded-lg relative">
        <div className="title mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Select Invoice Theme
          </h1>
          <button onClick={goBack} className="close-back-button text-gray-500 hover:text-gray-700 transition-colors duration-200">
            {Icons?.CloseCircle}
          </button>
        </div>
        <div className="theme-selector">
          <div className="invoice-samples grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
            <div
              className={`invoice bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative cursor-pointer ${
                selectedInvoice === "Bill"
                  ? "ring-2 ring-[#0EABEB] shadow-lg transform scale-[1.02]"
                  : ""
              }`}
              onClick={() => handleSelectInvoice("Bill")}
            >
              <StaticBill1 />
              {selectedInvoice === "Bill" && (
                <div className="absolute inset-0 bg-[#0EABEB] bg-opacity-10 rounded-lg"></div>
              )}
            </div>
            <div
              className={`invoice bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative cursor-pointer ${
                selectedInvoice === "Bill3"
                  ? "ring-2 ring-[#0EABEB] shadow-lg transform scale-[1.02]"
                  : ""
              }`}
              onClick={() => handleSelectInvoice("Bill3")}
            >
              <StaticBill3 />
              {selectedInvoice === "Bill3" && (
                <div className="absolute inset-0 bg-[#0EABEB] bg-opacity-10 rounded-lg"></div>
              )}
            </div>
            <div
              className={`invoice bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative cursor-pointer ${
                selectedInvoice === "Bill2"
                  ? "ring-2 ring-[#0EABEB] shadow-lg transform scale-[1.02]"
                  : ""
              }`}
              onClick={() => handleSelectInvoice("Bill2")}
            >
              <StaticBill2 />
              {selectedInvoice === "Bill2" && (
                <div className="absolute inset-0 bg-[#0EABEB] bg-opacity-10 rounded-lg"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

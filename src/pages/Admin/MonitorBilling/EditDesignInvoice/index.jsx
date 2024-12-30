import { Bill1, Bill2, Bill3 } from '@/components'
import React, { useState } from 'react'

export const EditDesignInvoice = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null)  // Add state

  const handleSelectInvoice = (billType) => {
    setSelectedInvoice(billType)
  }
  return (
    <>
      <div className="bg-[#F6F8FB] p-6 h-[93%] rounded-lg">
        <div className="title mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Select Invoice Theme
          </h1>
        </div>
        <div className="theme-selector">
          <div className="invoice-samples grid grid-cols-3 gap-6 w-full">
            <div
              className={`invoice bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 relative cursor-pointer ${
                selectedInvoice === "Bill" 
                  ? "ring-2 ring-[#0EABEB] shadow-lg transform scale-[1.02]" 
                  : ""
              }`}
              onClick={() => handleSelectInvoice("Bill")}
            >
              <Bill1 />
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
              <Bill3 />
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
              <Bill2 />
              {selectedInvoice === "Bill2" && (
                <div className="absolute inset-0 bg-[#0EABEB] bg-opacity-10 rounded-lg"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

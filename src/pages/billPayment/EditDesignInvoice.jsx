import { useState } from "react";
import { StaticBill } from "../invoice/StaticBill";
import { StaticBill2 } from "../invoice/StaticBill2";
import { StaticBill3 } from "../invoice/StaticBill3";

export default function EditDesignInvoice() {
  const [selectedInvoice, setSelectedInvoice] = useState(
    localStorage.getItem("adminPrefrence") || "Bill",
  );

  const handleSelectInvoice = (invoiceName) => {
    setSelectedInvoice(invoiceName);
    console.log(`Selected invoice: ${invoiceName}`);
    localStorage.setItem("adminPrefrence", invoiceName);
  };

  return (
    <>
      <div className="bg-[#F6F8FB] p-3 h-[93%]">
        <div className="bill-box bg-white p-4 h-[100%] rounded-lg m-2">
          <div className="title mb-5">
            <h1 className="text-2xl font-bold text-gray-900">
              Select Invoice Theme
            </h1>
          </div>
          <div className="theme-selector flex">
            <div className="invoice-samples flex justify-between w-full">
              <div
                className={`invoice w-2/6 bg-transparent relative cursor-pointer ${
                  selectedInvoice === "Bill" ? "border-2 border-[#0EABEB]" : ""
                }`}
                onClick={() => handleSelectInvoice("Bill")}
              >
                <StaticBill />
                {selectedInvoice === "Bill" && (
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
                )}
              </div>
              <div
                className={`invoice w-[30%] bg-transparent relative cursor-pointer ${
                  selectedInvoice === "Bill3" ? "border-2 border-[#0EABEB]" : ""
                }`}
                onClick={() => handleSelectInvoice("Bill3")}
              >
                <StaticBill3 />
                {selectedInvoice === "Bill3" && (
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
                )}
              </div>
              <div
                className={`invoice w-2/6 bg-transparent relative cursor-pointer ${
                  selectedInvoice === "Bill2" ? "border-2 border-[#0EABEB]" : ""
                }`}
                onClick={() => handleSelectInvoice("Bill2")}
              >
                <StaticBill2 />
                {selectedInvoice === "Bill2" && (
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

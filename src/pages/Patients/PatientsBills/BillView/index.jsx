import { FullLogo } from "@/assets/images";
import { NHCard } from "@/components";
import React from "react";

export const PatientBillView = () => {
  const staticData = {
    doctorName: "Dr. Bharat Patel",
    doctorDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis turpis vitae.",
    billNumber: "1234",
    date: "2020-06-20",
    time: "10:45 PM",
    patient: {
      firstName: "Ritesh",
      lastName: "Kumar",
      gender: "Male",
      age: "28",
      address: "B-105 Vijay Banglow Parijatak Mithakhali",
      phone: "#987 5647 23",
    },
    diseaseName: "Stomach Ach",
    paymentType: "Insurance",
    amount: 1000.0,
    discount: 5,
    tax: 120.0,
    totalAmount: 24668.0,
  };
  return (
    <div className="w-full md:w-[50%] m-auto">
      <NHCard>
        <div className="head flex justify-between pb-5">
          <img src={FullLogo} className="w-2/5 h-auto" alt="Logo" />
          <div className="text-3xl text-blue-400 font-light">Invoice</div>
        </div>

        <div className="wrapper px-5">
          <div className="billing-info flex justify-between mb-5 p-4">
            <div className="info w-3/5">
              <h3 className="text-lg font-bold text-gray-900">
                {staticData.doctorName}
              </h3>
              <span className="text-base text-gray-500">
                {staticData.doctorDescription}
              </span>
            </div>
            <div>
              <p>
                <strong>Bill No :</strong> <span>{staticData.billNumber}</span>
              </p>
              <p>
                <strong>Date :</strong>{" "}
                <span>{new Date(staticData.date).toLocaleDateString()}</span>
              </p>
              <p>
                <strong>Bill Time :</strong> <span>{staticData.time}</span>
              </p>
            </div>
          </div>

          <div className="invoice__patient bg-gray-100 p-4 rounded-lg flex justify-between">
            <div>
              <h3 className="text-base font-bold text-[#141414]">
                Billing To:
              </h3>
              <h3 className="text-base font-bold text-[#141414]">
                {staticData.patient.firstName} {staticData.patient.lastName}
              </h3>
              <span className="text-xs text-gray-500 block mt-2">
                {staticData.patient.address}
              </span>
              <span className="text-xs text-gray-500 block">
                {staticData.patient.phone}
              </span>
            </div>
          </div>

          <table className="invoice__table w-full my-3 border-collapse">
            <thead>
              <tr className="bg-[#0eabeb] text-white text-xs">
                <th className="p-2 rounded-l-lg text-left">Item</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Qty</th>
                <th className="p-2 text-left rounded-r-lg">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                  Payment transferred
                </td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                  $120.00
                </td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">2</td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                  $240.00
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-2 text-[#4F4F4F] font-medium text-sm rounded-l-lg">
                  Payment transferred
                </td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                  $120.00
                </td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">2</td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm rounded-r-lg">
                  $240.00
                </td>
              </tr>
              <tr>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                  Payment transferred
                </td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                  $120.00
                </td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">2</td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                  $240.00
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-2 text-[#4F4F4F] font-medium text-sm rounded-l-lg">
                  Payment transferred
                </td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                  $120.00
                </td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">2</td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm rounded-r-lg">
                  $240.00
                </td>
              </tr>
              <tr>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                  Payment transferred
                </td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                  $120.00
                </td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">2</td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                  $240.00
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-2 text-[#4F4F4F] font-medium text-sm rounded-l-lg">
                  Payment transferred
                </td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                  $120.00
                </td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm">2</td>
                <td className="p-2 text-[#4F4F4F] font-medium text-sm rounded-r-lg">
                  $240.00
                </td>
              </tr>
            </tbody>
          </table>

          <div className="invoice__total text-right font-bold text-lg">
            <table className="w-full max-w-xs ml-auto">
              <tbody>
                <tr>
                  <td className="p-2 text-sm font-semibold text-gray-900">
                    Sub Total :{" "}
                    <span className="ml-2 text-gray-500">$2110.00</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-sm font-semibold text-gray-900">
                    Discount 5% :{" "}
                    <span className="ml-2 text-gray-500">$255.00</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-sm font-semibold text-blue-500">
                    Total : <span className="ml-2 text-blue-500">$2254.00</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="footer bg-[#0eabeb] text-white text-center p-3 text-sm flex justify-between">
          <p>Call: +00854 22354</p>
          <p>Email: Hello@Gmail.com</p>
        </div>
      </NHCard>
    </div>
  );
};

import React from "react";

export const StaticBill = () => {
  return (
    <div className="">
      <div className="invoice max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="head flex justify-between pb-3">
          <img src="/img/logo.png" className="w-2/5 h-auto" alt="Logo" />
          <img src="/img/invoice.png" className="w-[45%] h-auto" alt="Logo" />
        </div>
        <div className="wrapper px-5">
          <div className="grid grid-cols-2 justify-between mb-3 p-2">
            <div>
              <h3 className="text- font-bold text-gray-900">
                Dr. Bharat Patel
              </h3>
              <span className="text-[12px] text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                mattis turpis nulla, finibus sodales erat porta eu.
              </span>
            </div>
            <div className="ps-14">
              <p className="text-[14px] font-semibold ">
                Bill No :{" "}
                <span className="text-[14px] text-[#818194]">1234</span>
              </p>
              <p className="text-[14px] font-semibold">
                Bill Date :{" "}
                <span className="text-[14px] text-[#818194]">
                  20 June, 2020
                </span>
              </p>
              <p className="text-[14px] font-semibold">
                Bill Time :{" "}
                <span className="text-[14px] text-[#818194]">10:45 PM</span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 bg-gray-100 p-4 rounded-lg flex justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#141414]">
                Name:{" "}
                <span className="text-sm text-[#818194] font-semibold ml-3">
                  Miracle Kenter
                </span>
              </p>
              <p className="text-sm font-semibold text-[#141414]">
                Gender:{" "}
                <span className="text-sm  text-[#818194] font-semibold ml-3">
                  Male
                </span>
              </p>
              <p className="text-sm font-semibold text-[#141414]">
                Age:{" "}
                <span className="text-sm text-[#818194] font-semibold ml-3">
                  36 Years
                </span>
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-[#141414]">
                Disease Name:{" "}
                <span className="text-sm text-[#818194] font-medium ml-3">
                  Stomach Ach
                </span>
              </p>
              <p className="text-sm font-semibold text-[#141414]">
                Phone Number:{" "}
                <span className="text-sm text-[#818194] font-semibold ml-3">
                  9957 96557
                </span>
              </p>
              <p className="text-sm font-semibold text-[#141414]">
                Payment Type:{" "}
                <span className="text-sm text-[#0EABEB] font-semibold ml-3">
                  Online
                </span>
              </p>
            </div>
            <p className="text-sm font-semibold text-[#141414] col-span-2 pt-1">
              Address:
              <span className="text-sm text-[#818194] font-semibold ml-3">
                B-105 Virat Bungalows Punagam Motavaracha Jamnagar.
              </span>
            </p>
          </div>
          <table className="invoice__table w-full my-3 border-collapse">
            <thead>
              <tr className="bg-[#0eabeb] text-white text-xs ">
                <th className="p-2 rounded-tl-lg">Description</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Qty</th>
                <th className="p-2 rounded-tr-lg">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 text-[#4F4F4F] font-medium text-sm">
                  Neuromuscular blockers
                </td>
                <td className="py-2 text-[#4F4F4F] font-medium text-sm text-center">
                  ₹ 12000
                </td>
                <td className="py-2 text-[#4F4F4F] font-medium text-sm text-center">
                  2
                </td>
                <td className="py-2 text-[#4F4F4F] font-medium text-sm text-center">
                  ₹ 24000
                </td>
              </tr>
              <tr>
                <td className="py-2 text-[#4F4F4F] font-medium text-sm">
                  Neuromuscular blockers
                </td>
                <td className="py-2 text-[#4F4F4F] font-medium text-sm text-center">
                  ₹ 800
                </td>
                <td className="py-2 text-[#4F4F4F] font-medium text-sm text-center">
                  2
                </td>
                <td className="py-2 text-[#4F4F4F] font-medium text-sm text-center">
                  ₹ 1600
                </td>
              </tr>
              <tr>
                <td className="py-2 text-[#4F4F4F] font-medium text-sm">
                  Leucovorin with high dose methotrexate (HDMTX)
                </td>
                <td className="py-2 text-[#4F4F4F] font-medium text-sm text-center">
                  ₹ 1000
                </td>
                <td className="py-2 text-[#4F4F4F] font-medium text-sm text-center">
                  2
                </td>
                <td className="py-2 text-[#4F4F4F] font-medium text-sm text-center">
                  ₹ 2000
                </td>
              </tr>
              <tr>
                <td className="py-2 text-[#4F4F4F] font-medium text-sm">
                  Hydroxyurea for sickle cell disease
                </td>
                <td className="py-2 text-[#4F4F4F] font-medium text-sm text-center">
                  ₹ 20
                </td>
                <td className="py-2 text-[#4F4F4F] font-medium text-sm text-center">
                  2
                </td>
                <td className="py-2 text-[#4F4F4F] font-medium text-sm text-center">
                  ₹ 40
                </td>
              </tr>
            </tbody>
          </table>
          <div className="invoice__total text-right font-bold text-lg">
            <table className="w-full max-w-xs ml-auto">
              <tr>
                <td className="label text-sm font-semibold">Amount:</td>
                <td className="value text-right text-sm font-semibold">
                  ₹ 25,840.00
                </td>
              </tr>
              <tr>
                <td className="label text-sm font-semibold">Discount 5%:</td>
                <td className="value text-right text-sm font-semibold">
                  ₹ 1,292.00
                </td>
              </tr>
              <tr>
                <td className="label text-sm font-semibold">Tax:</td>
                <td className="value text-right text-sm font-semibold">
                  ₹ 120.00
                </td>
              </tr>
              <tr className="text-blue-500">
                <td className="label text-sm font-semibold">Total:</td>
                <td className="value text-right text-sm font-semibold">
                  ₹ 24,668.00
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="footer bg-[#0eabeb] text-white text-center p-3 text-sm flex justify-between">
          <p>Call: +00854 22354</p>
          <p>Email: Hello@Gmail.com</p>
        </div>
      </div>
    </div>
  );
};

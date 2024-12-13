import React from "react";

export const StaticBill2 = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="invoice bg-white rounded-lg shadow-md max-w-3xl mx-auto overflow-hidden">
        <div className="head flex justify-between">
          <img src="/img/logo.png" className="w-2/5 h-auto" alt="Logo" />
          <img src="/img/invoice.png" className="w-[45%] h-auto" alt="Logo" />
        </div>
        <div className="content px-5 py-4">
          <div className="billing-info flex justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#141414]">
                Billing To:
              </h3>
              <h3 className="text-base font-bold text-[#141414]">
                Adeline Palmerston
              </h3>
              <span className="text-xs text-gray-500 block mt-2">
                123 Anywhere St., Any City, ST 12345
              </span>
            </div>
            <div>
              <p className="text-sm">
                <strong>Invoice No :</strong>
                <span className="text-xs text-gray-500 ml-2">1234</span>
              </p>
              <p className="text-sm">
                <strong>Invoice Date :</strong>
                <span className="text-xs text-gray-500 ml-2">
                  20 June, 2020
                </span>
              </p>
              <p className="text-sm">
                <strong>Due Date :</strong>
                <span className="text-xs text-gray-500 ml-2">
                  30 June, 2020
                </span>
              </p>
            </div>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#0eabeb] text-white text-xs ">
                <th className="p-2 rounded-l-lg text-left">Item</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Qty</th>
                <th className="p-2  text-left rounded-r-lg">Total</th>
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
          <div className="flex justify-between mt-5">
            <div className="payment-method">
              <strong className="text-sm text-gray-900">Payment Method</strong>
              <p className="text-xs text-gray-500 pt-1">
                Bank Name: <span className="ml-2">State Bank Of India</span>
                <br />
                Account No.: <span className="ml-2">1234567890</span>
              </p>
            </div>
            <div className="totals text-right">
              <p className="text-sm font-semibold text-gray-900">
                Sub Total : <span className="ml-2 text-gray-500">$2110.00</span>
              </p>
              <p className="text-sm font-semibold text-gray-900">
                Discount 5% :{" "}
                <span className="ml-2 text-gray-500">$255.00</span>
              </p>
              <p className="text-sm font-semibold text-blue-500">
                Total : <span className="ml-2 text-blue-500">$2254.00</span>
              </p>
            </div>
          </div>
          <hr className="my-3" />
          <div className="terms">
            <strong className="text-base font-semibold text-gray-900">
              Term & Conditions:
            </strong>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="footer bg-[#0eabeb] text-white p-3 text-center text-sm flex justify-between">
          <p>Call: +00854 22354</p>
          <p>Email: Hello@Gmail.com</p>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

export const StaticBill3 = () => {
  return (
    <div className="invoice2 bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto max-h-[950px]">
      <div className="border-b-4 border-[#0eabeb] rounded-b-[40px]">
        <header className="bg-[#0eabeb] text-white p-3 px-5 rounded-t-lg flex justify-between items-center mb-2 rounded-b-[40px]">
          <div className="logo flex items-center">
            <img src="/img/logo-white.png" className="w-[200px]" alt="Logo" />
          </div>
          <div className="invoice-title text-right">
            <h1 className="text-[34px] font-bold m-0">Invoice</h1>
            <p className="text-sm font-normal m-0">Invoice No: 1234</p>
          </div>
        </header>
      </div>
      <main className="p-5">
        <div className="flex justify-between mb-8">
          <section className="customer-info">
            <h2 className="text-[13px] font-semibold text-gray-400">
              Invoice To:
            </h2>
            <span className="text-base font-semibold text-[#030229]">
              PLK Madhuvan Bank
            </span>
            <p className="text-xs font-medium text-[#4F4F4F] flex items-center pt-1">
              <BiSolidPhoneCall className="inline text-xs mr-2" /> +123-456-7890
            </p>
            <p className="text-xs font-medium text-[#4F4F4F] flex items-center">
              <IoMdMail className="inline text-xs mr-2" /> www.gallery.com
            </p>
            <p className="text-xs font-medium text-[#4F4F4F] flex items-center">
              <FaLocationDot className="inline text-xs mr-2" /> 123 Anywhere
              Street, Any City
            </p>
          </section>

          <section className="invoice-details text-right">
            <p className="text-sm text-gray-500 font-medium">
              Invoice Date : 30 May, 2020
            </p>
            <p className="text-sm font-medium text-gray-500">
              <strong className="font-medium">Total Due:</strong>{" "}
              <span className="text-[#0eabeb] pt-2 block">$ 1,251</span>
            </p>
          </section>
        </div>

        <table className="w-full border-collapse mb-8">
          <thead>
            <tr>
              <th className="bg-[#0eabeb] text-xs p-2 text-left text-white  rounded-l-lg">
                Description
              </th>
              <th className="bg-[#0eabeb] text-xs p-2 text-left text-white">
                Qty.
              </th>
              <th className="bg-[#0eabeb] text-xs p-2 text-left text-white">
                Price
              </th>
              <th className="bg-[#0eabeb] text-xs p-2 text-left text-white rounded-r-lg">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white text-sm text-[#4F4F4F] font-medium ">
              <td className="pt-5 px-2 pb-2">Payment transferred</td>
              <td className="pt-5 px-2 pb-2">2</td>
              <td className="pt-5 px-2 pb-2">$ 200</td>
              <td className="pt-5 px-2 pb-2">$ 3525</td>
            </tr>
            <tr className="bg-white text-sm text-[#4F4F4F] font-medium">
              <td className="p-2">Payment transferred</td>
              <td className="p-2">2</td>
              <td className="p-2">$ 200</td>
              <td className="p-2">$ 3525</td>
            </tr>
            <tr className="bg-white text-sm text-[#4F4F4F] font-medium">
              <td className="p-2">Payment transferred</td>
              <td className="p-2">2</td>
              <td className="p-2">$ 200</td>
              <td className="p-2">$ 3525</td>
            </tr>
            <tr className="bg-white text-sm text-[#4F4F4F] font-medium">
              <td className="p-2">Payment transferred</td>
              <td className="p-2">2</td>
              <td className="p-2">$ 200</td>
              <td className="p-2">$ 3525</td>
            </tr>
          </tbody>
        </table>

        <section className="totals text-right">
          <p className="text-[13px] font-medium">
            <strong className="mr-8 text-[#030229]">Sub Total:</strong>{" "}
            <span className="text-gray-400">$ 21100.00</span>
          </p>
          <p className="text-[13px] font-medium py-1">
            <strong className="mr-14 text-[#030229]">Tax:</strong>{" "}
            <span className="text-gray-400">$ 25.00</span>
          </p>
          <p className="text-[13px] font-medium text-[#0eabeb]">
            <strong className="mr-8">Total:</strong>{" "}
            <span className="text-[#0eabeb]">$ 22545.00</span>
          </p>
        </section>
      </main>

      <footer className="p-3 px-5 border-t border-gray-300 flex justify-between">
        <section className="terms w-2/3">
          <h3 className="text-lg font-semibold text-gray-900 pb-1">
            Terms and Conditions
          </h3>
          <p className="text-[14px] font-normal text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            malesuada lacus vel eros faucibus, et finibus nisi porta.
          </p>
        </section>
        <section className="signature p-5">
          <h3 className="border-b border-gray-900 text-gray-900 text-lg pb-3">
            Signature
          </h3>
        </section>
      </footer>
    </div>
  );
};

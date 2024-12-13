import { BiSolidPhoneCall } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useGlobal } from "../../hooks/useGlobal";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function Bill3() {
  const { id } = useParams();
  const { getBillById, bill } = useGlobal();
  const [formData, setFormData] = useState({
    billNumber: "",
    description: "",
    paymentType: "",
    date: "",
    time: "",
    amount: 0,
    discount: 0,
    tax: 0,
    totalAmount: 0,
    status: "",
    patientId: "",
    doctorId: "",
    insuranceId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBillById(id);
        setFormData(bill);
      } catch (error) {
        console.error("Error fetching billing data:", error);
        toast.error("Error fetching billing data.");
      }
    };
    fetchData();
  }, []);

  // Format date helper function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Calculate amounts
  const taxAmount = (formData.amount * formData.tax) / 100;

  return (
    <>
      <div className="bg-[#F6F8FB] p-3 h-[92%]">
        <div className="invoice2 bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto max-h-[950px] mt-[40px]">
          <div className="border-b-4 border-[#0eabeb] rounded-b-[40px]">
            <header className="bg-[#0eabeb] text-white p-3 px-5 rounded-t-lg flex justify-between items-center mb-2 rounded-b-[40px]">
              <div className="logo flex items-center">
                <img
                  src="/img/logo-white.png"
                  className="w-[200px]"
                  alt="Logo"
                />
              </div>
              <div className="invoice-title text-right">
                <h1 className="text-[34px] font-bold m-0">Invoice</h1>
                <p className="text-sm font-normal m-0">
                  Invoice No: {formData.billNumber}
                </p>
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
                  {formData.patientId?.firstName} {formData.patientId?.lastName}
                </span>
                <p className="text-xs font-medium text-[#4F4F4F] flex items-center pt-1">
                  <BiSolidPhoneCall className="inline text-xs mr-2" />
                  {formData.patientId?.phone}
                </p>
                <p className="text-xs font-medium text-[#4F4F4F] flex items-center">
                  <IoMdMail className="inline text-xs mr-2" />
                  {formData.patientId?.email}
                </p>
                <p className="text-xs font-medium text-[#4F4F4F] flex items-center">
                  <FaLocationDot className="inline text-xs mr-2" />
                  {formData.address}
                </p>
              </section>

              <section className="invoice-details text-right">
                <p className="text-sm text-gray-500 font-medium">
                  Invoice Date : {formatDate(formData.createdAt)}
                </p>
                <p className="text-sm font-medium text-gray-500">
                  <strong className="font-medium">Total Due:</strong>{" "}
                  <span className="text-[#0eabeb] pt-2 block">
                    $ {formData.totalAmount?.toFixed(2)}
                  </span>
                </p>
              </section>
            </div>

            <table className="w-full border-collapse mb-8">
              <thead>
                <tr>
                  <th className="bg-[#0eabeb] text-xs p-2 text-left text-white rounded-l-lg">
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
                <tr className="bg-white text-sm text-[#4F4F4F] font-medium">
                  <td className="pt-5 px-2 pb-2">{formData.description}</td>
                  <td className="pt-5 px-2 pb-2">1</td>
                  <td className="pt-5 px-2 pb-2">
                    $ {formData.amount?.toFixed(2)}
                  </td>
                  <td className="pt-5 px-2 pb-2">
                    $ {formData.amount?.toFixed(2)}
                  </td>
                </tr>
                {formData.diseaseName && (
                  <tr className="bg-white text-sm text-[#4F4F4F] font-medium">
                    <td className="p-2">
                      Disease Treatment: {formData.diseaseName}
                    </td>
                    <td className="p-2">-</td>
                    <td className="p-2">-</td>
                    <td className="p-2">-</td>
                  </tr>
                )}
              </tbody>
            </table>

            <section className="totals text-right">
              <p className="text-[13px] font-medium">
                <strong className="mr-8 text-[#030229]">Sub Total:</strong>{" "}
                <span className="text-gray-400">
                  $ {formData.amount?.toFixed(2)}
                </span>
              </p>
              <p className="text-[13px] font-medium py-1">
                <strong className="mr-14 text-[#030229]">
                  Tax ({formData.tax}%):
                </strong>{" "}
                <span className="text-gray-400">$ {taxAmount?.toFixed(2)}</span>
              </p>
              <p className="text-[13px] font-medium text-[#0eabeb]">
                <strong className="mr-8">Total:</strong>{" "}
                <span className="text-[#0eabeb]">
                  $ {formData.totalAmount?.toFixed(2)}
                </span>
              </p>
            </section>
          </main>

          <footer className="p-3 px-5 border-t border-gray-300 flex justify-between">
            <section className="terms w-2/3">
              <h3 className="text-lg font-semibold text-gray-900 pb-1">
                Terms and Conditions
              </h3>
              <p className="text-[14px] font-normal text-gray-400">
                Please pay the amount within the due date. For any queries
                regarding the bill, please contact our billing department.
              </p>
            </section>
          </footer>
        </div>
      </div>
    </>
  );
}

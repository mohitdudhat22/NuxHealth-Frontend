import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useGlobal } from "../../hooks/useGlobal";

export default function Bill2() {
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
  const discountAmount = (formData.amount * formData.discount) / 100;
  const taxAmount = (formData.amount * formData.tax) / 100;

  return (
    <>
      <div className="bg-[#F6F8FB] p-3 h-[92%]">
        <div className="flex justify-center items-center">
          <div className="invoice bg-white rounded-lg shadow-md max-w-3xl mx-auto overflow-hidden mt-[40px]">
            <div className="head flex justify-between">
              <img src="/img/logo.png" className="w-2/5 h-auto" alt="Logo" />
              <img
                src="/img/invoice.png"
                className="w-[45%] h-auto"
                alt="Logo"
              />
            </div>
            <div className="content px-5 py-4">
              <div className="billing-info flex justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-[#141414]">
                    Billing To:
                  </h3>
                  <h3 className="text-base font-bold text-[#141414]">
                    {formData.patientId?.firstName}{" "}
                    {formData.patientId?.lastName}
                  </h3>
                  <span className="text-xs text-gray-500 block mt-2">
                    {formData.address}
                  </span>
                  <span className="text-xs text-gray-500 block">
                    {formData.patientId?.phone}
                  </span>
                </div>
                <div>
                  <p className="text-sm">
                    <strong>Invoice No :</strong>
                    <span className="text-xs text-gray-500 ml-2">
                      {formData.billNumber}
                    </span>
                  </p>
                  <p className="text-sm">
                    <strong>Invoice Date :</strong>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatDate(formData.createdAt)}
                    </span>
                  </p>
                  <p className="text-sm">
                    <strong>Due Date :</strong>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatDate(formData.date)}
                    </span>
                  </p>
                </div>
              </div>
              <table className="w-full border-collapse">
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
                    <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                      2
                    </td>
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
                    <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                      2
                    </td>
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
                    <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                      2
                    </td>
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
                    <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                      2
                    </td>
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
                    <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                      2
                    </td>
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
                    <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                      2
                    </td>
                    <td className="p-2 text-[#4F4F4F] font-medium text-sm rounded-r-lg">
                      $240.00
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-between mt-5">
                <div className="payment-method">
                  <strong className="text-sm text-gray-900">
                    Payment Method
                  </strong>
                  <p className="text-xs text-gray-500 pt-1">
                    Bank Name: <span className="ml-2">State Bank Of India</span>
                    <br />
                    Account No.: <span className="ml-2">1234567890</span>
                  </p>
                </div>
                <div className="totals text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    Sub Total :{" "}
                    <span className="ml-2 text-gray-500">$2110.00</span>
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
            <div className="footer bg-[#0eabeb] text-white p-3 text-center text-sm flex justify-between">
              <p>Call: +00854 22354</p>
              <p>Email: Hello@Gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

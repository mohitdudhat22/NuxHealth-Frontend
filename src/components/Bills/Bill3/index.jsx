import { FullLogo } from "@/assets/images";
import { NHCard } from "@/components";
import { useGetSingleBill } from "@/hook/Global";

export function Bill3() {
  const { data: billData } = useGetSingleBill();

  if (!billData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[80%] md:w-[50%] m-auto">
      <NHCard>
        <div className="flex justify-between pb-5 head">
          <img src={FullLogo} className="w-2/5 h-auto" alt="Logo" />
          <div className="text-3xl font-light text-blue-400">Invoice</div>
        </div>

        <div className="px-5 wrapper">
          <div className="flex justify-between p-4 mb-5 billing-info">
            <div className="w-3/5 info">
              <h3 className="text-lg font-bold text-gray-900">
                {billData.doctorId?.fullName || "Dr. Bharat Patel"}
              </h3>
              <span className="text-base text-gray-500">
                {billData.doctorDescription ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis turpis vitae."}
              </span>
            </div>
            <div>
              <p>
                <strong>Bill No :</strong> <span>{billData.billNumber}</span>
              </p>
              <p>
                <strong>Date :</strong>{" "}
                <span>{new Date(billData.date).toLocaleDateString()}</span>
              </p>
              <p>
                <strong>Bill Time :</strong>{" "}
                <span>{new Date(billData.time).toLocaleTimeString()}</span>
              </p>
            </div>
          </div>

          <div className="flex justify-between p-4 bg-gray-100 rounded-lg invoice__patient">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#141414]">
                Name:{" "}
                <span className="text-sm text-[#818194] font-semibold ml-3">
                  {billData.patientId?.fullName || "Ritesh Kumar"}
                </span>
              </p>
              <p className="text-sm font-semibold text-[#141414]">
                Gender:{" "}
                <span className="text-sm text-[#818194] font-semibold ml-3">
                  {billData.patientId?.gender || "Male"}
                </span>
              </p>
              <p className="text-sm font-semibold text-[#141414]">
                Age:{" "}
                <span className="text-sm text-[#818194] font-semibold ml-3">
                  {billData.patientId?.age || "28"} Years
                </span>
              </p>
              <p className="text-sm font-semibold text-[#141414]">
                Address:{" "}
                <span className="text-sm text-[#818194] font-semibold ml-3">
                  {billData.patientId?.address?.fullAddress ||
                    "B-105 Vijay Banglow Parijatak Mithakhali"}
                </span>
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#141414]">
                Disease Name:{" "}
                <span className="text-sm text-[#818194] font-semibold ml-3">
                  {billData.appointmentId?.dieseas_name || "Migraine"}
                </span>
              </p>
              <p className="text-sm font-semibold text-[#141414]">
                Phone Number:{" "}
                <span className="text-sm text-[#818194] font-semibold ml-3">
                  {billData.patientId?.phone || "#987 5647 23"}
                </span>
              </p>
              <p className="text-sm font-semibold text-[#141414]">
                Payment Type:{" "}
                <span className="text-sm text-[#818194] font-semibold ml-3">
                  {billData.paymentType || "Cash"}
                </span>
              </p>
            </div>
          </div>

          <table className="w-full my-3 border-collapse invoice__table">
            <thead>
              <tr className="bg-[#0eabeb] text-white text-xs">
                <th className="p-2 rounded-tl-lg">Description</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Qty</th>
                <th className="p-2 rounded-tr-lg">Total</th>
              </tr>
            </thead>
            <tbody>
              {billData?.description?.length > 0 ? (
                billData?.description?.map((desc, index) => (
                  <tr key={index}>
                    <td className="p-2 text-[#4F4F4F] font-medium text-sm">
                      {desc}
                    </td>
                    <td className="p-2 text-[#4F4F4F] font-medium text-sm text-center">
                      ₹{billData.amount.toFixed(2)}
                    </td>
                    <td className="p-2 text-[#4F4F4F] font-medium text-sm text-center">
                      1
                    </td>
                    <td className="p-2 text-[#4F4F4F] font-medium text-sm text-center">
                      ₹{billData.amount.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="p-2 text-sm text-center text-gray-500"
                  >
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="text-lg font-bold text-right invoice__total">
            <table className="w-full max-w-xs ml-auto">
              <tbody>
                <tr>
                  <td className="text-sm font-semibold label">Amount:</td>
                  <td className="text-sm font-semibold text-right value">
                    ₹{billData.amount?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="text-sm font-semibold label">
                    Discount {billData?.discount}%:
                  </td>
                  <td className="text-sm font-semibold text-right value">
                    ₹{((billData.amount * billData.discount) / 100)?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="text-sm font-semibold label">Tax:</td>
                  <td className="text-sm font-semibold text-right value">
                    ₹{billData?.tax?.toFixed(2)}
                  </td>
                </tr>
                <tr className="text-blue-500">
                  <td className="text-sm font-semibold label">Total:</td>
                  <td className="text-sm font-semibold text-right value">
                    ₹{billData?.totalAmount?.toFixed(2)}
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
}

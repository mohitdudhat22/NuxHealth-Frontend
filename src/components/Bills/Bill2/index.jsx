import { FullLogo } from "@/assets/images";
import { NHCard } from "@/components";
import { useGetSingleBill } from "@/hook/Global";

export function Bill2() {
  const { data } = useGetSingleBill();
  const staticData = {
    doctorName: data?.doctorId?.fullName || "Dr. Bharat Patel",
    doctorDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis turpis vitae.",
    billNumber: data?.billNumber || "1234",
    date: data?.date || "2020-06-20",
    time: data?.time || "10:45 PM",
    patient: {
      fullName: data?.patientId?.fullName || "Ritesh Kumar",
      gender: data?.patientId?.gender || "Male",
      age: data?.patientId?.age || "28",
      address:
        data?.formattedAddress || "B-105 Vijay Banglow Parijatak Mithakhali",
      phone: data?.patientId?.phone || "#987 5647 23",
    },
    diseaseName: data?.appointmentId?.dieseas_name || "Stomach Ach",
    paymentType: data?.paymentType || "Insurance",
    amount: data?.totalAmount || 1000.0,
    discount: data?.discount || 5,
    tax: data?.discount || 120.0,
    totalAmount: data?.totalAmount || 24668.0,
  };

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
                {staticData.doctorName}
              </h3>
              <span className="text-base text-gray-500 text-[10px]">
                {staticData.doctorDescription}
              </span>
            </div>
            <div>
              <p className="flex">
                <strong>Bill No :</strong> <span>{staticData.billNumber}</span>
              </p>
              <p className="flex">
                <strong>Date :</strong>{" "}
                <span>{new Date(staticData.date).toLocaleDateString()}</span>
              </p>
              <p className="flex">
                <strong>Bill Time :</strong> <span>{staticData.time}</span>
              </p>
            </div>
          </div>

          <div className="flex justify-between p-4 bg-gray-100 rounded-lg invoice__patient">
            <div>
              <h3 className="text-base font-bold text-[#141414] text-lg">
                Billing To:
              </h3>
              <h3 className="text-base font-bold text-[#141414] text-lg">
                {staticData.patient.fullName}
              </h3>
              <span className="block mt-2 text-xs text-gray-500">
                {staticData.patient.address}
              </span>
              <span className="block text-xs text-gray-500">
                {staticData.patient.phone}
              </span>
            </div>
            <div>
              <p className="flex">
                <strong>Gender :</strong>{" "}
                <span>{staticData.patient.gender}</span>
              </p>
              <p className="flex">
                <strong>Age :</strong> <span>{staticData.patient.age}</span>
              </p>
            </div>
          </div>

          <table className="w-full my-3 border-collapse invoice__table">
            <thead>
              <tr className="bg-[#0eabeb] text-white text-lg">
                <th className="p-2 text-left rounded-l-lg">Item</th>
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

          <div className="text-lg font-bold text-right invoice__total">
            <table className="w-full max-w-md ml-auto">
              <tbody>
                <tr>
                  <td className="p-2 text-sm font-semibold text-gray-900 flex">
                    Sub Total :{" "}
                    <span className="ml-2 text-gray-500 flex">$2110.00</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-sm font-semibold text-gray-900 flex">
                    Discount 5% :{" "}
                    <span className="ml-2 text-gray-500">$255.00</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-sm font-semibold text-blue-500 flex">
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
}

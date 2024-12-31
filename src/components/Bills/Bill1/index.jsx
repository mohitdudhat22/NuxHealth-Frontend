import { FullLogo } from "@/assets/images";
import { NHCard } from "@/components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Mock function to fetch bill data based on bill ID
const fetchBillData = (billId) => {
  // Replace with actual API call or data fetching logic
  return {
    doctorName: "Dr. Bharat Patel",
    doctorDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis turpis vitae.",
    billNumber: billId,
    date: "2020-06-20",
    time: "10:45 PM",
    patient: {
      firstName: "Ritesh",
      lastName: "Kumar",
      gender: "Male",
      age: "28",
      address: "B-105 Vijay Banglow Parijatak Mithakhali",
      phone: "#987 5647 23"
    },
    diseaseName: "Stomach Ache",
    paymentType: "Insurance",
    description: "Neuromuscular blockers",
    amount: 1000.00,
    discount: 5,
    tax: 120.00,
    totalAmount: 24668.00
  };
};

export function Bill1() {
  const { billId } = useParams();
  const [billData, setBillData] = useState(null);

  useEffect(() => {
    const data = fetchBillData(billId);
    console.log("Bill Data >>>>>>>>>>>>>>>>>:---------------------------", data);
    setBillData(data); 
  }, [billId]);

  if (!billData) {
    return <div>Loading...</div>;
  }

  return (
    <NHCard>
      <div className="head flex justify-between pb-5">
        <img src={FullLogo} className="w-2/5 h-auto" alt="Logo" />
        <div className="text-3xl text-blue-400 font-light">Invoice</div>
      </div>
      <div className="wrapper px-5">
        <div className="billing-info flex justify-between mb-5 p-4">
          <div className="info w-3/5">
            <h3 className="text-lg font-bold text-gray-900">{billData.doctorName}</h3>
            <span className="text-base text-gray-500">{billData.doctorDescription}</span>
          </div>
          <div>
            <p>
              <strong>Bill No :</strong> <span>{billData.billNumber}</span>
            </p>
            <p>
              <strong>Date :</strong> <span>{new Date(billData.date).toLocaleDateString()}</span>
            </p>
            <p>
              <strong>Bill Time :</strong> <span>{billData.time}</span>
            </p>
          </div>
        </div>
        <div className="invoice__patient bg-gray-100 p-4 rounded-lg flex justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[#141414]">
              Name: <span className="text-sm text-[#818194] font-semibold ml-3">{billData.patient.firstName} {billData.patient.lastName}</span>
            </p>
            <p className="text-sm font-semibold text-[#141414]">
              Gender: <span className="text-sm text-[#818194] font-semibold ml-3">{billData.patient.gender}</span>
            </p>
            <p className="text-sm font-semibold text-[#141414]">
              Age: <span className="text-sm text-[#818194] font-semibold ml-3">{billData.patient.age} Years</span>
            </p>
            <p className="text-sm font-semibold text-[#141414]">
              Address: <span className="text-sm text-[#818194] font-semibold ml-3">{billData.patient.address}</span>
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[#141414]">
              Disease Name: <span className="text-sm text-[#818194] font-semibold ml-3">{billData.diseaseName}</span>
            </p>
            <p className="text-sm font-semibold text-[#141414]">
              Phone Number: <span className="text-sm text-[#818194] font-semibold ml-3">{billData.patient.phone}</span>
            </p>
            <p className="text-sm font-semibold text-[#141414]">
              Payment Type: <span className="text-sm text-[#818194] font-semibold ml-3">{billData.paymentType}</span>
            </p>
          </div>
        </div>
        <table className="invoice__table w-full my-3 border-collapse">
          <thead>
            <tr className="bg-[#0eabeb] text-white text-xs">
              <th className="p-2 rounded-tl-lg">Description</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Qty</th>
              <th className="p-2 rounded-tr-lg">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 text-[#4F4F4F] font-medium text-sm">{billData.description}</td>
              <td className="p-2 text-[#4F4F4F] font-medium text-sm text-center">₹{billData.amount.toFixed(2)}</td>
              <td className="p-2 text-[#4F4F4F] font-medium text-sm text-center">1</td>
              <td className="p-2 text-[#4F4F4F] font-medium text-sm text-center">₹{billData.amount.toFixed(2)}</td>
            </tr>
            {/* Repeat table rows for other items if necessary */}
          </tbody>
        </table>
        <div className="invoice__total text-right font-bold text-lg">
          <table className="w-full max-w-xs ml-auto">
            <tr>
              <td className="label text-sm font-semibold">Amount:</td>
              <td className="value text-right text-sm font-semibold">₹{billData.amount.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="label text-sm font-semibold">Discount {billData.discount}%:</td>
              <td className="value text-right text-sm font-semibold">₹{(billData.amount * billData.discount / 100).toFixed(2)}</td>
            </tr>
            <tr>
              <td className="label text-sm font-semibold">Tax:</td>
              <td className="value text-right text-sm font-semibold">₹{billData.tax.toFixed(2)}</td>
            </tr>
            <tr className="text-blue-500">
              <td className="label text-sm font-semibold">Total:</td>
              <td className="value text-right text-sm font-semibold">₹{billData.totalAmount.toFixed(2)}</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="footer bg-[#0eabeb] text-white text-center p-3 text-sm flex justify-between">
        <p>Call: +00854 22354</p>
        <p>Email: Hello@Gmail.com</p>
      </div>
    </NHCard>
  );
}

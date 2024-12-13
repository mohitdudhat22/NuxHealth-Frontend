export const PatientBillFields = [
  { label: "Insurance Company", name: "insuranceCompany", type: "text" },
  { label: "Insurance Plan", name: "insurancePlan", type: "text" },
  { label: "Claim Amount", name: "claimAmount", type: "text" },
  { label: "Claimed Amount", name: "claimedAmount", type: "text" },
];

export const formDataObject = {
  patientName: "",
  phoneNumber: "",
  gender: "",
  age: "",
  doctorName: "",
  diseaseName: "",
  description: "",
  paymentType: "",
  billDate: new Date().toISOString().slice(0, 10),
  billTime: "",
  billNumber: "",
  discount: "",
  tax: "",
  amount: "",
  totalAmount: "",
  address: "",
  insuranceCompany: "",
  insurancePlan: "",
  claimAmount: "",
  claimedAmount: "",
};

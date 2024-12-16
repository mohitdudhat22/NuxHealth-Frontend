import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useGlobal } from "../../hooks/useGlobal";
import { formDataObject, PatientBillFields } from "@/constants/data";
import InputField from "./InputField";
import { useDoctor } from "../../hooks/useDoctor";
import { usePatient } from "../../hooks/usePatient";

const CreateBill = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createBill } = useGlobal();
  const { getAllDoctors, allDoctors } = useDoctor();
  const { getAllPatients, allPatients, getPatientById } = usePatient();

  const [formData, setFormData] = useState({
    ...formDataObject,
    billDate: new Date().toISOString().split("T")[0],
    billTime: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    billNumber: 100,
    totalAmount: 0,
  });

  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingPatients, setLoadingPatients] = useState(true);

  // Function to calculate total amount
  const calculateTotalAmount = (amount, discount, tax) => {
    const amountNumber = parseFloat(amount) || 0;
    const discountNumber = parseFloat(discount) || 0;
    const taxNumber = parseFloat(tax) || 0;

    const discountedAmount =
      amountNumber - (amountNumber * discountNumber) / 100;
    const totalAmount = discountedAmount + (discountedAmount * taxNumber) / 100;
    return totalAmount.toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    // If patientId changes, fetch and populate patient details
    if (name === "patientId" && value) {
      fetchPatientDetails(value);
    }

    if (["amount", "discount", "tax"].includes(name)) {
      updatedFormData.totalAmount = calculateTotalAmount(
        updatedFormData.amount,
        updatedFormData.discount,
        updatedFormData.tax,
      );
    }

    setFormData(updatedFormData);
  };

  // Fetch patient details based on selected patient ID
  const fetchPatientDetails = async (patientId) => {
    try {
      const patientDetails = await getPatientById(patientId);
      setFormData((prev) => ({
        ...prev,
        phone: patientDetails.phone || "",
        age: patientDetails.age || "",
        gender: patientDetails.gender || "",
        address: patientDetails.address || "",
        patientName: `${patientDetails.firstName} ${patientDetails.lastName}`,
      }));
    } catch (error) {
      console.error("Error fetching patient details:", error);
      toast.error("Error fetching patient details.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBill(formData);
      setFormData((prev) => ({
        ...prev,
        billNumber: prev.billNumber + 1,
        totalAmount: 0,
      }));
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form.");
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoadingDoctors(true);
      await getAllDoctors();
      setLoadingDoctors(false);
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoadingPatients(true);
      await getAllPatients();
      setLoadingPatients(false);
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormData((prev) => ({
        ...prev,
        billTime: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Hospital bill fields
  const HospitalBillFields = [
    {
      label: "Patient Name ",
      name: "patientId",
      type: "select",
      options: loadingPatients
        ? [{ label: "Loading...", value: "" }]
        : [
            { label: "Select Patient Name", value: "" },
            ...(Array.isArray(allPatients) && allPatients.length > 0
              ? allPatients.map((patient) => ({
                  label: `${patient.firstName} ${patient.lastName}`,
                  value: patient._id,
                }))
              : []),
          ],
    },
    { label: "Phone Number", name: "phone", type: "text", readOnly: true },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: [
        { label: "Select Gender", value: "" },
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
      value: formData.gender,
    },
    { label: "Age", name: "age", type: "text", readOnly: true },
    {
      label: "Doctor Name",
      name: "doctorId",
      type: "select",
      options: loadingDoctors
        ? [{ label: "Loading...", value: "" }]
        : [
            { label: "Select Doctor Name", value: "" },
            ...(Array.isArray(allDoctors) && allDoctors.length > 0
              ? allDoctors.map((doctor) => ({
                  label: doctor.name,
                  value: doctor._id,
                }))
              : []),
          ],
    },
    { label: "Disease Name", name: "diseaseName", type: "text" },
    { label: "Description", name: "description", type: "text" },
    {
      label: "Payment Type",
      name: "paymentType",
      type: "select",
      options: [
        { label: "Select Payment Type", value: "" },
        { label: "Cash", value: "Cash" },
        { label: "Insurance", value: "Insurance" },
        { label: "Credit Card", value: "Credit Card" },
      ],
    },
    {
      label: "Bill Date",
      name: "billDate",
      type: "date",
      value: formData.billDate,
      readOnly: true,
    },
    {
      label: "Bill Time",
      name: "billTime",
      type: "text",
      value: formData.billTime,
      readOnly: true,
    },
    {
      label: "Bill Number",
      name: "billNumber",
      type: "text",
      value: formData.billNumber,
      readOnly: true,
    },
    { label: "Discount (%)", name: "discount", type: "text" },
    { label: "Tax", name: "tax", type: "text" },
    { label: "Amount", name: "amount", type: "text" },
    {
      label: "Total Amount",
      name: "totalAmount",
      type: "text",
      value: formData.totalAmount,
      readOnly: true,
    },
    { label: "Address", name: "address", type: "text" },
  ];

  return (
    <div className="bg-[#F6F8FB]">
      <div className="p-5 p-[20px] ">
        <div className="flex justify-center">
          <div className="p-4 bg-white rounded-xl">
            <div className="mb-4">
              <p className="text-[#030229] text-[26px] font-bold">
                Create Bill
              </p>
            </div>

            <div className="mb-4 p-5 border-2 border-[#F4F4F4] rounded-xl">
              <div className="space-y-4">
                <div className="flex">
                  <div className="w-full">
                    <form
                      id="create-bill-form"
                      onsubmit="handleSubmit"
                      className="flex flex-wrap justify-between"
                    >
                      {HospitalBillFields.map((field, index) => (
                        <InputField
                          key={index}
                          {...field}
                          value={formData[field.name]}
                          onChange={handleChange}
                        />
                      ))}
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {formData.paymentType === "Insurance" && (
              <div className="mb-4 p-5 border-2 border-[#F4F4F4] rounded-xl">
                <div className="space-y-4">
                  <p className="text-[#030229] text-[26px] font-bold">
                    Insurance Details
                  </p>
                  <div className="flex">
                    <div className="w-full">
                      <form className="flex flex-wrap justify-between gap-4">
                        {PatientBillFields.map((field, index) => (
                          <InputField
                            key={index}
                            {...field}
                            value={formData[field.name]}
                            onChange={handleChange}
                          />
                        ))}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                form="create-bill-form"
                className="bg-[#F6F8FB] text-[#4F4F4F] text-lg font-semibold py-3 px-8 rounded-lg hover:bg-[#0EABEB] hover:text-white"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBill;

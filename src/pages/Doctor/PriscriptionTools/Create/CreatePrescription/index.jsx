import React, { useState, useEffect } from "react";
import {
  NHInput,
  NHTable,
  NHButton,
  NHSelect,
  NHCard,
  PrescriptionCard,
} from "@/components";
import Icons from "@/constants/icons";
import { createPrescription } from "@/axiosApi/ApiHelper";

export const CreatePrescription = ({
  appointment = {},
  appointmentTime,
  appointmentType,
  status,
}) => {
  // Destructure with defaults to handle missing appointment data
  const { patientId } = appointment;

  // State to manage table data and additional note
  const [tableData, setTableData] = useState([
    {
      key: "1",
      medicine: "",
      strength: "",
      dose: "",
      duration: "",
      whenToTake: "",
    },
  ]);
  const [additionalNote, setAdditionalNote] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Function to handle changes in the Medicine field
  const handleMedicineChange = (index, value) => {
    const newData = [...tableData];
    newData[index].medicine = value;

    // If Medicine field is not empty, add a new row
    if (index === tableData.length - 1 && value.trim() !== "") {
      newData.push({
        key: `${tableData.length + 1}`,
        medicine: "",
        strength: "",
        dose: "",
        duration: "",
        whenToTake: "",
      });
    }

    setTableData(newData);
  };

  // Function to handle changes in other fields
  const handleFieldChange = (index, field, value) => {
    const newData = [...tableData];
    newData[index][field] = value;
    setTableData(newData);
  };

  // Function to delete a row from the table
  const handleDelete = (index) => {
    setTableData((prevData) => prevData.filter((_, i) => i !== index));
  };

  // Function to handle sending the prescription
  const handleSendPrescription = () => {
    console.log("Send Prescription button clicked!");
    setIsSending(true);
  };

  // useEffect to handle the API call when isSending is true
  useEffect(() => {
    if (isSending) {
      console.log("Preparing payload...");

      const payload = {
        patientId: patientId._id,
        appointmentId: appointment._id,
        medications: tableData.map((row) => ({
          medicineName: row.medicine,
          strength: row.strength,
          dose: row.dose,
          duration: row.duration,
          whenToTake: row.whenToTake,
        })),
        additionalNote: additionalNote,
      };

      console.log("Payload:", payload);

      createPrescription(payload)
        .then((response) => {
          console.log("Prescription sent successfully!", response);
          setIsSending(false);

          window.location.reload();
        })
        .catch((error) => {
          console.error("Failed to send prescription:", error);
          setIsSending(false);
        });
    }
  }, [isSending, tableData, additionalNote, patientId, appointment]);

  // Table columns with delete functionality
  const columns = [
    {
      title: "Medicine Name",
      dataIndex: "medicine",
      key: "medicine",
      render: (_, record, index) => (
        <NHInput
          placeholder="Medicine"
          value={record.medicine}
          onChange={(e) => handleMedicineChange(index, e.target.value)}
        />
      ),
    },
    {
      title: "Strength",
      dataIndex: "strength",
      key: "strength",
      render: (_, record, index) => (
        <NHInput
          placeholder="100"
          value={record.strength}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");
            handleFieldChange(index, "strength", value);
          }}
        />
      ),
    },
    {
      title: "Dose",
      dataIndex: "dose",
      key: "dose",
      render: (_, record, index) => (
        <NHInput
          placeholder="1-0-1"
          value={record.dose}
          onChange={(e) => {
            let value = e.target.value.replace(/[^0-9]/g, "");
            let formattedValue = "";

            // Insert dashes after every single digit (for 1-1-1 format)
            for (let i = 0; i < value.length; i++) {
              if (i > 0 && i % 1 === 0 && i < 3) {
                formattedValue += "-";
              }
              formattedValue += value[i];
            }

            if (formattedValue.length > 5) {
              formattedValue = formattedValue.slice(0, 5);
            }

            handleFieldChange(index, "dose", formattedValue);
          }}
        />
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (_, record, index) => (
        <NHInput
          placeholder="2"
          value={record.duration}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");
            handleFieldChange(index, "duration", value);
          }}
        />
      ),
    },
    {
      title: "When to take",
      dataIndex: "whenToTake",
      key: "whenToTake",
      render: (_, record, index) => (
        <NHSelect
          options={[
            { value: "Before Food", label: "Before Food" },
            { value: "With Food", label: "With Food" },
            { value: "After Food", label: "After Food" },
          ]}
          value={record.whenToTake}
          onChange={(value) => handleFieldChange(index, "whenToTake", value)}
        />
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record, index) => (
        <NHButton isDelete onClick={() => handleDelete(index)} />
      ),
    },
  ];

  return (
    <div className="flex gap-4 p-4 md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-[58%]">
        <NHCard className="w-full">
          <h2 className="mb-4 text-lg font-semibold">Create Prescription</h2>
          <div className="flex gap-4 mb-6">
            <div className="w-3/5">
              <label className="block text-sm font-medium text-gray-600">
                Patient Name
              </label>
              <NHInput disabled value={patientId.fullName} />
            </div>
            <div className="w-1/5">
              <label className="block text-sm font-medium text-gray-600">
                Age
              </label>
              <NHInput disabled value={patientId.age} />
            </div>
            <div className="w-1/5">
              <label className="block text-sm font-medium text-gray-600">
                Gender
              </label>
              <NHInput disabled value={patientId.gender} />
            </div>
          </div>

          <h3 className="mb-4 text-lg font-semibold">Drug Prescription</h3>
          <NHTable
            columns={columns}
            dataSource={tableData}
            pagination={false}
            scroll={{x: 800}}
          />

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-600">
              Additional Note
            </label>
            <textarea
              className="w-full p-2 mt-1 border border-[rgb(211,211,211)] rounded-md"
              rows="3"
              placeholder="Additional notes"
              value={additionalNote}
              onChange={(e) => setAdditionalNote(e.target.value)}
            />
          </div>
        </NHCard>
      </div>

      {/* Right Section */}
      <div className="w-[42%]">
        <PrescriptionCard
          hospitalName="Global Medical Center"
          doctorName="Dr. Alice Monroe"
          doctorspecialty="Pediatrics"
          prescriptionDate="5 Jan, 2024"
          patientName={patientId.fullName}
          age={patientId.age}
          gender={patientId.gender}
          address="123 Elm Street, Springfield"
          additionalNote={additionalNote}
          patientData={{
            medications: tableData.map((row) => ({
              medicineName: row.medicine,
              strength: row.strength ? `${row.strength} mg` : "",
              dose: row.dose,
              duration: row.duration ? `${row.duration} days` : "",
              whenToTake: row.whenToTake,
            })),
          }}
          handlePrescription={handleSendPrescription}
          Title="Prescription Preview"
          isSendButton={true}
        />
      </div>
    </div>
  );
};

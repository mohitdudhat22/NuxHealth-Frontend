import {
  NHButton,
  NHCard,
  NHInput,
  NHTable,
  PatientDetailCard,
  PrescriptionCard,
} from "@/components";
import Icons from "@/constants/icons";
import { usePatientDashboardData } from "@/hook/Patients";
import React, { useState } from "react";
import { Prescriptions } from "./Prescriptions";
import { MedicalHistory } from "./MedicalHistory";
import { TestReports } from "./TestReports";
import { useNavigate } from "react-router-dom";

export const PersonalHealthRecord = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const { data, loading, error } = usePatientDashboardData();
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const medicalHistoryData = [
    {
      title: "Dulce Schleifer",
      subtitle: "Patient Issue",
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      date: "2 Jan, 2022",
    },
    {
      title: "Dulce Workman",
      subtitle: "Patient Issue",
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      date: "2 Jan, 2022",
    },
    {
      title: "Miracle Septimus",
      subtitle: "Patient Issue",
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      date: "2 Jan, 2022",
    },
  ];

  const columns = [
    {
      title: "Hospital Name",
      dataIndex: "hospitalName",
      key: "hospitalName",
    },
    {
      title: "Date",
      dataIndex: "prescriptionDate",
      key: "date",
    },
    {
      title: "Disease Name",
      dataIndex: "DiseaseName",
      key: "diseaseName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <NHButton isView onClick={() => handleViewClick(record)} />
      ),
    },
  ];

  const SectionHeader = ({ title, actionText, onActionClick }) => {
    return (
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {actionText && (
          <button
            onClick={onActionClick}
            className="text-sm text-red-600 hover:underline"
          >
            {actionText}
          </button>
        )}
      </div>
    );
  };
  const prescriptions = data?.prescriptions;
  const handleViewClick = (record) => {
    setSelectedPrescription(record);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPrescription(null);
  };
  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <>
            <PatientDetailCard
              patientName={data?.patientProfile?.fullName || "N/A"}
              doctorName="Dr. Marcus Philips"
              patientNumber={data?.patientProfile?.phone || "N/A"}
              patientIssue="Feeling tired"
              patientGender={data?.patientProfile?.gender || "N/A"}
              patientAge={`${data?.patientProfile?.age || 0} Years`}
              appointmentType="Online"
              patientAddress={`${
                data?.patientProfile?.address?.fullAddress || "N/A"
              }, ${data?.patientProfile?.address?.city || ""}`}
              lastAppointmentDate="2 Jan, 2022"
              lastAppointmentTime="4:30 PM"
              onEditProfile={() => {}}
            />

            <div className="grid grid-cols-[3fr_2fr] mt-8 grid-rows-1 gap-8">
              {/* Medical History Section */}

              <NHCard
                title={"Medical History"}
                className={"max-h-[200px] overflow-auto"}
                headerContent={
                  <button
                    className="text-blue-500 text-sm"
                    onClick={() => setCurrentView("medical-history")}
                  >
                    View All
                  </button>
                }
              >
                <div className="space-y-1 grid grid-cols-1 md:grid-cols-3">
                  {medicalHistoryData.map((medicalData, index) => {
                    return (
                      <NHCard className={"border border-[#F4F4F4] rounded-xl "}>
                        <div className="flex justify-between bg-[#F6F8FB] rounded-lg p-3">
                          <h3 className="text-gray-900 font-medium text-sm ">
                            {medicalData.title}
                          </h3>
                          <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                            {medicalData.date}
                          </span>
                        </div>

                        <div className="p-3">
                          <div className="mt-2">
                            <p className="text-[#4F4F4F] font-semibold">
                              {medicalData.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="p-3">
                          <div className="mt-2">
                            <p className="text-[#818194] text-sm">
                              {medicalData.description}
                            </p>
                          </div>
                        </div>
                      </NHCard>
                    );
                  })}
                </div>
              </NHCard>

              {/* Prescriptions Section */}
              <section>
                <NHCard
                  title={
                    <span className="text-[#030229] text-[26px] font-semibold">
                      Prescriptions
                    </span>
                  }
                  headerContent={
                    <button
                      className="text-[#5678E9] text-xl"
                      onClick={() => setCurrentView("prescriptions")}
                    >
                      View All Prescription
                    </button>
                  }
                >
                  <NHTable
                    loading={loading}
                    showPagination={true}
                    tableColumn={columns}
                    tableDataSource={prescriptions}
                  />
                </NHCard>
              </section>

              {/* Test Reports Section */}
              {/* <section>
                                <SectionHeader
                                    title="Test Reports"
                                    actionText="View All Reports"
                                    onActionClick={() => setCurrentView("test-reports")}
                                />
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <NHCard
                                        title="Dr. Marcus Philips"
                                        subtitle="Disease: Viral Infection"
                                        description="Pathology Test"
                                        date="2 Jan, 2022"
                                    />
                                    <NHCard
                                        title="Dr. Ryan Carder"
                                        subtitle="Disease: Allergies"
                                        description="Pathology Test"
                                        date="2 Jan, 2022"
                                    />
                                </div>
                            </section> */}
            </div>
          </>
        );
      case "medical-history":
        return <MedicalHistory />;
      case "prescriptions":
        return <Prescriptions />;
      // case "test-reports":
      //   return <TestReports />;
      default:
        return null;
    }
  };

  return (
    <div>
      {renderView()}

      {selectedPrescription && (
        <PrescriptionCard
          open={isModalOpen}
          isModalOpen={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          handleClose={() => setIsModalOpen(false)}
          Title="Prescription"
          handleOk={() => setIsModalOpen(false)}
          patientData={selectedPrescription}
        />
      )}
    </div>
  );
};

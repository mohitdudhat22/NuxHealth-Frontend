import { login } from "@/axiosApi/ApiHelper";
import { AppointmentCard, NHButton, NHCard, NHInput } from "@/components";
import Icons from "@/constants/Icons";

export const MedicalHistory = () => {
  const MedicaltData = [
    {
      patientName: "Dulce Schleifer",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Alfredo Carder",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Justin Rhiel Madsen",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Wilson Workman",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Lydia Dokidis",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Dulce Aminoff",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Chance Westervelt",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Giana Calzoni",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Ryan Aminoff",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Dulce Press",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Lydia Torff",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Cristofer Passaquindici Arcand",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
  ];

  return (
    <>
      <NHCard
        title={
          <span className="text-[#030229] text-[26px] font-semibold">
            Medical History
          </span>
        }
      >
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {MedicaltData.map((medical, index) => (
            <AppointmentCard
              key={index}
              headerContent={
                <>
                  <NHButton isView onClick={() => handlePatientDetails()} />
                </>
              }
              headerBg={true}
              title={
                <span className="text-[#030229] font-semibold text-[18px]">
                  {medical.patientName}
                </span>
              }
              date={medical.date}
              patientIssue={medical.patientIssue}
              className="border border-slate-200"
            />
          ))}
        </div>
      </NHCard>
    </>
  );
};

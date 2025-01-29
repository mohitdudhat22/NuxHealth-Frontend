import { AppointmentCard, NHButton, NHCard, NHInput } from "@/components";
import Icons from "@/constants/Icons";
import { Tag } from "antd";

export const TestReports = () => {
  const TestReportsData = [
    {
      doctorName: "Dr. Ryan Vetrovs",
      diseaseName: "Shamuba Hospital",
      testReportName: "Blood Test",
      date: "2022-01-02",
    },
    {
      doctorName: "Dr. Angel Franci",
      diseaseName: "Shamuba Hospital",
      testReportName: "Blood Test",
      date: "2022-01-02",
    },
    {
      doctorName: "Dr. James Kenter",
      diseaseName: "Shamuba Hospital",
      testReportName: "Blood Test",
      date: "2022-01-02",
    },
    {
      doctorName: "Dr. Rhiel Madsen",
      diseaseName: "Shamuba Hospital",
      testReportName: "Blood Test",
      date: "2022-01-02",
    },
    {
      doctorName: "Dr. Jakob Workman",
      diseaseName: "Shamuba Hospital",
      testReportName: "Blood Test",
      date: "2022-01-02",
    },
    {
      doctorName: "Dr. Nolan Culhane",
      diseaseName: "Shamuba Hospital",
      testReportName: "Blood Test",
      date: "2022-01-02",
    },
    {
      doctorName: "Dr. Brandon George",
      diseaseName: "Shamuba Hospital",
      testReportName: "Blood Test",
      date: "2022-01-02",
    },
    {
      doctorName: "Dr. Omar Bothman",
      diseaseName: "Shamuba Hospital",
      testReportName: "Blood Test",
      date: "2022-01-02",
    },
    {
      doctorName: "Dr. Omar Dorwart",
      diseaseName: "Shamuba Hospital",
      testReportName: "Blood Test",
      date: "2022-01-02",
    },
    {
      doctorName: "Dr. Martin Saris",
      diseaseName: "Shamuba Hospital",
      testReportName: "Blood Test",
      date: "2022-01-02",
    },
    {
      doctorName: "Dr. Alfonso Stanton",
      diseaseName: "Shamuba Hospital",
      testReportName: "Blood Test",
      date: "2022-01-02",
    },
    {
      doctorName: "Dr. Brandon Press",
      diseaseName: "Shamuba Hospital",
      testReportName: "Blood Test",
      date: "2022-01-02",
    },
  ];

  return (
    <>
      <NHCard
        title={
          <span className="text-[#030229] text-[26px] font-semibold">
            Test Reports
          </span>
        }
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TestReportsData.map((TestReports, index) => (
            <AppointmentCard
              key={index}
              headerContent={
                <>
                  <span
                    onClick={() => handlePatientDetails()}
                    className="cursor-pointer"
                  >
                    {Icons.ViewBillIcon}
                  </span>
                </>
              }
              headerBg={true}
              title={
                <span className="font-semibold text-[18px]">
                  {TestReports.doctorName}
                </span>
              }
              diseaseName={TestReports.diseaseName}
              testReportName={TestReports.testReportName}
              reportDate={TestReports.date}
              className="border border-slate-200"
            />
          ))}
        </div>
      </NHCard>
    </>
  );
};

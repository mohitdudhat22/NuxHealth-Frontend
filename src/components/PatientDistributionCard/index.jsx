import React from "react";
import { NHCard } from "..";
import ReactApexChart from "react-apexcharts";

export const PatientDistributionCard = ({ data }) => {
  const chartOptions = {
    chart: {
      type: "donut",
      height: 350,
      offsetY: 0,
      padding: {
        top: 20,
        bottom: 20,
      },
    },
    colors: ["#F6AD37", "#4ADE80"],
    labels: ["New Patients", "Old Patients"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Patients",
              color: "#1D4ED8",
              fontSize: "14px",
              fontWeight: 600,
            },
          },
        },
      },
    },
  };
  const series = [data?.totalNewPatients, data?.totalOldPatients]; // New patients, Old patients
  return (
    <NHCard title={"Patients Summary"}>
      <div className="flex h-auto items-center justify-between bg-[#F6F8FB] rounded-xl py-6">
        <div className="w-auto md:w-[50%]">
          <ReactApexChart
            options={chartOptions}
            series={series}
            type="donut"
            height="100%"
          />
        </div>

        <div className="space-y-2 w-1/2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#F6AD37] rounded-full  mr-2"></span>
            <span className="text-xl">
              New Patients: {data?.totalNewPatients}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#4ADE80] rounded-full mr-2"></span>
            <span className="text-xl">
              Old Patients: {data?.totalOldPatients}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            <span className="text-xl">
              Total Patients: {data?.totalPatients}
            </span>
          </div>
        </div>
      </div>
    </NHCard>
  );
};

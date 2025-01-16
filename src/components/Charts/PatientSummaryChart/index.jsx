import { useState } from "react";
import { Button } from "antd/lib";
import ReactApexChart from "react-apexcharts";
import { NHCard } from "@/components";

export function PatientSummaryChart({
  data = {},
  title = "Patients Summary",
  height = 350,
}) {
  const [viewMode, setViewMode] = useState("week");
  const [activeSeries, setActiveSeries] = useState([
    "New Patient",
    "Old Patient",
  ]);

  const getChartData = () => {
    const weekData = {
      categories: data.week?.categories || [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ],
      series: [
        {
          name: "New Patient",
          data: data.week?.data?.newPatients || [0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: "Old Patient",
          data: data.week?.data?.oldPatients || [0, 0, 0, 0, 0, 0, 0],
        },
      ],
    };

    const dayData = {
      categories: data.day?.categories || [
        "8AM",
        "10AM",
        "12PM",
        "2PM",
        "4PM",
        "6PM",
        "8PM",
      ],
      series: [
        {
          name: "New Patient",
          data: data.day?.data?.newPatients || [0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: "Old Patient",
          data: data.day?.data?.oldPatients || [0, 0, 0, 0, 0, 0, 0],
        },
      ],
    };

    return viewMode === "week" ? weekData : dayData;
  };

  const chartData = getChartData();

  const filteredSeries = chartData.series.filter((s) =>
    activeSeries.includes(s.name)
  );

  const chartOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#FF9F43", "#4F46E5"],
    stroke: {
      width: 3,
      curve: "smooth",
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    markers: {
      size: 4,
      colors: ["#FF9F43", "#4F46E5"],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
      min: 0,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (val) => `${val} Patients`,
      },
    },
  };

  const toggleSeries = (seriesName) => {
    setActiveSeries((prev) =>
      prev.includes(seriesName)
        ? prev.filter((name) => name !== seriesName)
        : [...prev, seriesName]
    );
  };

  return (
    <NHCard
      title={title}
      headerContent={
        <div className="flex gap-2">
          <Button
            onClick={() => setViewMode("week")}
            type={viewMode === "week" ? "primary" : "default"}
          >
            Week
          </Button>
          <Button
            onClick={() => setViewMode("day")}
            type={viewMode === "day" ? "primary" : "default"}
          >
            Day
          </Button>
        </div>
      }
    >
      <ReactApexChart
        options={chartOptions}
        series={filteredSeries}
        type="line"
        height={height}
      />
      <div className="mt-6 flex items-center gap-8">
        <button
          onClick={() => toggleSeries("New Patient")}
          className={`flex items-center gap-2 transition-opacity ${
            !activeSeries.includes("New Patient") ? "opacity-50" : ""
          }`}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[#FF9F43]"></span>
          <span className="text-sm text-gray-600">New Patient</span>
        </button>
        <button
          onClick={() => toggleSeries("Old Patient")}
          className={`flex items-center gap-2 transition-opacity ${
            !activeSeries.includes("Old Patient") ? "opacity-50" : ""
          }`}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[#4F46E5]"></span>
          <span className="text-sm text-gray-600">Old Patient</span>
        </button>
      </div>
    </NHCard>
  );
}

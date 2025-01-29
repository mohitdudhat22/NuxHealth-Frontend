import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { NHCard } from '@/components'
import { Spin } from 'antd';

export const PatientAgeDistribution = ({
  title = "Patients Age",
  data,
  height = 350,
}) => {
  if (!data) {
    return (
      <NHCard title={title}>
        <div className="flex items-center justify-center h-[350px]">
          <Spin size="large" />
        </div>
      </NHCard>
    );
  }
  const chartData = data;

  const chartOptions = {
    chart: {
      type: "donut",
    },
    colors: chartData?.map(item => item.color),
    labels: chartData?.map(item => item.age),
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            name: {
              show: false,
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 600,
              color: "#3F51B5",
              offsetY: 8,
              formatter: () => "100",
            },
            total: {
              show: true,
              label: "Total Patients",
              fontSize: "12px",
              color: "#6B7280",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "right",
      fontSize: "14px",
      fontFamily: "inherit",
      markers: {
        width: 8,
        height: 8,
        radius: 12,
      },
      formatter: function (seriesName, opts) {
        return [
          seriesName,
          `<span style="margin-left: 10px; color: ${
            chartData[opts.seriesIndex].color
          }; font-weight: bold">
            ${chartData[opts.seriesIndex].value}%
          </span>`,
        ];
      },
      itemMargin: {
        vertical: 8,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "center",
          },
        },
      },
    ],
  };

  const series = chartData?.map(item => item.value)

  return (
    <NHCard title={title}>
      <div className="relative">
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="donut"
          height={height}
        />
      </div>
    </NHCard>
  );
};

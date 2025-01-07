import { useState } from 'react';
import { Button } from 'antd/lib';
import ReactApexChart from 'react-apexcharts';
import { NHButton, NHCard } from '@/components';

export function AppointmentChart({
  data,
  title = 'Appointment',
  height = 350
}) {
  const [viewMode, setViewMode] = useState('year');

  // Transform data based on viewMode
  const getChartData = () => {
    if (viewMode === 'month') {
      const monthCategories = Object.keys(data.monthWiseData);
      const onlineConsultation = monthCategories.map(
        (key) => data.monthWiseData[key].onlineConsultation || 0
      );
      const otherAppointment = monthCategories.map(
        (key) => data.monthWiseData[key].otherAppointment || 0
      );

      return {
        categories: monthCategories,
        series: [
          {
            name: 'Online Consultation',
            data: onlineConsultation,
          },
          {
            name: 'Other Appointment',
            data: otherAppointment,
          },
        ],
      };
    }

    // Yearly data
    return {
      categories: data?.yearWiseData?.map((item) => item.year.toString()),
      series: [
        {
          name: 'Online Consultation',
          data: data?.yearWiseData?.map((item) => item.onlineConsultation || 0),
        },
        {
          name: 'Other Appointment',
          data: data?.yearWiseData?.map((item) => item.otherAppointment || 0),
        },
      ],
    };
  };

  const chartData = getChartData();

  const chartOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ['#0095FF', '#00D1FF'],
    grid: {
      borderColor: '#f1f1f1',
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px',
        },
      },
      min: 0,
      max: viewMode === 'month' ? 150 : 60,
      tickAmount: 6,
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (val) => `${val}`,
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'left',
      markers: {
        radius: 12,
      },
    },
  };

  return (
    <NHCard
      title={title}
      headerContent={
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'year' ? 'default' : 'outline'}
            onClick={() => setViewMode('year')}
            className="px-6"
          >
            Year
          </Button>
          <Button
            variant={viewMode === 'month' ? 'default' : 'outline'}
            onClick={() => setViewMode('month')}
            className="px-6"
          >
            Month
          </Button>
        </div>
      }
    >
      <ReactApexChart
        options={chartOptions}
        series={chartData.series}
        type="bar"
        height={height}
      />
    </NHCard>
  );
}
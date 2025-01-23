import { useState } from 'react';
import { Button } from 'antd/lib';
import ReactApexChart from 'react-apexcharts';
import { NHCard } from '@/components';
import { Spin } from 'antd';

export function AppointmentChart({
  data,
  title = 'Appointment',
  height = 350
}) {
  const [viewMode, setViewMode] = useState('year');

  if (!data) {
    return (
      <NHCard title={title}>
        <div className="flex items-center justify-center h-[350px]">
          <Spin size="large" />
        </div>
      </NHCard>
    );
  }

  const getChartData = () => {
    if (!data) return { categories: [], series: [] };

    if (viewMode === 'month') {
      const monthWiseData = data?.monthWiseData || {};
      const monthCategories = Object.keys(monthWiseData);
      
      // Only proceed if we have data
      if (monthCategories.length === 0) {
        return { categories: [], series: [] };
      }

      const onlineConsultation = monthCategories.map(
        (key) => monthWiseData[key]?.onlineConsultation || 0
      );
      const otherAppointment = monthCategories.map(
        (key) => monthWiseData[key]?.otherAppointment || 0
      );

      const formattedCategories = monthCategories.map(key => {
        const [year, month] = key.split('-');
        const date = new Date(year, parseInt(month) - 1);
        return date.toLocaleString('default', { month: 'short', year: 'numeric' });
      });

      return {
        categories: formattedCategories,
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
    const yearWiseData = data?.yearWiseData || [];
    return {
      categories: yearWiseData.map((item) => item.year.toString()),
      series: [
        {
          name: 'Online Consultation',
          data: yearWiseData.map((item) => item.onlineConsultation || 0),
        },
        {
          name: 'Other Appointment',
          data: yearWiseData.map((item) => item.otherAppointment || 0),
        },
      ],
    };
  };

  const chartData = getChartData();

  // Don't render chart if no data
  if (chartData.categories.length === 0) {
    return (
      <NHCard 
        title={title}
        headerContent={
          <div className="flex gap-2">
            <Button
              type={viewMode === 'year' ? 'primary' : 'default'}
              onClick={() => setViewMode('year')}
              className="px-6"
            >
              Year
            </Button>
            <Button
              type={viewMode === 'month' ? 'primary' : 'default'}
              onClick={() => setViewMode('month')}
              className="px-6"
            >
              Month
            </Button>
          </div>
        }
      >
        <div className="flex items-center justify-center h-[350px]">
          <div>No data available</div>
        </div>
      </NHCard>
    );
  }

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
            type={viewMode === 'year' ? 'primary' : 'default'}
            onClick={() => setViewMode('year')}
            className="px-6"
          >
            Year
          </Button>
          <Button
            type={viewMode === 'month' ? 'primary' : 'default'}
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
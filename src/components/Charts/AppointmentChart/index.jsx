import { useState } from 'react'
import { Button } from 'antd/lib'
import ReactApexChart from 'react-apexcharts'
import { NHButton, NHCard } from '@/components'

export function AppointmentChart({ 
  data, 
  title = 'Appointment',
  height = 350 
}) {
  const [viewMode, setViewMode] = useState('year')

  // Transform data based on viewMode
  const getChartData = () => {
    if (viewMode === 'month') {
      // Sample monthly data - replace with your actual monthly data
      return {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          {
            name: 'Online Consultation',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 80, 65, 45]
          },
          {
            name: 'Other Appointment',
            data: [20, 35, 40, 45, 55, 45, 65, 85, 95, 75, 55, 40]
          }
        ]
      }
    }

    // Yearly data from props
    return {
      categories: data.map(item => item.year.toString()),
      series: [
        {
          name: 'Online Consultation',
          data: data.map(item => item.onlineConsultation)
        },
        {
          name: 'Other Appointment',
          data: data.map(item => item.otherAppointment)
        }
      ]
    }
  }

  const chartData = getChartData()

  const chartOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#0095FF', '#00D1FF'],
    grid: {
      borderColor: '#f1f1f1',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 2
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        }
      },
      min: 0,
      max: viewMode === 'month' ? 150 : 60,
      tickAmount: 6
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (val) => `${val}`
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'left',
      markers: {
        radius: 12
      }
    }
  }

  return (
    <NHCard title={title} headerContent={<div className="flex gap-2">  <Button
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
      </div>}>
      <ReactApexChart
        options={chartOptions}
        series={chartData.series}
        type="bar"
        height={height}
      />
    </NHCard>
  )
}


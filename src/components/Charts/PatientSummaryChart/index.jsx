import { useState } from 'react'
import { Button } from 'antd/lib'
import ReactApexChart from 'react-apexcharts'
import { NHCard } from '@/components'

export function PatientSummaryChart({ 
  data,
  title = 'Patients Summary',
  height = 350 
}) {
  const [viewMode, setViewMode] = useState('week')
  const [activeSeries, setActiveSeries] = useState(['New Patient', 'Old Patient'])

  const getChartData = () => {
    const weekData = {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: [
        {
          name: 'New Patient',
          data: [20, 25, 35, 25, 20, 30, 20]
        },
        {
          name: 'Old Patient',
          data: [15, 20, 25, 20, 35, 25, 35]
        }
      ]
    }

    const dayData = {
      categories: ['8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM'],
      series: [
        {
          name: 'New Patient',
          data: [15, 30, 25, 35, 20, 25, 20]
        },
        {
          name: 'Old Patient',
          data: [20, 25, 30, 25, 35, 20, 30]
        }
      ]
    }

    return viewMode === 'week' ? weekData : dayData
  }

  const chartData = getChartData()

  const filteredSeries = chartData.series.filter(s => activeSeries.includes(s.name))

  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#FF9F43', '#4F46E5'],
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    grid: {
      borderColor: '#f1f1f1',
      row: {
        colors: ['transparent'],
        opacity: 0.5
      },
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    markers: {
      size: 4,
      colors: ['#FF9F43', '#4F46E5'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7,
      }
    },
    annotations: {
      points: [{
        x: 'Tue',
        y: 25,
        marker: {
          size: 6,
          fillColor: '#FF9F43',
          strokeColor: '#fff',
          strokeWidth: 2,
          radius: 2,
        },
        label: {
          text: '84%',
          borderColor: '#FF9F43',
          style: {
            background: '#fff',
            color: '#FF9F43',
            fontSize: '12px',
            fontWeight: 600,
            padding: {
              left: 10,
              right: 10,
              top: 5,
              bottom: 5
            }
          }
        }
      }]
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
      max: 60,
      tickAmount: 6
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (val) => `${val} Patients`
      }
    },
    legend: {
      show: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    }
  }

  const toggleSeries = (seriesName) => {
    setActiveSeries(prev => 
      prev.includes(seriesName) 
        ? prev.filter(name => name !== seriesName)
        : [...prev, seriesName]
    )
  }

  return (
    <NHCard 
      title={title} 
      headerContent={
        <div className="flex gap-2">
          <Button
            onClick={() => setViewMode('week')}
            variant={viewMode === 'week' ? 'default' : 'outline'}
          >
            Week
          </Button>
          <Button
            onClick={() => setViewMode('day')}
            variant={viewMode === 'day' ? 'default' : 'outline'}
         
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
          onClick={() => toggleSeries('New Patient')}
          className={`flex items-center gap-2 transition-opacity ${
            !activeSeries.includes('New Patient') ? 'opacity-50' : ''
          }`}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[#FF9F43]"></span>
          <span className="text-sm text-gray-600">New Patient</span>
        </button>
        <button 
          onClick={() => toggleSeries('Old Patient')}
          className={`flex items-center gap-2 transition-opacity ${
            !activeSeries.includes('Old Patient') ? 'opacity-50' : ''
          }`}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[#4F46E5]"></span>
          <span className="text-sm text-gray-600">Old Patient</span>
        </button>
      </div>
    </NHCard>
  )
} 
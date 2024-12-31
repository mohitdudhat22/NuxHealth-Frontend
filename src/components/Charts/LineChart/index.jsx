import { NHCard } from '@/components';
import { Button } from 'antd/lib';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export const LineChart = ({ data }) => {
    const [viewMode, setViewMode] = useState('year');
    
    // Fallback to static data if 'data' prop is unavailable
    const fallbackData = {
        year: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: [20, 18, 28, 18, 15, 17, 23, 25, 10, 18, 28, 32]
        },
        month: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [15, 25, 20, 30]
        },
        week: {
            categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            data: [22, 19, 25, 28, 24, 15, 20]
        }
    };

    const currentData = data?.[viewMode] || fallbackData[viewMode];

    const options = {
        chart: {
            type: 'line',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            dropShadow: {
                enabled: true,
                top: 5,
                left: 0,
                blur: 3,
                opacity: 0.15
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            lineCap: 'round'
        },
        colors: ['#0EA5E9'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.5,
                gradientToColors: ['#E11D48'], // End color (pink)
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        grid: {
            borderColor: '#f1f1f1',
            strokeDashArray: 5,
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 10
            }
        },
        xaxis: {
            categories: currentData.categories,
            labels: {
                style: {
                    colors: '#64748B',
                    fontSize: '12px',
                    fontWeight: 400
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
                    colors: '#64748B',
                    fontSize: '12px',
                    fontWeight: 400
                },
                formatter: (value) => `${value}k`
            },
            min: 0,
            max: 50,
            tickAmount: 5
        },
        markers: {
            size: 5,
            colors: ['#fff'],
            strokeColors: '#0EA5E9',
            strokeWidth: 2,
            hover: {
                size: 7
            }
        },
        tooltip: {
            custom: function({ series, seriesIndex, dataPointIndex, w }) {
                const value = series[seriesIndex][dataPointIndex];
                return `
                    <div class="custom-tooltip" style="padding: 8px 12px; background: #1E293B; border-radius: 4px;">
                        <div style="color: white; font-size: 12px;">
                            <span style="font-weight: 500;">Patients: </span>
                            <span style="font-weight: 600;">${value.toLocaleString()}</span>
                        </div>
                    </div>
                `;
            }
        }
    };

    const series = [{
        name: 'Patients',
        data: currentData.data
    }];

    return (
        <NHCard 
            title="Patients Statistics" 
            headerContent={
                <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                    <Button
                        type={viewMode === 'year' ? 'primary' : 'text'}
                        onClick={() => setViewMode('year')}
                        className={`px-4 min-w-[60px] rounded-md ${
                            viewMode === 'year' 
                                ? 'bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/90' 
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Year
                    </Button>
                    <Button
                        type={viewMode === 'month' ? 'primary' : 'text'}
                        onClick={() => setViewMode('month')}
                        className={`px-4 min-w-[60px] rounded-md ${
                            viewMode === 'month' 
                                ? 'bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/90' 
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Month
                    </Button>
                    <Button
                        type={viewMode === 'week' ? 'primary' : 'text'}
                        onClick={() => setViewMode('week')}
                        className={`px-4 min-w-[60px] rounded-md ${
                            viewMode === 'week' 
                                ? 'bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/90' 
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Week
                    </Button>
                </div>
            }
        >
            <div className="mt-4">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="line"
                    height={350}
                />
            </div>
        </NHCard>
    );
};

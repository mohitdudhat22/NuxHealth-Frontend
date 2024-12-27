import React from 'react';
import ReactApexChart from 'react-apexcharts'
import { NHCard } from '..';

export const LineChart = () => {
    const options = {
        chart: {
            type: 'line',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        colors: ['#3B82F6'], // Blue color
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
        xaxis: {
            categories: ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008'],
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
            max: 50,
            tickAmount: 5
        },
        markers: {
            size: 0
        },
        tooltip: {
            theme: 'light',
            x: {
                show: true
            }
        }
    };

    const series = [{
        name: 'Patients',
        data: [10, 20, 15, 25, 22, 30, 28, 35]
    }];

    return (
        <NHCard title="Patients Statistics">
            <div className="flex gap-4 mb-4 ">
                <button className="text-sm text-gray-500">Year</button>
                <button className="text-sm text-gray-500">Month</button>
                <button className="text-sm text-gray-500">Week</button>
            </div>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={300}
            />
        </NHCard>
    );
}; 
import React, { memo, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import { getDaysInMonth, getMonthInYear, getDaysInRange, getMonthsInRange } from '../ultils/fn'

const ChartLine = ({ data, isMonth, customTime }) => {
    const [chartData, setChartData] = useState([])
    useEffect(() => {
        // const number = isMonth
        //     ? getMonthsInRange(customTime?.from, customTime?.to)
        //     : getDaysInRange(customTime?.from, customTime?.to)
        const daysInMonth = getDaysInMonth(Date.now(), 15)
        const monthsInYear = getMonthInYear(Date.now(), 15)
        const rawData = isMonth ? monthsInYear : daysInMonth
        const editedData = rawData.map(el => {
            return ({
                counter: data?.some(i => i.createdAt === el) ? data.find(i => i.createdAt === el)?.counter : 0,
                createdAt: el
            })
        })
        setChartData(editedData)
    }, [data])
    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: true },
                grid: { color: 'rgba(0,0,0,0.1)', drawTicks: false },
                min: Math.min(...chartData?.map(el => +el.counter)) - 5 < 0 ? 0 : Math.min(...chartData?.map(el => +el.counter)) - 5,
                max: Math.max(...chartData?.map(el => +el.counter)) + 5,
                border: { dash: [20, 0] }
            },
            x: {
                ticks: { color: 'black' },
                grid: { color: 'transparent' }
            }
        },
        plugins: {
            legend: false,
        },
        hover: {
            mode: 'dataset',
            intersect: false
        }
    }
    return (
        <div className='py-4 w-full h-full'>
            {chartData ? <Line
                options={options}
                data={{
                    labels: chartData?.map(el => el.createdAt),
                    datasets: [
                        {
                            data: chartData?.map(el => +el.counter),
                            borderColor: '#e35050',
                            tension: 0.2,
                            borderWidth: 2,
                            pointBackgroundColor: 'white',
                            pointHoverRadius: 4,
                            pointBorderColor: '#e35050',
                            pointHoverBorderWidth: 4,
                        }
                    ]
                }}
            /> : <span>Không có đơn hàng nào.</span>}
        </div>
    )
}

export default memo(ChartLine)
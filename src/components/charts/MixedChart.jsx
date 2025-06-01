import { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { format } from 'date-fns'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const MixedChart = ({ historicalData }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    if (!historicalData || !historicalData.cases || !historicalData.deaths) return
    
    // Process historical data
    const dates = Object.keys(historicalData.cases)
    const casesValues = Object.values(historicalData.cases)
    const deathsValues = Object.values(historicalData.deaths)
    
    // Calculate daily new cases
    const dailyNewCases = []
    for (let i = 1; i < casesValues.length; i++) {
      dailyNewCases.push(Math.max(0, casesValues[i] - casesValues[i - 1]))
    }
    
    // Format dates
    const formattedDates = dates.map(date => {
      const [month, day, year] = date.split('/')
      return format(new Date(20 + year, month - 1, day), 'MMM d')
    })
    
    // Use only the dates for which we have daily new cases
    const dailyDates = formattedDates.slice(1)
    
    setChartData({
      labels: dailyDates,
      datasets: [
        {
          type: 'line',
          label: 'Total Deaths',
          data: deathsValues.slice(1), // Slice to match dailyDates
          borderColor: 'var(--color-accent)',
          backgroundColor: 'rgba(239, 71, 111, 0.1)',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          yAxisID: 'y1',
        },
        {
          type: 'bar',
          label: 'Daily New Cases',
          data: dailyNewCases,
          backgroundColor: 'rgba(4, 102, 200, 0.6)',
          borderColor: 'rgba(4, 102, 200, 1)',
          borderWidth: 1,
          yAxisID: 'y',
        },
      ],
    })
  }, [historicalData])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Daily New Cases',
        },
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('en-US', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(value)
          },
        },
      },
      y1: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Total Deaths',
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('en-US', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(value)
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || ''
            if (label) {
              label += ': '
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat().format(context.parsed.y)
            }
            return label
          }
        }
      },
    },
  }

  return (
    <div style={{ height: '300px' }}>
      {chartData.labels.length > 0 ? (
        <Chart type="bar\" data={chartData} options={options} />
      ) : (
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--color-neutral-600)' 
        }}>
          No data available
        </div>
      )}
    </div>
  )
}

export default MixedChart
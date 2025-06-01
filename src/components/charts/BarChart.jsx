import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js'
import { format } from 'date-fns'

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
)

const BarChart = ({ historicalData, dataKey, color }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    if (!historicalData || !historicalData[dataKey]) return
    
    // Process historical data to get daily changes
    const dates = Object.keys(historicalData[dataKey])
    const values = Object.values(historicalData[dataKey])
    
    // Calculate daily changes
    const dailyChanges = []
    
    for (let i = 1; i < values.length; i++) {
      dailyChanges.push(values[i] - values[i - 1])
    }
    
    // Remove the first date since we don't have a change for it
    const datesToDisplay = dates.slice(1)
    
    // Format dates
    const formattedDates = datesToDisplay.map(date => {
      const [month, day, year] = date.split('/')
      return format(new Date(20 + year, month - 1, day), 'MMM d')
    })
    
    setChartData({
      labels: formattedDates,
      datasets: [
        {
          label: `Daily New ${dataKey.charAt(0).toUpperCase() + dataKey.slice(1)}`,
          data: dailyChanges,
          backgroundColor: color,
          borderRadius: 3,
        },
      ],
    })
  }, [historicalData, dataKey, color])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 20,
          font: {
            size: 12,
          },
        },
      },
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
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
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
  }

  return (
    <div style={{ height: '300px' }}>
      {chartData.labels.length > 0 ? (
        <Bar data={chartData} options={options} />
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

export default BarChart
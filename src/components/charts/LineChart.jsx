import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js'
import { format } from 'date-fns'

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
)

const LineChart = ({ historicalData, dataKey, color }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    if (!historicalData || !historicalData[dataKey]) return
    
    // Process historical data
    const dates = Object.keys(historicalData[dataKey])
    const values = Object.values(historicalData[dataKey])
    
    // Format dates
    const formattedDates = dates.map(date => {
      const [month, day, year] = date.split('/')
      return format(new Date(20 + year, month - 1, day), 'MMM d')
    })
    
    setChartData({
      labels: formattedDates,
      datasets: [
        {
          label: dataKey.charAt(0).toUpperCase() + dataKey.slice(1),
          data: values,
          fill: true,
          backgroundColor: `${color}20`,
          borderColor: color,
          tension: 0.3,
          pointRadius: 2,
          pointHoverRadius: 5,
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
        mode: 'index',
        intersect: false,
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
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  }

  return (
    <div style={{ height: '300px' }}>
      {chartData.labels.length > 0 ? (
        <Line data={chartData} options={options} />
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

export default LineChart
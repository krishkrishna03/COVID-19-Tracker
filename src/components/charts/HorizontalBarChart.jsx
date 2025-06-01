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

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
)

const HorizontalBarChart = ({ countriesData, dataKey, color }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    if (!countriesData || !countriesData.length) return
    
    // Sort countries by the dataKey and take top 10
    const sortedCountries = [...countriesData]
      .sort((a, b) => b[dataKey] - a[dataKey])
      .slice(0, 10)
    
    const labels = sortedCountries.map(country => country.country)
    const data = sortedCountries.map(country => country[dataKey])
    
    setChartData({
      labels,
      datasets: [
        {
          label: dataKey.charAt(0).toUpperCase() + dataKey.slice(1),
          data,
          backgroundColor: color,
          borderRadius: 3,
        },
      ],
    })
  }, [countriesData, dataKey, color])

  const options = {
    indexAxis: 'y',
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
            if (context.parsed.x !== null) {
              label += new Intl.NumberFormat().format(context.parsed.x)
            }
            return label
          }
        }
      },
    },
    scales: {
      x: {
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
      y: {
        grid: {
          display: false,
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

export default HorizontalBarChart
import { useState, useEffect } from 'react'
import { PolarArea } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  ArcElement, 
  Tooltip, 
  Legend 
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  RadialLinearScale, 
  ArcElement, 
  Tooltip, 
  Legend
)

const PolarAreaChart = ({ countriesData }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    if (!countriesData || !countriesData.length) return
    
    // Group countries by region and calculate total cases
    const regionMap = new Map()
    
    countriesData.forEach(country => {
      if (!country.continent) return
      
      const region = country.continent
      const currentTotal = regionMap.get(region) || 0
      regionMap.set(region, currentTotal + country.cases)
    })
    
    // Convert map to arrays for chart
    const regions = Array.from(regionMap.keys())
    const caseCounts = Array.from(regionMap.values())
    
    // Generate colors for each region
    const colors = [
      'rgba(4, 102, 200, 0.7)',
      'rgba(239, 71, 111, 0.7)',
      'rgba(6, 214, 160, 0.7)',
      'rgba(255, 209, 102, 0.7)',
      'rgba(17, 138, 178, 0.7)',
      'rgba(119, 104, 174, 0.7)',
    ]
    
    setChartData({
      labels: regions,
      datasets: [
        {
          label: 'Cases by Region',
          data: caseCounts,
          backgroundColor: colors,
        },
      ],
    })
  }, [countriesData])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || ''
            if (label) {
              label += ': '
            }
            if (context.raw !== null) {
              label += new Intl.NumberFormat().format(context.raw)
            }
            return label
          }
        }
      },
    },
    scales: {
      r: {
        ticks: {
          display: false,
        },
      },
    },
  }

  return (
    <div style={{ height: '300px' }}>
      {chartData.labels.length > 0 ? (
        <PolarArea data={chartData} options={options} />
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

export default PolarAreaChart
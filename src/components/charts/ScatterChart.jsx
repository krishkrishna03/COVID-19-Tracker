import { useState, useEffect } from 'react'
import { Scatter } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Tooltip, 
  Legend 
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  LinearScale, 
  PointElement, 
  LineElement, 
  Tooltip, 
  Legend
)

const ScatterChart = ({ countriesData }) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  })

  useEffect(() => {
    if (!countriesData || !countriesData.length) return
    
    // Filter out countries with missing data and limit to countries with significant cases
    const filteredCountries = countriesData
      .filter(country => 
        country.tests > 0 && 
        country.cases > 0 && 
        country.population > 100000
      )
      .sort((a, b) => b.cases - a.cases)
      .slice(0, 50) // Take top 50 countries by cases
    
    const data = filteredCountries.map(country => ({
      x: country.tests / country.population * 100, // Tests as percentage of population
      y: country.cases / country.population * 100, // Cases as percentage of population
      country: country.country,
      tests: country.tests,
      cases: country.cases,
      population: country.population
    }))
    
    setChartData({
      datasets: [
        {
          label: 'Cases vs Tests (% of population)',
          data,
          backgroundColor: 'rgba(4, 102, 200, 0.7)',
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    })
  }, [countriesData])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const point = context.raw
            return [
              `${point.country}`,
              `Tests: ${(point.x).toFixed(2)}% (${new Intl.NumberFormat().format(point.tests)})`,
              `Cases: ${(point.y).toFixed(2)}% (${new Intl.NumberFormat().format(point.cases)})`,
              `Population: ${new Intl.NumberFormat().format(point.population)}`
            ]
          }
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tests (% of population)',
        },
        ticks: {
          callback: value => `${value.toFixed(0)}%`
        }
      },
      y: {
        title: {
          display: true,
          text: 'Cases (% of population)',
        },
        ticks: {
          callback: value => `${value.toFixed(1)}%`
        }
      },
    },
  }

  return (
    <div style={{ height: '300px' }}>
      {chartData.datasets.length > 0 && chartData.datasets[0].data.length > 0 ? (
        <Scatter data={chartData} options={options} />
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

export default ScatterChart
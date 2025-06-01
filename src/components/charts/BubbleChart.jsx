import { useState, useEffect } from 'react'
import { Bubble } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  LinearScale, 
  PointElement, 
  Tooltip, 
  Legend 
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  LinearScale, 
  PointElement, 
  Tooltip, 
  Legend
)

const BubbleChart = ({ countriesData }) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  })

  useEffect(() => {
    if (!countriesData || !countriesData.length) return
    
    // Filter out countries with missing data and limit to countries with significant cases
    const filteredCountries = countriesData
      .filter(country => 
        country.deaths > 0 && 
        country.cases > 0 && 
        country.population > 1000000
      )
      .sort((a, b) => b.cases - a.cases)
      .slice(0, 30) // Take top 30 countries by cases
    
    const data = filteredCountries.map(country => ({
      x: country.casesPerOneMillion / 100, // Cases per 100k for readability
      y: country.deathsPerOneMillion / 10, // Deaths per 100k for readability
      r: Math.sqrt(country.population) / 4000, // Scale bubble size based on population
      country: country.country,
      cases: country.cases,
      deaths: country.deaths,
      population: country.population,
      casesPerMillion: country.casesPerOneMillion,
      deathsPerMillion: country.deathsPerOneMillion
    }))
    
    setChartData({
      datasets: [
        {
          label: 'Country Impact Analysis',
          data,
          backgroundColor: 'rgba(239, 71, 111, 0.6)',
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
              `Cases: ${new Intl.NumberFormat().format(point.cases)} (${point.casesPerMillion} per 1M)`,
              `Deaths: ${new Intl.NumberFormat().format(point.deaths)} (${point.deathsPerMillion} per 1M)`,
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
          text: 'Cases per 100k population',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Deaths per 100k population',
        },
      },
    },
  }

  return (
    <div style={{ height: '300px' }}>
      {chartData.datasets.length > 0 && chartData.datasets[0].data.length > 0 ? (
        <Bubble data={chartData} options={options} />
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

export default BubbleChart
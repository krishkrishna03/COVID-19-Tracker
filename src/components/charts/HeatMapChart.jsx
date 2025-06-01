import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Bubble } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(LinearScale, PointElement, Tooltip, Legend)

const HeatMapChart = ({ countriesData }) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  })

  useEffect(() => {
    if (!countriesData || !countriesData.length) return

    // Filter out countries without coordinates
    const filteredCountries = countriesData.filter(
      country => country.countryInfo.lat && country.countryInfo.long
    )

    // Normalize latitude and longitude to fit chart coordinates
    // Lat: -90 to 90, Long: -180 to 180
    // We'll normalize to 0-10 for chart display
    const normalizeCoord = (value, min, max) => {
      return ((value - min) / (max - min)) * 10
    }

    // Calculate min/max for cases for bubble sizing
    const maxCases = Math.max(...filteredCountries.map(country => country.cases))

    const data = filteredCountries.map(country => ({
      x: normalizeCoord(country.countryInfo.long, -180, 180),
      y: normalizeCoord(country.countryInfo.lat, -90, 90),
      r: Math.max(3, Math.sqrt(country.cases / maxCases) * 25),
      country: country.country,
      cases: country.cases,
      deaths: country.deaths,
      recovered: country.recovered,
      lat: country.countryInfo.lat,
      long: country.countryInfo.long,
    }))

    setChartData({
      datasets: [
        {
          label: 'COVID-19 Cases by Location',
          data,
          backgroundColor: data.map(point => 
            `rgba(${Math.floor(239 + (point.r * 0.5))}, ${Math.floor(71 - (point.r * 2))}, ${Math.floor(111 - (point.r * 3))}, 0.7)`
          ),
        },
      ],
    })
  }, [countriesData])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        min: 0,
        max: 10,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        title: {
          display: true,
          text: 'West ← Longitude → East',
        }
      },
      y: {
        min: 0,
        max: 10,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        title: {
          display: true,
          text: 'South ← Latitude → North',
        }
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const point = context.raw
            return [
              `${point.country}`,
              `Cases: ${new Intl.NumberFormat().format(point.cases)}`,
              `Deaths: ${new Intl.NumberFormat().format(point.deaths)}`,
              `Recovered: ${new Intl.NumberFormat().format(point.recovered)}`,
              `Coordinates: ${point.lat.toFixed(2)}, ${point.long.toFixed(2)}`
            ]
          }
        }
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

export default HeatMapChart
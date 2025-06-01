import { useState, useEffect } from 'react'
import { Radar } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend 
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend
)

const RadarChart = ({ data, countriesData }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    if (!data || !countriesData || !countriesData.length) return
    
    // Find global averages
    const globalStats = {
      caseFatalityRate: (data.deaths / data.cases) * 100,
      recoveryRate: (data.recovered / data.cases) * 100,
      activeCaseRate: (data.active / data.cases) * 100,
      testPositivityRate: (data.cases / data.tests) * 100,
      casesPerMillion: data.casesPerOneMillion,
      deathsPerMillion: data.deathsPerOneMillion,
    }
    
    // If we have a selected country, use its data
    let selectedCountryStats = null
    
    if (data !== countriesData[0] && data.country) {
      selectedCountryStats = {
        caseFatalityRate: (data.deaths / data.cases) * 100,
        recoveryRate: (data.recovered / data.cases) * 100,
        activeCaseRate: (data.active / data.cases) * 100,
        testPositivityRate: (data.cases / data.tests) * 100,
        casesPerMillion: data.casesPerOneMillion,
        deathsPerMillion: data.deathsPerOneMillion,
      }
    }
    
    // Normalize values for better visualization
    const normalizeCasesPerMillion = value => Math.min(value / 20000 * 100, 100)
    const normalizeDeathsPerMillion = value => Math.min(value / 1000 * 100, 100)
    
    const datasets = [
      {
        label: 'Global Average',
        data: [
          globalStats.caseFatalityRate,
          globalStats.recoveryRate,
          globalStats.activeCaseRate,
          globalStats.testPositivityRate,
          normalizeCasesPerMillion(globalStats.casesPerMillion),
          normalizeDeathsPerMillion(globalStats.deathsPerMillion),
        ],
        backgroundColor: 'rgba(4, 102, 200, 0.2)',
        borderColor: 'rgba(4, 102, 200, 0.8)',
        pointBackgroundColor: 'rgba(4, 102, 200, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(4, 102, 200, 1)',
      }
    ]
    
    if (selectedCountryStats) {
      datasets.push({
        label: data.country,
        data: [
          selectedCountryStats.caseFatalityRate,
          selectedCountryStats.recoveryRate,
          selectedCountryStats.activeCaseRate,
          selectedCountryStats.testPositivityRate,
          normalizeCasesPerMillion(selectedCountryStats.casesPerMillion),
          normalizeDeathsPerMillion(selectedCountryStats.deathsPerMillion),
        ],
        backgroundColor: 'rgba(239, 71, 111, 0.2)',
        borderColor: 'rgba(239, 71, 111, 0.8)',
        pointBackgroundColor: 'rgba(239, 71, 111, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(239, 71, 111, 1)',
      })
    }
    
    setChartData({
      labels: [
        'Case Fatality Rate',
        'Recovery Rate',
        'Active Case Rate',
        'Test Positivity Rate',
        'Cases per Million',
        'Deaths per Million',
      ],
      datasets,
    })
  }, [data, countriesData])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent',
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
            if (context.raw !== null) {
              // Different formatting based on metric
              const index = context.dataIndex
              if (index === 4) { // Cases per Million
                const value = context.raw / 100 * 20000
                label += new Intl.NumberFormat().format(Math.round(value))
              } else if (index === 5) { // Deaths per Million
                const value = context.raw / 100 * 1000
                label += new Intl.NumberFormat().format(Math.round(value))
              } else {
                label += `${context.raw.toFixed(2)}%`
              }
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
        <Radar data={chartData} options={options} />
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

export default RadarChart
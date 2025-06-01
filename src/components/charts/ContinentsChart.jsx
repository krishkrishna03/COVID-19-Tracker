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
import { fetchAllContinentsData } from '../../api/covidAPI'

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
)

const ContinentsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const continentsData = await fetchAllContinentsData()
        
        // Sort continents by cases
        const sortedContinents = [...continentsData].sort((a, b) => b.cases - a.cases)
        
        const labels = sortedContinents.map(continent => continent.continent)
        const casesData = sortedContinents.map(continent => continent.cases)
        const deathsData = sortedContinents.map(continent => continent.deaths)
        const recoveredData = sortedContinents.map(continent => continent.recovered)
        
        setChartData({
          labels,
          datasets: [
            {
              label: 'Cases',
              data: casesData,
              backgroundColor: 'rgba(4, 102, 200, 0.7)',
              stack: 'Stack 0',
              barPercentage: 0.8,
            },
            {
              label: 'Deaths',
              data: deathsData,
              backgroundColor: 'rgba(239, 71, 111, 0.7)',
              stack: 'Stack 1',
              barPercentage: 0.8,
            },
            {
              label: 'Recovered',
              data: recoveredData,
              backgroundColor: 'rgba(6, 214, 160, 0.7)',
              stack: 'Stack 2',
              barPercentage: 0.8,
            }
          ],
        })
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching continents data:', error)
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

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
      {loading ? (
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--color-neutral-600)' 
        }}>
          Loading continental data...
        </div>
      ) : chartData.labels.length > 0 ? (
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

export default ContinentsChart
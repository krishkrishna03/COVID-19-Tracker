import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({ data }) => {
  if (!data || !data.tests || !data.population) return null
  
  // Calculate tested vs untested population
  const tested = data.tests
  const untested = data.population - tested
  
  const chartData = {
    labels: ['Tested', 'Untested'],
    datasets: [
      {
        data: [tested, untested < 0 ? 0 : untested],
        backgroundColor: [
          'var(--color-primary)',
          'var(--color-neutral-300)',
        ],
        borderColor: [
          'var(--color-primary-dark)',
          'var(--color-neutral-400)',
        ],
        borderWidth: 1,
        cutout: '70%',
      },
    ],
  }
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          boxWidth: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || ''
            const value = context.raw
            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0)
            const percentage = Math.round((value / total) * 100)
            return `${label}: ${new Intl.NumberFormat().format(value)} (${percentage}%)`
          }
        }
      },
    },
  }

  return (
    <div style={{ height: '300px', position: 'relative' }}>
      <Doughnut data={chartData} options={options} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '14px',
          color: 'var(--color-neutral-600)',
        }}>
          Tests per 1M
        </div>
        <div style={{
          fontSize: '18px',
          fontWeight: 'bold',
        }}>
          {new Intl.NumberFormat().format(Math.round(data.testsPerOneMillion))}
        </div>
      </div>
    </div>
  )
}

export default DoughnutChart
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = ({ data }) => {
  if (!data) return null
  
  const { cases, recovered, deaths, active } = data
  
  const chartData = {
    labels: ['Active', 'Recovered', 'Deaths'],
    datasets: [
      {
        data: [active, recovered, deaths],
        backgroundColor: [
          'var(--color-warning)',
          'var(--color-success)',
          'var(--color-accent)',
        ],
        borderColor: [
          'rgba(255, 209, 102, 1)',
          'rgba(6, 214, 160, 1)',
          'rgba(239, 71, 111, 1)',
        ],
        borderWidth: 1,
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
    <div style={{ height: '300px' }}>
      <Pie data={chartData} options={options} />
    </div>
  )
}

export default PieChart
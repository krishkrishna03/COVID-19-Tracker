import { useState, useEffect } from 'react'
import { fetchHistoricalData } from '../api/covidAPI'
import LineChart from './charts/LineChart'
import BarChart from './charts/BarChart'
import PieChart from './charts/PieChart'
import DoughnutChart from './charts/DoughnutChart'
import HorizontalBarChart from './charts/HorizontalBarChart'
import ScatterChart from './charts/ScatterChart'
import BubbleChart from './charts/BubbleChart'
import PolarAreaChart from './charts/PolarAreaChart'
import RadarChart from './charts/RadarChart'
import MixedChart from './charts/MixedChart'
import ContinentsChart from './charts/ContinentsChart'
import HeatMapChart from './charts/HeatMapChart'
import './Dashboard.css'

const Dashboard = ({ globalData, countryData, countriesData, selectedCountry }) => {
  const [historicalData, setHistoricalData] = useState(null)
  const [timeRange, setTimeRange] = useState(30)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const country = selectedCountry === 'worldwide' ? 'all' : selectedCountry
        const data = await fetchHistoricalData(country, timeRange)
        setHistoricalData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching historical data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedCountry, timeRange])

  const handleTimeRangeChange = (days) => {
    setTimeRange(days)
  }

  if (loading || !historicalData) {
    return <div className="dashboard loading">Loading data...</div>
  }

  return (
    <div className="dashboard">
      <div className="dashboard__time-controls">
        <p>Time Range:</p>
        <div className="dashboard__time-buttons">
          <button 
            className={timeRange === 7 ? 'active' : ''} 
            onClick={() => handleTimeRangeChange(7)}
          >
            7 Days
          </button>
          <button 
            className={timeRange === 30 ? 'active' : ''} 
            onClick={() => handleTimeRangeChange(30)}
          >
            30 Days
          </button>
          <button 
            className={timeRange === 90 ? 'active' : ''} 
            onClick={() => handleTimeRangeChange(90)}
          >
            90 Days
          </button>
          <button 
            className={timeRange === 'all' ? 'active' : ''} 
            onClick={() => handleTimeRangeChange('all')}
          >
            All Time
          </button>
        </div>
      </div>

      <div className="dashboard__grid">
        <div className="dashboard__chart-card">
          <h3>Cases Over Time</h3>
          <LineChart 
            historicalData={historicalData} 
            dataKey="cases" 
            color="var(--color-primary)"
          />
        </div>
        
        <div className="dashboard__chart-card">
          <h3>Deaths Over Time</h3>
          <LineChart 
            historicalData={historicalData} 
            dataKey="deaths" 
            color="var(--color-accent)"
          />
        </div>
        
        <div className="dashboard__chart-card">
          <h3>Recovered Over Time</h3>
          <LineChart 
            historicalData={historicalData} 
            dataKey="recovered" 
            color="var(--color-success)"
          />
        </div>
        
        <div className="dashboard__chart-card">
          <h3>Daily New Cases</h3>
          <BarChart 
            historicalData={historicalData} 
            dataKey="cases" 
            color="var(--color-primary)"
          />
        </div>
        
        <div className="dashboard__chart-card">
          <h3>Case Distribution</h3>
          <PieChart data={countryData || globalData} />
        </div>
        
        <div className="dashboard__chart-card">
          <h3>Testing & Population</h3>
          <DoughnutChart data={countryData || globalData} />
        </div>
        
        <div className="dashboard__chart-card">
          <h3>Top 10 Countries by Cases</h3>
          <HorizontalBarChart 
            countriesData={countriesData} 
            dataKey="cases" 
            color="var(--color-primary)"
          />
        </div>
        
        <div className="dashboard__chart-card">
          <h3>Cases vs Tests</h3>
          <ScatterChart countriesData={countriesData} />
        </div>
        
        <div className="dashboard__chart-card">
          <h3>Country Impact Analysis</h3>
          <BubbleChart countriesData={countriesData} />
        </div>
        
        <div className="dashboard__chart-card">
          <h3>Regional Distribution</h3>
          <PolarAreaChart countriesData={countriesData} />
        </div>
        
        <div className="dashboard__chart-card">
          <h3>Mortality Metrics</h3>
          <RadarChart data={countryData || globalData} countriesData={countriesData} />
        </div>
        
        <div className="dashboard__chart-card">
          <h3>Cases vs Deaths Comparison</h3>
          <MixedChart historicalData={historicalData} />
        </div>
        
        <div className="dashboard__chart-card">
          <h3>Continental Breakdown</h3>
          <ContinentsChart />
        </div>
        
        <div className="dashboard__chart-card">
          <h3>Global Case Density</h3>
          <HeatMapChart countriesData={countriesData} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
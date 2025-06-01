import { useState, useEffect } from 'react'
import { fetchGlobalData, fetchCountriesData } from './api/covidAPI'
import Header from './components/Header'
import GlobalStats from './components/GlobalStats'
import CountrySelector from './components/CountrySelector'
import Dashboard from './components/Dashboard'
import CovidMap from './components/CovidMap'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import './App.css'

function App() {
  const [globalData, setGlobalData] = useState(null)
  const [countriesData, setCountriesData] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('worldwide')
  const [countryData, setCountryData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const globalInfo = await fetchGlobalData()
        const countriesInfo = await fetchCountriesData()
        
        setGlobalData(globalInfo)
        setCountriesData(countriesInfo)
        setCountryData(globalInfo) // Initially set to global data
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCountryChange = async (countryCode) => {
    setLoading(true)
    
    try {
      let data
      
      if (countryCode === 'worldwide') {
        data = globalData
      } else {
        const selectedCountryData = countriesData.find(
          country => country.countryInfo.iso2 === countryCode || 
                    country.countryInfo.iso3 === countryCode
        )
        data = selectedCountryData
      }
      
      setSelectedCountry(countryCode)
      setCountryData(data)
      setLoading(false)
    } catch (error) {
      console.error("Error changing country:", error)
      setLoading(false)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div style={{ marginTop: '2rem' }} />
      <div className="container">
        <div className="app__top">
          <GlobalStats data={globalData} />
          <CountrySelector 
            countries={countriesData} 
            selectedCountry={selectedCountry}
            onCountryChange={handleCountryChange}
          />
        </div>
        
        <Dashboard 
          globalData={globalData} 
          countryData={countryData} 
          countriesData={countriesData}
          selectedCountry={selectedCountry}
        />
        
        <div className="app__map-container">
          <h2 className="section-title">Interactive World Map</h2>
          <CovidMap 
            countries={countriesData} 
            center={countryData?.countryInfo?.lat && countryData?.countryInfo?.long ? 
              [countryData.countryInfo.lat, countryData.countryInfo.long] : 
              [34.80746, -40.4796]}
            zoom={countryData?.countryInfo?.lat && countryData?.countryInfo?.long ? 4 : 2}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App

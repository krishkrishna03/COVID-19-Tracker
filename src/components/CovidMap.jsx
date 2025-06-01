import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet'
import numeral from 'numeral'
import 'leaflet/dist/leaflet.css'
import './CovidMap.css'

const CovidMap = ({ countries, center, zoom }) => {
  // Calculate max cases for color intensity scaling
  const maxCases = Math.max(...countries.map(country => country.cases))
  
  // Function to determine circle size based on case count
  const casesToRadius = (cases) => {
    return Math.sqrt(cases) * 300 / Math.sqrt(maxCases)
  }
  
  // Function to determine circle color based on cases per one million
  const getCircleColor = (casesPerOneMillion) => {
    const colors = [
      { threshold: 500, color: 'rgba(166, 206, 227, 0.5)' },
      { threshold: 2000, color: 'rgba(31, 120, 180, 0.5)' },
      { threshold: 5000, color: 'rgba(178, 223, 138, 0.5)' },
      { threshold: 10000, color: 'rgba(51, 160, 44, 0.5)' },
      { threshold: 20000, color: 'rgba(251, 154, 153, 0.5)' },
      { threshold: 30000, color: 'rgba(227, 26, 28, 0.5)' },
      { threshold: 40000, color: 'rgba(253, 191, 111, 0.5)' },
      { threshold: 50000, color: 'rgba(255, 127, 0, 0.5)' },
      { threshold: 70000, color: 'rgba(202, 178, 214, 0.5)' },
      { threshold: Infinity, color: 'rgba(106, 61, 154, 0.5)' }
    ]
    
    const match = colors.find(color => casesPerOneMillion < color.threshold)
    return match ? match.color : colors[colors.length - 1].color
  }

  return (
    <div className="covid-map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {countries.map((country, index) => (
          country.countryInfo.lat && country.countryInfo.long ? (
            <Circle
              key={index}
              center={[country.countryInfo.lat, country.countryInfo.long]}
              radius={casesToRadius(country.cases)}
              pathOptions={{
                color: getCircleColor(country.casesPerOneMillion),
                fillColor: getCircleColor(country.casesPerOneMillion),
                fillOpacity: 0.7
              }}
            >
              <Popup>
                <div className="map-popup">
                  <div className="map-popup__flag">
                    <img src={country.countryInfo.flag} alt={`${country.country} flag`} />
                  </div>
                  <div className="map-popup__country">{country.country}</div>
                  <table className="map-popup__stats">
                    <tbody>
                      <tr>
                        <td>Cases:</td>
                        <td>{numeral(country.cases).format('0,0')}</td>
                      </tr>
                      <tr>
                        <td>Recovered:</td>
                        <td>{numeral(country.recovered).format('0,0')}</td>
                      </tr>
                      <tr>
                        <td>Deaths:</td>
                        <td>{numeral(country.deaths).format('0,0')}</td>
                      </tr>
                      <tr>
                        <td>Population:</td>
                        <td>{numeral(country.population).format('0,0')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Popup>
            </Circle>
          ) : null
        ))}
      </MapContainer>
      
      <div className="map-legend">
        <h4>Cases per One Million</h4>
        <div className="map-legend__items">
          <div className="map-legend__item">
            <span className="map-legend__color" style={{ backgroundColor: 'rgba(166, 206, 227, 0.8)' }}></span>
            <span className="map-legend__label">&lt; 500</span>
          </div>
          <div className="map-legend__item">
            <span className="map-legend__color" style={{ backgroundColor: 'rgba(31, 120, 180, 0.8)' }}></span>
            <span className="map-legend__label">500-2k</span>
          </div>
          <div className="map-legend__item">
            <span className="map-legend__color" style={{ backgroundColor: 'rgba(178, 223, 138, 0.8)' }}></span>
            <span className="map-legend__label">2k-5k</span>
          </div>
          <div className="map-legend__item">
            <span className="map-legend__color" style={{ backgroundColor: 'rgba(51, 160, 44, 0.8)' }}></span>
            <span className="map-legend__label">5k-10k</span>
          </div>
          <div className="map-legend__item">
            <span className="map-legend__color" style={{ backgroundColor: 'rgba(251, 154, 153, 0.8)' }}></span>
            <span className="map-legend__label">10k-20k</span>
          </div>
          <div className="map-legend__item">
            <span className="map-legend__color" style={{ backgroundColor: 'rgba(227, 26, 28, 0.8)' }}></span>
            <span className="map-legend__label">20k-30k</span>
          </div>
          <div className="map-legend__item">
            <span className="map-legend__color" style={{ backgroundColor: 'rgba(253, 191, 111, 0.8)' }}></span>
            <span className="map-legend__label">30k-40k</span>
          </div>
          <div className="map-legend__item">
            <span className="map-legend__color" style={{ backgroundColor: 'rgba(255, 127, 0, 0.8)' }}></span>
            <span className="map-legend__label">40k-50k</span>
          </div>
          <div className="map-legend__item">
            <span className="map-legend__color" style={{ backgroundColor: 'rgba(202, 178, 214, 0.8)' }}></span>
            <span className="map-legend__label">50k-70k</span>
          </div>
          <div className="map-legend__item">
            <span className="map-legend__color" style={{ backgroundColor: 'rgba(106, 61, 154, 0.8)' }}></span>
            <span className="map-legend__label">&gt; 70k</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CovidMap
import CountUp from 'react-countup'
import { FaUser, FaUserPlus, FaHeart, FaSkull } from 'react-icons/fa'
import './GlobalStats.css'

const GlobalStats = ({ data }) => {
  if (!data) return null
  
  const stats = [
    {
      title: 'Total Cases',
      value: data.cases,
      today: data.todayCases,
      color: 'var(--color-primary)',
      icon: <FaUser />
    },
    {
      title: 'Active Cases',
      value: data.active,
      color: 'var(--color-warning)',
      icon: <FaUserPlus />
    },
    {
      title: 'Recovered',
      value: data.recovered,
      today: data.todayRecovered,
      color: 'var(--color-success)',
      icon: <FaHeart />
    },
    {
      title: 'Deaths',
      value: data.deaths,
      today: data.todayDeaths,
      color: 'var(--color-accent)',
      icon: <FaSkull />
    }
  ]

  return (
    <div className="global-stats">
      <div className="global-stats__grid">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="global-stats__card"
            style={{ borderColor: stat.color }}
          >
            <div className="global-stats__icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="global-stats__content">
              <h3 className="global-stats__title">{stat.title}</h3>
              <h2 className="global-stats__value">
                <CountUp 
                  start={0} 
                  end={stat.value} 
                  duration={2.5} 
                  separator="," 
                />
              </h2>
              {stat.today !== undefined && (
                <p className="global-stats__today">
                  Today: +<CountUp 
                    start={0} 
                    end={stat.today} 
                    duration={2.5} 
                    separator="," 
                  />
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="global-stats__updated">
        Last Updated: {new Date(data.updated).toLocaleString()}
      </p>
    </div>
  )
}

export default GlobalStats
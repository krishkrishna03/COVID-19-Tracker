import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__info">
            <h3>COVID-19 Tracker</h3>
            <p>
              This application uses data from Disease.sh API to provide up-to-date 
              information about the COVID-19 pandemic worldwide.
            </p>
          </div>
          
          <div className="footer__links">
            <div className="footer__column">
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019" target="_blank" rel="noopener noreferrer">
                    WHO COVID-19 Info
                  </a>
                </li>
                <li>
                  <a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html" target="_blank" rel="noopener noreferrer">
                    CDC COVID-19 Info
                  </a>
                </li>
                <li>
                  <a href="https://disease.sh/" target="_blank" rel="noopener noreferrer">
                    Disease.sh API
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="footer__column">
              <h4>Developer</h4>
              <ul>
                <li>
                  <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
                    GitHub Profile
                  </a>
                </li>
                <li>
                  <a href="https://github.com/your-username/covid19-tracker" target="_blank" rel="noopener noreferrer">
                    Repository
                  </a>
                </li>
                <li>
                  <a href="mailto:your-email@example.com">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer__copyright">
          <p>&copy; {new Date().getFullYear()} COVID-19 Tracker. All rights reserved.</p>
          <p>Data sourced from <a href="https://disease.sh/" target="_blank" rel="noopener noreferrer">disease.sh</a></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
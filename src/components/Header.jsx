import { FaMoon, FaSun, FaGithub } from 'react-icons/fa'
import './Header.css'

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__logo">
          <h1>COVID-19 Tracker</h1>
          <p className="header__subtitle">Real-time statistics and interactive visualizations</p>
        </div>
        
        <div className="header__actions">
          <button 
            className="header__theme-toggle" 
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          
          <a 
            href="https://github.com/your-username/covid19-tracker" 
            target="_blank" 
            rel="noopener noreferrer"
            className="header__github-link"
            aria-label="View source code on GitHub"
          >
            <FaGithub />
            <span>Source</span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
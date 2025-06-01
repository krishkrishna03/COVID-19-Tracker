import './LoadingSpinner.css'

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading COVID-19 data...</p>
    </div>
  )
}

export default LoadingSpinner
import { useState } from 'react'
import Select from 'react-select'
import './CountrySelector.css'

const CountrySelector = ({ countries, selectedCountry, onCountryChange }) => {
  const [search, setSearch] = useState('')
  
  // Prepare data for react-select
  const options = [
    { value: 'worldwide', label: 'Worldwide' },
    ...countries.map(country => ({
      value: country.countryInfo.iso2 || country.countryInfo.iso3,
      label: country.country,
      flag: country.countryInfo.flag
    }))
  ]

  const selectedOption = options.find(option => option.value === selectedCountry)

  const handleChange = (selected) => {
    onCountryChange(selected.value)
  }

  const formatOptionLabel = ({ label, flag }) => (
    <div className="country-option">
      {flag && <img src={flag} alt={`${label} flag`} className="country-flag" />}
      <span>{label}</span>
    </div>
  )

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'var(--color-neutral-50)',
      borderColor: 'var(--color-neutral-300)',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'var(--color-primary)'
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--color-neutral-50)',
      zIndex: 10
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? 'var(--color-primary)' 
        : state.isFocused 
          ? 'var(--color-neutral-200)' 
          : 'var(--color-neutral-50)',
      color: state.isSelected ? 'white' : 'var(--color-neutral-800)',
      '&:active': {
        backgroundColor: 'var(--color-primary-light)'
      }
    })
  }

  return (
    <div className="country-selector">
      <Select
        className="country-dropdown"
        options={options}
        value={selectedOption}
        onChange={handleChange}
        formatOptionLabel={formatOptionLabel}
        styles={customStyles}
        placeholder="Select a country"
        isSearchable
      />
    </div>
  )
}

export default CountrySelector
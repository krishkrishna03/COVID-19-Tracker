import axios from 'axios'

const BASE_URL = 'https://disease.sh/v3/covid-19'

export const fetchGlobalData = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/all`)
    return data
  } catch (error) {
    console.error('Error fetching global data:', error)
    throw error
  }
}

export const fetchCountriesData = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/countries`)
    return data
  } catch (error) {
    console.error('Error fetching countries data:', error)
    throw error
  }
}

export const fetchHistoricalData = async (country = 'all', days = 30) => {
  try {
    const endpoint = country === 'all' 
      ? `${BASE_URL}/historical/all?lastdays=${days}` 
      : `${BASE_URL}/historical/${country}?lastdays=${days}`
    
    const { data } = await axios.get(endpoint)
    return country === 'all' ? data : data.timeline
  } catch (error) {
    console.error(`Error fetching historical data for ${country}:`, error)
    throw error
  }
}

export const fetchCountryHistoricalData = async (country, days = 30) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/historical/${country}?lastdays=${days}`)
    return data.timeline
  } catch (error) {
    console.error(`Error fetching historical data for ${country}:`, error)
    throw error
  }
}

export const fetchVaccineData = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/vaccine/coverage?lastdays=30`)
    return data
  } catch (error) {
    console.error('Error fetching vaccine data:', error)
    throw error
  }
}

export const fetchCountryVaccineData = async (country) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/vaccine/coverage/countries/${country}?lastdays=30`)
    return data.timeline
  } catch (error) {
    console.error(`Error fetching vaccine data for ${country}:`, error)
    throw error
  }
}

export const fetchAllContinentsData = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/continents`)
    return data
  } catch (error) {
    console.error('Error fetching continents data:', error)
    throw error
  }
}
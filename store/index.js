export const state = () => ({

  airData: null,
  weatherData: null
})

export const mutations = {

  setAirData (state, airData) {
    state.airData = airData
  },

  setWeatherData (state, weatherData) {
    state.weatherData = weatherData
  }
}

export const actions = { }

export const getters = {

  getAirData (state) {
    return state.airData
  },

  getWeatherData (state) {
    return state.weatherData
  }
}

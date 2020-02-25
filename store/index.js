export const state = () => ({

  airData: null,
  weatherData: null,
  loader: true
})

export const mutations = {

  setAirData (state, airData) {
    state.airData = airData
  },

  setWeatherData (state, weatherData) {
    state.weatherData = weatherData
  },

  setLoader (state, data) {
    state.loader = data
  }
}

export const actions = { }

export const getters = {

  getAirData (state) {
    return state.airData
  },

  getWeatherData (state) {
    return state.weatherData
  },

  getLoader (state) {
    return state.loader
  }
}

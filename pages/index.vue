<template lang="pug">
    v-container(fluid)
      v-overlay(:value='loading' opacity='0.9')
        v-progress-circular(indeterminate size='64')

      v-row(id='air-weather')
        v-col(xs='12' sm='12' md='8' offset-md="2" lg='8' offset-lg='2')
          v-card.air-weather__card.mx-auto(max-width='400')
            v-tabs(v-model='tab' color='' grow show-arrows)
              v-tab(v-for='item in items' :key='item') {{ item }}

            v-tabs-items(v-model='tab')
              v-tab-item(key='0')
                AirQuality

              v-tab-item(key='1')
                CurrentWeather

            v-divider

            v-card-actions
              v-btn(href='#full-report') Full Report

        .wave
          <svg class='wave__img--three' fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 203"><path opacity=".6" d="M560.5 47.4l-39.2 28.2A121.6 121.6 0 01411.7 92c-46.6-15.6-98-1.6-130.3 35.5l-3.4 4a129.4 129.4 0 01-79.4 43.1L0 203h1200a19 19 0 01-16.4-9.6L1110.8 66A129 129 0 00905 41.1a129 129 0 01-171.7 14l-7.3-5.6a139.3 139.3 0 00-165.6-2.1z" fill="url(#paint0_linear)"/><defs><linearGradient id="paint0_linear" x1="740.9" y1="-97.3" x2="740.9" y2="203" gradientUnits="userSpaceOnUse"><stop :stop-color="airQualityColorHex"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs></svg>

          <svg class='wave__img--two' fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 203"><path opacity=".6" d="M560.5 47.4l-39.2 28.2A121.6 121.6 0 01411.7 92c-46.6-15.6-98-1.6-130.3 35.5l-3.4 4a129.4 129.4 0 01-79.4 43.1L0 203h1200a19 19 0 01-16.4-9.6L1110.8 66A129 129 0 00905 41.1a129 129 0 01-171.7 14l-7.3-5.6a139.3 139.3 0 00-165.6-2.1z" fill="url(#paint0_linear)"/><defs><linearGradient id="paint0_linear" x1="740.9" y1="-97.3" x2="740.9" y2="203" gradientUnits="userSpaceOnUse"><stop :stop-color="airQualityColorHex"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs></svg>

          <svg class='wave__img--one' fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 203"><path opacity=".6" d="M560.5 47.4l-39.2 28.2A121.6 121.6 0 01411.7 92c-46.6-15.6-98-1.6-130.3 35.5l-3.4 4a129.4 129.4 0 01-79.4 43.1L0 203h1200a19 19 0 01-16.4-9.6L1110.8 66A129 129 0 00905 41.1a129 129 0 01-171.7 14l-7.3-5.6a139.3 139.3 0 00-165.6-2.1z" fill="url(#paint0_linear)"/><defs><linearGradient id="paint0_linear" x1="740.9" y1="-97.3" x2="740.9" y2="203" gradientUnits="userSpaceOnUse"><stop :stop-color="airQualityColorHex"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs></svg>

      v-row#full-report
        v-col.mt-5(xs='12' sm='12' md='6' lg='6')
          h2.mt-4.mb-4.headline.text-uppercase.text-center Health Recommendations

          HealthRecommendationstable

        v-col.mt-5(xs='12' sm='12' md='6' lg='6')
          h2.mt-4.mb-4.headline.text-uppercase.text-center What am I breathing right now?

          PollutionsTable

      v-row
        v-col.mt-5(xs='12' sm='12' md='12' lg='12')
          Footer
</template>

<script>
import AirQuality from '~/components/AirQuality.vue'
import CurrentWeather from '~/components/CurrentWeather.vue'
import HealthRecommendationstable from '~/components/HealthRecommendationsTable.vue'
import PollutionsTable from '~/components/PollutionsTable.vue'
import Footer from '~/components/Footer.vue'
import axios from 'axios'

export default {
  components: {
    AirQuality,
    CurrentWeather,
    HealthRecommendationstable,
    PollutionsTable,
    Footer
  },

  data () {
    return {
      items: [
        'Air Quality', 'Current Weather'
      ],
      tab: null,
      airQualityColorHex: null,
      loading: false
    }
  },

  async fetch ({ store, params }) {
    // Air API
    const airAPIUrl = 'https://api.breezometer.com/air-quality/v2/current-conditions?key=b7401295888443538a7ebe04719c8394&metadata=true&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,dominant_pollutant_concentrations,pollutants_concentrations,all_pollutants_concentrations,pollutants_aqi_information&lat=45.13333&lon=17.25'
    const airData = await axios.get(airAPIUrl)
    store.commit('setAirData', airData)

    // Weather API
    const weatherAPIUrl = 'https://api.breezometer.com/v1/weather/currentconditions?lat=45.13333&lon=17.25&key=b7401295888443538a7ebe04719c8394&hours=72'
    const weatherData = await axios.get(weatherAPIUrl)
    store.commit('setWeatherData', weatherData)
  },

  created () {
    this.setLoader(true)
  },

  mounted () {
    this.setAirQualityColorHex()
    this.setLoader(false)
  },

  methods: {
    setAirQualityColorHex () {
      const airData = this.$store.getters.getAirData
      this.airQualityColorHex = airData.data.data.indexes.baqi.color
    },

    setLoader (param) {
      this.loading = param
    }
  }
}
</script>

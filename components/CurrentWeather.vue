<template lang="pug">
  span
    v-list-item(two-line='')
      v-list-item-content
        v-list-item-title.headline Gradiska
        v-list-item-subtitle {{ currentDatetime }}h,
        v-list-item-subtitle {{ weatherInfo }}

    v-card-text
      v-row(align='center')
        v-col.display-3(cols='6')
          span {{ currentTemp }}&deg;C
          v-subheader.ml-0.pl-0(inset title='Temperature feels like') Feels Like &nbsp; {{ tempFeelsLike }}&deg;C

        v-col(cols='6')
          v-img(:src='weatherIconPath' :alt='weatherIcon' width='125')

    v-list-item
      v-list-item-icon.mr-2
        v-icon.wind-direction(title='Wind Direction' :style='rotationStyles') mdi-arrow-up-bold-circle-outline
      v-list-item-subtitle(title='Wind Speed') {{ windSpeed }} km/h

      v-list-item-icon.mr-2
        v-icon(title='Wind Gust') mdi-weather-windy
      v-list-item-subtitle(title='Wind Gust') {{ windGust }} km/h

    v-list-item
      v-list-item-icon.mr-2
        v-icon(title='Humidity') mdi-water-percent
      v-list-item-subtitle(title='Humidity') {{ humidity }}%

      v-list-item-icon.mr-2
        v-icon(title='Precipitation') mdi-weather-rainy
      v-list-item-subtitle(title='Precipitation') {{ precipitation }}%

    v-list-item
      v-list-item-icon.mr-2
        v-icon(title='Pressure') mdi-thermometer-lines
      v-list-item-subtitle(title='Pressure') {{ pressure }} mb

      v-list-item-icon.mr-2
        v-icon(title='Dew Point') mdi-thermometer
      v-list-item-subtitle(title='Dew Point') {{ dewPoint }}&deg;C

    v-list-item
      v-list-item-icon.mr-2
        v-icon(title='Cloud Cover') mdi-weather-cloudy
      v-list-item-subtitle(title='Cloud Cover') {{ cloudCover }} %

      v-list-item-icon.mr-2
        v-icon(title='Visibility') mdi-eye
      v-list-item-subtitle(title='Visibility') {{ visibility }} km
</template>

<script>
export default {
  name: 'CurrentWeather',
  data () {
    return {
      weatherData: null,
      currentDatetime: null,
      weatherInfo: null,
      currentTemp: null,
      windSpeed: null,
      windGust: null,
      windDirection: null,
      rotationStyles: {
        transform: null
      },
      tempFeelsLike: null,
      weatherIcon: null,
      weatherIconPath: '',
      humidity: null,
      precipitation: null,
      pressure: null,
      dewPoint: null,
      cloudCover: null,
      visibility: null
    }
  },

  created () {
    this.setWeatherData(this.$store.getters.getWeatherData)
  },

  mounted () {
    this.getDatetime()
    this.getWeatherText()
    this.getCurrentTemp()
    this.getTempFeelsLike()
    this.setWeatherIcon()
    this.setWeatherIconPath()
    this.getWindSpeed()
    this.getWindGust()
    this.getWindDirection()
    this.getHumidity()
    this.getPrecipitation()
    this.getPressure()
    this.getDewPoint()
    this.getCloudCover()
    this.getVisibility()
  },

  methods: {
    setWeatherData (data) {
      this.weatherData = data.data
    },

    getDatetime () {
      const datetime = new Date(this.weatherData.datetime)
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

      const hours = (datetime.getHours() <= 9) ? '0' + datetime.getHours() : datetime.getHours()
      const min = (datetime.getMinutes() <= 9) ? '0' + datetime.getMinutes() : datetime.getMinutes()

      this.currentDatetime = `${days[datetime.getDay()]}, ${hours}:${min}`
    },

    getWeatherText () {
      this.weatherInfo = this.weatherData.weather_text
    },

    getCurrentTemp () {
      this.currentTemp = Math.round(this.weatherData.temperature.value)
    },

    getTempFeelsLike () {
      this.tempFeelsLike = Math.round(this.weatherData.feels_like_temperature.value)
    },

    getWindSpeed () {
      this.windSpeed = this.weatherData.wind.speed.value.toFixed(1)
    },

    getWindGust () {
      this.windGust = this.weatherData.wind_gust.value.toFixed(1)
    },

    getWindDirection () {
      this.windDirection = this.weatherData.wind.direction

      this.rotationStyles = {
        transform: `rotate(-${this.windDirection}deg)`
      }
    },

    getHumidity () {
      this.humidity = this.weatherData.relative_humidity
    },

    getPrecipitation () {
      this.precipitation = this.weatherData.precipitation.precipitation_probability
    },

    getPressure () {
      this.pressure = this.weatherData.pressure.value
    },

    getDewPoint () {
      this.dewPoint = this.weatherData.dew_point.value.toFixed(1)
    },

    getCloudCover () {
      this.cloudCover = this.weatherData.cloud_cover
    },

    getVisibility () {
      this.visibility = Math.round(this.weatherData.visibility.value)
    },

    setWeatherIcon () {
      switch (this.weatherData.icon_code) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
          this.weatherIcon = 'sun'
          break

        case 7:
        case 8:
        case 9:
          this.weatherIcon = 'cloudy'
          break

        case 10:
        case 11:
        case 12:
          this.weatherIcon = 'storm'
          break

        case 13:
        case 14:
        case 15:
          this.weatherIcon = 'haze-1'
          break

        case 16:
        case 17:
        case 18:
          this.weatherIcon = 'haze'
          break

        case 19:
        case 20:
        case 21:
        case 22:
          this.weatherIcon = 'cloud'
          break

        case 23:
        case 25:
        case 27:
        case 28:
        case 30:
        case 31:
          this.weatherIcon = 'rain'
          break

        case 24:
        case 26:
        case 29:
        case 32:
          this.weatherIcon = 'snowing'
          break

        case 33:
          this.weatherIcon = 'rain-1'
          break

        case 34:
        case 35:
          this.weatherIcon = 'snowing-1'
          break
      }
    },

    setWeatherIconPath () {
      this.weatherIconPath = require(`~/assets/weather-icons/${this.weatherIcon}.svg`)
    }
  }
}
</script>

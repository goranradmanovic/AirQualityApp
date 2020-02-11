<template lang="pug">
  span
    v-list-item(two-line='')
      v-list-item-content
        v-list-item-title.headline Gradiska
        v-list-item-subtitle {{ sensorName }}
        v-list-item-subtitle {{ currentDatetime }}h, &nbsp;
          span(:style='qualityColor') {{ airQualityText }}
        v-list-item-subtitle Dominant Pollutant: &nbsp;
          span.font-weight-bold {{ dominantPullutant }}

    v-card-text.mb-7
      v-row(align='center' justify='center')
        v-col.display-3(cols='12' align='center' justify='center')
          v-img(:src='scaleImage' alt='Air Quality scale' width='175' style='max-width: unset')

            svg.gauge__dot(:style='rotationStyles' xmlns='http://www.w3.org/2000/svg')
              circle(:fill='qualityColor.color' cx='19' cy='46' r='5.203' stroke='#fff' stroke-width='2.668' style='transition-duration: 0.3s;')

            p.airQualityNumber(:style='qualityColor') {{ airQualityNumber }}

    v-slider.mx-4(v-model='airQualityNumber' thumb-label='always' :color='qualityColor.color' track-color='#EFEFEF' readonly)
      template(v-slot:prepend)
        v-img(:src='CO2Image' alt='Air CO2' width='35' style='max-width: unset' title='Poor Air')

      template(v-slot:append)
        v-img(:src='leafImage' alt='Leaf' width='35' style='max-width: unset' title='Excelent Air')
</template>

<script>

export default {
  name: 'AirQuality',
  data: () => ({
    airData: null,
    sensorName: null,
    currentDatetime: null,
    scaleImage: require('~/assets/images/scale.svg'),
    leafImage: require('~/assets/images/leaf.svg'),
    CO2Image: require('~/assets/images/co2.svg'),
    qualityColor: {
      color: ''
    },
    airQualityText: null,
    dominantPullutant: null,
    rotationStyles: {
      transform: null
    },
    airQualityNumber: null,
    labels: ['0', '20', '40', '60', '80', '100']
  }),
  created () {
    this.setAirData(this.$store.getters.getAirData)
  },

  mounted () {
    this.getDatetime()
    this.getAriQuality()
    this.getSensorName()
    this.getAriQualityNumber()
    this.getAirQulityColor()
    this.getAriQualityRotationNumber()
    this.getAriDominantPollutant()
  },

  methods: {

    setAirData (data) {
      this.airData = data.data
    },

    getDatetime () {
      const datetime = new Date(this.airData.metadata.timestamp)
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

      const hours = (datetime.getHours() <= 9) ? '0' + datetime.getHours() : datetime.getHours()
      const min = (datetime.getMinutes() <= 9) ? '0' + datetime.getMinutes() : datetime.getMinutes()

      this.currentDatetime = `${days[datetime.getDay()]}, ${hours}:${min}`
    },

    getAriQuality () {
      this.airQualityText = this.airData.data.indexes.baqi.category
    },

    getSensorName () {
      this.sensorName = this.airData.data.indexes.baqi.display_name
    },

    getAriQualityNumber () {
      this.airQualityNumber = this.airData.data.indexes.baqi.aqi_display
    },

    getAirQulityColor () {
      this.qualityColor = {
        color: this.airData.data.indexes.baqi.color
      }
    },

    inRange (x, min, max) {
      return x >= min && x <= max
    },

    getAriQualityRotationNumber () {
      let deg = null
      const aqi = this.airData.data.indexes.baqi.aqi

      switch (true) {
        case (this.inRange(aqi, 0, 5)):
          deg = -80
          break

        case (this.inRange(aqi, 6, 10)):
          deg = -64.73
          break

        case (this.inRange(aqi, 11, 15)):
          deg = -49.46
          break

        case (this.inRange(aqi, 16, 20)):
          deg = -34.19
          break

        case (this.inRange(aqi, 21, 25)):
          deg = -18.92
          break

        case (this.inRange(aqi, 26, 30)):
          deg = -3.65
          break

        case (this.inRange(aqi, 31, 35)):
          deg = 11.62
          break

        case (this.inRange(aqi, 36, 40)):
          deg = 26.89
          break

        case (this.inRange(aqi, 41, 45)):
          deg = 42.16
          break

        case (this.inRange(aqi, 46, 50)):
          deg = 57.43
          break

        case (this.inRange(aqi, 51, 55)):
          deg = 72.7
          break

        case (this.inRange(aqi, 56, 60)):
          deg = 87.97
          break

        case (this.inRange(aqi, 61, 65)):
          deg = 103.24
          break

        case (this.inRange(aqi, 66, 70)):
          deg = 118.51
          break

        case (this.inRange(aqi, 71, 75)):
          deg = 133.78
          break

        case (this.inRange(aqi, 76, 80)):
          deg = 149.05
          break

        case (this.inRange(aqi, 81, 85)):
          deg = 164.32
          break

        case (this.inRange(aqi, 86, 90)):
          deg = 179.59
          break

        case (this.inRange(aqi, 91, 95)):
          deg = 194.86
          break

        case (this.inRange(aqi, 96, 100)):
          deg = 195
          break
        default:
      }

      this.rotationStyles = {
        transform: `rotate(${deg}deg)`
      }
    },

    getAriDominantPollutant () {
      if (this.airData.data.pollutants.hasOwnProperty(this.airData.data.indexes.baqi.dominant_pollutant)) {
        this.dominantPullutant = this.airData.data.pollutants[this.airData.data.indexes.baqi.dominant_pollutant].full_name
      }
    }
  }
}
</script>

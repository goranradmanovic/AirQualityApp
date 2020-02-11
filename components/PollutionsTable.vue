<template lang="pug">
  v-card
    v-tabs.elevation-2(background-color='grey lighten-4' centered grow show-arrows)
      v-tabs-slider
      v-tab.d-inline-flex.flex-column(v-for='(value, index) in pollutants' :key='index' :href='`#tab-${index}`' :class='[index == 0 ? "red--text" : ""]')
        div {{ value.display_name }}
        div
          span.mr-1.overline.text-lowercase {{ value.concentration.value }}
          span.overline.text-lowercase {{ value.concentration.units }}

      v-tab-item(v-for='(value, index) in pollutants' :key='index' :value="'tab-' + index")
        v-card(flat='' tile='')
          v-card-text
            h2.mb-3 {{ value.full_name }}

            div
              p.text--primary.font-weight-medium Sources
              p {{ value.sources_and_effects.sources }}

            v-divider

            div.mt-4
              p.text--primary.font-weight-medium Effects
              p {{ value.sources_and_effects.effects }}
</template>

<script>
export default {
  name: 'PollutionsTable',
  data () {
    return {
      airData: null,
      pollutants: []
    }
  },

  created () {
    this.setAirData(this.$store.getters.getAirData)
  },

  mounted () {
    this.setPollutantsData()
    this.addSortID()
    this.sortDominantPollutants()
  },

  methods: {
    setAirData (data) {
      this.airData = data.data
    },

    setPollutantsData () {
      this.pollutants = this.airData.data.pollutants
    },

    addSortID () {
      for (let i = 0; i < Object.keys(this.pollutants).length; i++) {
        this.pollutants[Object.keys(this.pollutants)[i]].sort_id = 0
      }

      if (this.pollutants.hasOwnProperty(this.airData.data.indexes.baqi.dominant_pollutant)) {
        this.pollutants[this.airData.data.indexes.baqi.dominant_pollutant].sort_id = 3
      }

      if (this.pollutants.hasOwnProperty('pm25')) {
        this.pollutants.pm25.sort_id = 2
      }

      if (this.pollutants.hasOwnProperty('pm10')) {
        this.pollutants.pm10.sort_id = 1
      }
    },

    sortDominantPollutants () {
      const tempArr = []

      for (let i = 0; i < Object.keys(this.pollutants).length; i++) {
        tempArr.push(this.pollutants[Object.keys(this.pollutants)[i]])
      }

      tempArr.sort((a, b) => {
        if (a.sort_id === b.sort_id) { return 0 }
        if (a.sort_id >= b.sort_id) { return -1 }
        if (a.sort_id <= b.sort_id) { return 1 }
      })

      this.pollutants = tempArr
    }
  }
}
</script>

<template lang="pug">
  v-card
    v-tabs.elevation-2(background-color='grey lighten-4' centered grow show-arrows)
      v-tabs-slider
      v-tab(v-for='(value, index) in tabs' :key='index' :href='`#tab-${index}`')
        v-img(:src='getTabIcon(value.icon)' :alt='value.icon' width='30' height='30' contain :title='value.name')

      v-tab-item(v-for='(value, propertyName, index) in healthRecommendations' :key='index' :value="'tab-' + index")
        v-card(flat='' tile='')
          v-card-text {{ value }}
</template>

<script>
export default {
  name: 'HealthRecommendationstable',
  data () {
    return {
      healthRecommendations: null,
      tabs: [
        {
          name: 'General',
          icon: 'general.svg'
        },
        {
          name: 'Elderly',
          icon: 'elderly.svg'
        },
        {
          name: 'Asthma',
          icon: 'lung.svg'
        },
        {
          name: 'Heart',
          icon: 'heart.svg'
        },

        {
          name: 'Active',
          icon: 'active.svg'
        },
        {
          name: 'Pregnant',
          icon: 'pregnant.svg'
        },
        {
          name: 'Children',
          icon: 'children.svg'
        }
      ]
    }
  },

  created () {
    this.setHealthRecommendations(this.$store.getters.getAirData)
  },

  methods: {

    setHealthRecommendations (data) {
      this.healthRecommendations = data.data.data.health_recommendations
    },

    getTabIcon (icon) {
      return require(`~/assets/images/${icon}`)
    }
  }
}
</script>

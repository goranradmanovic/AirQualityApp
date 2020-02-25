<template lang="pug">
  v-overlay(:value='loading' opacity='0.9')
    v-progress-circular(indeterminate size='64')
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'Loader',
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

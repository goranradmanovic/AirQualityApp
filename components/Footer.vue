<template lang="pug">
  v-footer(padless='')
    v-card.text-center(flat='' tile='' width='100%')
      v-divider
      v-card-text.grey--text
        p &copy; Copyright {{ new Date().getFullYear() }}
        p Designed & Developed By &nbsp;
          v-btn(text small href='https://goranradmanovic.github.io/' target='_blank') Goran Radmanovic

      v-card-text
        v-btn.mx-4(v-for='(value, index) in icons' :key='index' icon='' :href='value.link' :target='value.target')
          v-icon(size='24px') {{ value.icon }}
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    icons: [
      {
        link: 'mailto:goranradmanovic@gmail.com',
        icon: 'mdi-email',
        target: ''
      },
      {
        link: 'https://www.linkedin.com/in/goran-radmanovic-70814a9b/',
        icon: 'mdi-linkedin',
        target: '_blank'
      },
      {
        link: 'https://twitter.com/GoranRadmanovic',
        icon: 'mdi-twitter',
        target: '_blank'
      }
    ]
  })
}
</script>

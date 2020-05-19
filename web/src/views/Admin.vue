<template>

  <v-app>
    <TravelReport :notices="notices" :publicView="false" />
  </v-app>

</template>

<script>

  import TravelReport from '../components/TravelReport'
  import urls from '../urls'
  export default {
    name: 'App',
    components: {
      TravelReport
    },

    data: () => ({
      notices: []
      //
    }),
    mounted: function() {
      this.$api.get(urls.getNotices).then(response => {
        this.notices = response.data
      })
    }
  }

</script>

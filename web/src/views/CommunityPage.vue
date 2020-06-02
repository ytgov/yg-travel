<template>

  <v-app>
    <v-card style="padding: 15px;">
      <CommunityReport :notices="notices" :community="this.$route.params.community" :publicView="false" />
    </v-card>
    <br />
    <v-card style="padding: 15px;">
      <EmailManager :community="this.$route.params.community" />
    </v-card>

  </v-app>

</template>

<script>

  import CommunityReport from '../components/CommunityReport.vue'
  import EmailManager from '../components/EmailManager.vue'
  import urls from '../urls'
  export default {
    name: 'App',
    components: {
      CommunityReport,
      EmailManager
    },

    data: () => ({
      notices: []
      //
    }),
    mounted: function() {
      this.community = this.$route.params.community
      this.$api.get(urls.getNoticesByCommunity + this.community).then(response => {
        this.notices = response.data
      })
    }
  }

</script>

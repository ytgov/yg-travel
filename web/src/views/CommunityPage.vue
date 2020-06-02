<template>

  <v-app>
    <v-card style="padding: 5px 0px;">
      <CommunityReport :community="this.$route.params.community"/>
    </v-card>
    <br />
    <v-card style="padding: 5px 0px;">
      <EmailManager :community="this.$route.params.community" />
    </v-card>

  </v-app>

</template>

<script>

  import CommunityReport from '../components/CommunityReport.vue'
  import EmailManager from '../components/EmailManager.vue'
  export default {
    name: 'App',
    components: {
      CommunityReport,
      EmailManager
    },
    mounted: function() {
      this.community = this.$route.params.community
    }
  }

</script>

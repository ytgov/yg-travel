<template>
  <v-app>
    <v-toolbar-title>{{this.CommunityName}} Report</v-toolbar-title>
    <br>
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
    data: () => ({
      CommunityName: ''
    }),
    mounted: function() {
      this.community = this.$route.params.community
      this.CommunityName = this.properCase(this.community.split('-').join(' '))
    },
    methods: {
      properCase(string) {
        return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
      }
    }
  }

</script>

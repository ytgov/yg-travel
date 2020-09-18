<template>
  <v-app>
    <v-toolbar-title>{{this.scopeName}} Report</v-toolbar-title>
    <br>
    <v-card style="padding: 5px 0px;">
      <Report :scope="this.$route.params.scope"/>
    </v-card>
    <br />
    <v-card style="padding: 5px 0px;">
      <EmailManager :scope="this.$route.params.scope"/>
    </v-card>

  </v-app>

</template>

<script>

  import Report from '../components/Report.vue'
  import EmailManager from '../components/EmailManager.vue'
  export default {
    name: 'App',
    components: {
      Report,
      EmailManager
    },
    data: () => ({
      scopeName: '',
    }),
    mounted: function() {
      if(this.$route.params.scope) {
        this.scope = this.$route.params.scope
      } else {
        this.scope = 'Rollup'
      }
      this.scopeName = this.properCase(this.scope.split('-').join(' '))
    },
    methods: {
      properCase(string) {
        return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
      }
    }
  }

</script>

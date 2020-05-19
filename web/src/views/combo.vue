<template>
  <v-app>
        <v-tabs>
          <v-tab>Form</v-tab>
          <v-tab-item>
            <TravelForm/>
          </v-tab-item>
          <v-tab @click="loadNotices">Reports</v-tab>
          <v-tab-item>
            <TravelReport
                :notices="notices" :publicView="true"/>
          </v-tab-item>
        </v-tabs>
      </v-app>
</template>

<script>
import TravelForm from '../components/TravelForm'
import TravelReport from '../components/TravelReport'
import urls from '../urls'
export default {
  name: 'App',
  components: {
    TravelForm,
    TravelReport
  },

  data: () => ({
      notices: []
    //
  }),
  methods: {
    loadNotices: function () {
      this.$api.get(urls.getNotices).then(response => {
        this.notices = response.data
      })
    }
  }
};
</script>

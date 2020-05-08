<template>
  <v-app>
        <v-tabs>
          <v-tab>Form</v-tab>
          <v-tab-item>
            <TravelForm/>
          </v-tab-item>
          <v-tab @click="loadNotices">Reports</v-tab>
          <v-tab-item>
            <AdminPage
                :notices="notices"/>
          </v-tab-item>
        </v-tabs>
      </v-app>
</template>

<script>
import TravelForm from '../components/TravelForm'
import AdminPage from '../components/AdminPage'
import urls from '../urls'
export default {
  name: 'App',
  components: {
    TravelForm,
    AdminPage
  },

  data: () => ({
      notices: []
    //
  }),
  methods: {
    loadNotices: function () {
      console.log("Is loading")
      this.$api.get(urls.getNotices).then(response => {
      console.log(response.data)
      this.notices = response.data
      })
    }
  }
};
</script>

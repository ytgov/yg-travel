<template>
  <v-app>
        <v-tabs>
          <v-tab>Form</v-tab>
          <v-tab-item>
            <TravelForm/>
          </v-tab-item>
          <v-tab>Reports</v-tab>
          <v-tab-item>
            <AdminPage/>
          </v-tab-item>
        </v-tabs>
      </v-app>
</template>

<script>
import TravelForm from '../components/TravelForm'
import AdminPage from '../components/AdminPage'
export default {
  name: 'App',
  components: {
    TravelForm,
    AdminPage
  },

  data: () => ({
    //
  }),
};
</script>

<template>
  <v-app>
    <v-app-bar app color="#4a263c" dark hide-on-scroll>
      <div class="d-flex align-center">
        <v-img
        contain
        src="./img/wildlife.png"
        width="160"
        />
        Single Site Work
      </div>
    </v-app-bar>
    <v-container style="padding: 56px 0px 0px;">
      <v-app>
        <v-tabs>
          <v-tab>Admin Tab</v-tab>
          <v-tab-item>
            <AdminPage/>
          </v-tab-item>
          <v-tab>Form</v-tab>
          <v-tab-item>
            <TravelForm/>
          </v-tab-item>
        </v-tabs>
      </v-app>
    </v-container>
  </v-app>
</template>

<script>
import TravelForm from './components/TravelForm'
import AdminPage from './components/AdminPage'
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

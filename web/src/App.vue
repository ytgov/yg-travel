<template>
  <v-app>
    <v-app-bar app color="#4a263c" dark>
      <div class="d-flex align-center title">
        <v-img
        contain
        src="./img/wildlife.png"
        width="160"
        />
        YG Travel Form
      </div>
      <v-spacer />

       <v-dialog
      v-model="showFAQ">
      <template v-slot:activator="{ on }">
        <v-btn
         icon
          v-on="on"
        >
          <v-icon>
          mdi-help-circle-outline
      </v-icon>
        </v-btn>
      </template>
      <v-row justify="center" md-3>
      <faq
        @close="showFAQ=false" />
        </v-row>
    </v-dialog>
    </v-app-bar>
    <v-container style="padding: 75px 0px 0px;">
      <v-app>
          <router-view></router-view>
      </v-app>
    </v-container>
  </v-app>
</template>

<script>
import faq from "./components/faq"
export default {
  name: 'App',
  components: {
      faq
  },
  data: () => ({
    showFAQ: false
    //
  }),
};
</script>

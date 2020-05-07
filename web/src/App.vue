<template>
  <v-app>
    <v-app-bar app color="#4a263c" dark hide-on-scroll>
      <div class="d-flex align-center title">
        <v-img
        contain
        src="./img/wildlife.png"
        width="160"
        />
        YG Travel Form
      </div>
    </v-app-bar>
    <v-container style="padding: 56px 0px 0px;">
      <v-app>
          <router-view></router-view>
      </v-app>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },

  data: () => ({
    //
  }),
};
</script>

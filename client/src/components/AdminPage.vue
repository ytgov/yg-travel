<template>
  <div>
    <v-row v-for="notice in notices" v-bind:key="notice.id">
      {{notice}}
    </v-row>
  </div>
</template>

<script>
import urls from '../urls'
export default {
  data: () => ({
    notices: []
  }),
  methods: {
  },
  mounted: function() {
    this.$api.get(urls.getNotices).then(response => {this.notices = response.data})
  }
}
</script>

<style>

</style>

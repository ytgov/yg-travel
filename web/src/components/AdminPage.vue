<template>
  <div>
    
    <v-data-table
    :headers="headers"
    :items="notices"
    :items-per-page="5"
    class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
import urls from '../urls'
export default {
  data: () => ({
    notices: [],
    headers: [
      { text: 'Department', value: 'departmnet', sortable: true },
      { text: 'Program Manager', value: 'name' },
     
      { text: 'Email', value: 'email' },
      { text: 'Phone Number', value: 'phone' },
      { text: 'Destination', value: 'destination' },
      { text: 'Purpose', value: 'purpose', align:"center" },
      { text: 'Travellers', value: 'travellers' },
      { text: 'Arrival', value: 'arrivaldate',align:"center" },
      { text: 'Departure', value: 'returndate',align:"center" },
      { text: 'First Nation', value: 'fncontact', align:"center" },
      { text: 'Municipality', value: 'mucontact', align:"center" },
      { text: 'Other Contacted', value: 'othercontact', align:"center" },
    ],
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

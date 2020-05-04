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
      {
        text: 'Travel Notices',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Name', value: 'name' },
      { text: 'Emal', value: 'email' },
      { text: 'Phone Number', value: 'phone' },
      { text: 'Destination', value: 'destination' },
      { text: 'Reason for Travel', value: 'purpose' },
      { text: 'Nbr of Travellers', value: 'travellers' },
      { text: 'Arrival Date', value: 'arrivalDate' },
      { text: 'Departure Date', value: 'returnDate' },
      { text: 'Comunity Contacted', value: 'contactedCommunity' },
      { text: 'Requires Assistance', value: 'requireAssistance' },
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

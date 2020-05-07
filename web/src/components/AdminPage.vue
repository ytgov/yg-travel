<template>
  <div>
    <v-data-table
    :headers="headers"
    :items="notices"
    :items-per-page="5"
    class="elevation-1"
    >
    <template v-slot:item.arrivaldate="{ item }">
                  {{item.arrivaldate.substr(0, 10)}}
    </template>
     <template v-slot:item.returndate="{ item }">
                  {{item.returndate.substr(0, 10)}}
    </template>
    </v-data-table>
  </div>
</template>

<script>
import urls from '../urls'
export default {
  name: 'AdminPage',
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
      { text: 'Arrival', value: 'arrivaldate',align:"center",  width: "150" },
      { text: 'Departure', value: 'returndate',align:"center", width: "150"  },
      { text: 'First Nation Contacted', value: 'fncontact', align:"center" },
      { text: 'Municipality Contracted', value: 'mucontact', align:"center" },
      { text: 'Other', value: 'othercontact', align:"center" },
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

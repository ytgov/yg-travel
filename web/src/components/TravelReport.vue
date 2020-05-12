<template>

  <div>
    <v-row>
      <v-btn-toggle v-model="dateRange"
                    color="deep- purple accent-3"
                    group>
        <v-btn value="week">
          Week
        </v-btn>
        <v-btn value="month">
          Month
        </v-btn>
        <v-btn value="year">
          Year
        </v-btn>
      </v-btn-toggle>
    </v-row>
    <v-data-table :headers="computedHeaders"
                  :items="displayedNotices"
                  class="elevation-1"></v-data-table>
  </div>

</template>

<script>

  //import urls from '../urls'
  import moment from 'moment'
  export default {
    props: {
      notices: Array,
      publicView: Boolean
    },
    name: 'AdminPage',
    data: () => ({
      dateRange: 'week',
      headers: [
        { text: 'Department', value: 'department', sortable: true },
        { text: 'Program Manager', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Phone Number', value: 'phone' },
        { text: 'Destination', value: 'destination' },
        { text: 'Purpose', value: 'purpose', align: 'center' },
        { text: 'Travellers', value: 'travellers' },
        { text: 'Arrival', value: 'arrivaldate', align: 'center', width: '150' },
        { text: 'Departure', value: 'returndate', align: 'center', width: '150' },
        { text: 'First Nation Contacted', value: 'fncontact', align: 'center' },
        { text: 'Municipality Contracted', value: 'mucontact', align: 'center' },
        { text: 'Other', value: 'othercontact', align: 'center' },
        { text: 'Group Name', value: 'othercontactinfo', align: 'center' }
      ]
    }),

    computed: {
      displayedNotices() {
        var cutoffDate = moment()
        if (this.dateRange == 'week') cutoffDate.add(1, 'week')
        else if (this.dateRange == 'month') cutoffDate.add(1, 'month')
        else cutoffDate.add(1, 'year')
        return this.notices.filter(notice => moment(notice.arrivaldate, 'YYYY-MM-DD').isBefore(cutoffDate))
      },
      computedHeaders() {
        if(this.publicView)
          return this.headers.filter(header => {
            return header.value != 'purpose'
          })
        return this.headers
      }
    },
    methods: {
    }
  }

</script>

<style>

</style>

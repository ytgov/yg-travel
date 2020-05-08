<template>
  <div>
    <v-radio-group v-model="dateRange" v-on:change="filterNoticesByDate()">
      <v-row>
        <v-col>
          <v-radio
          :label="'This Week'"
          :value="'week'"
          ></v-radio>
        </v-col>
        <v-col>
          <v-radio
          :label="'This Month'"
          :value="'month'"
          ></v-radio>
        </v-col>
        <v-col>
          <v-radio
          :label="'All'"
          :value="'year'"
          ></v-radio>
        </v-col>
      </v-row>
    </v-radio-group>

    <v-data-table
    :headers="headers"
    :items="displayedNotices"
    :items-per-page="5"
    class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
import urls from '../urls'
import moment from 'moment'
export default {
  name: 'AdminPage',
  data: () => ({
    notices: [],
    displayedNotices: [],
    dateRange: 'week',
    headers: [
      { text: 'Department', value: 'department', sortable: true },
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
      { text: 'Group Name', value: 'othercontactinfo', align:"center" }
    ],
  }),
  methods: {
    filterNoticesByDate(){
      var cutoffDate = moment()
      if(this.dateRange='week') cutoffDate.add(1,'week')
      else if(this.dateRange='month') cutoffDate.add(1, 'month')
      else cutoffDate.add(1, 'year')
      this.displayedNotices = this.notices.filter(notice => moment(notice.arrivaldate, 'YYYY-MM-DD').isBefore(cutoffDate))
    }
  },
  mounted: function() {
    this.$api.get(urls.getNotices).then(response => {
      this.notices = response.data
    })
    this.filterNoticesByDate()
  }
}
</script>

<style>

</style>

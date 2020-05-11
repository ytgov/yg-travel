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
<<<<<<< HEAD
    <v-data-table :headers="computedHeaders"
=======
    <v-data-table :headers="headers"
>>>>>>> cleaning up
                  :items="displayedNotices"
                  class="elevation-1"></v-data-table>
  </div>

</template>

<script>

  //import urls from '../urls'
  import moment from 'moment'
  export default {
    props: {
<<<<<<< HEAD
      notices: Array,
      publicView: Boolean
=======
      notices: Array
>>>>>>> cleaning up
    },
    name: 'AdminPage',
    data: () => ({
      //displayedNotices: [],
      dateRange: 'week',
      headers: [
        { text: 'Department', value: 'department', sortable: true },
        { text: 'Program Manager', value: 'name' },
<<<<<<< HEAD
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
    },
    mounted: function() {
=======

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
        return this.notices
        //this.formatDates()
        // var cutoffDate = moment()
        // if(this.dateRange=='week') cutoffDate.add(1,'week')
        // else if(this.dateRange=='month') cutoffDate.add(1, 'month')
        // else cutoffDate.add(1, 'year')
        // return this.notices.filter(notice => moment(notice.arrivaldate, 'YYYY-MM-DD').isBefore(cutoffDate))
      }
    },

    methods: {
      // formatDates(){
      //   this.notices = this.notices.map(notice => {
      //     notice.arrivaldate = moment(notice.arrivaldate).format('DD-MM-YYYY')
      //     notice.returndate = moment(notice.returndate).format('DD-MM-YYYY')
      //     return notice
      //   })
      // }
      /* filterNoticesByDate(){
      var cutoffDate = moment()
      if(this.dateRange=='week') cutoffDate.add(1,'week')
      else if(this.dateRange=='month') cutoffDate.add(1, 'month')
      else cutoffDate.add(1, 'year')
      this.displayedNotices = this.notices.filter(notice => moment(notice.arrivaldate, 'YYYY-MM-DD').isBefore(cutoffDate))
    }*/
    },
    mounted: function() {
      //this.$api.get(urls.getNotices).then(response => {
      //  this.notices = response.data
      //  this.filterNoticesByDate()
      //})
>>>>>>> cleaning up
    }
  }

</script>

<style>

</style>

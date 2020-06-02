<template>

  <v-container>
    <v-row>
      <v-btn-toggle v-model="dateRange"
                    color="deep- purple accent-3"
                    group
                    mandatory>
        <v-btn value="week">Week</v-btn>
        <v-btn value="month">Month</v-btn>
        <v-btn value="year">Year</v-btn>
        <v-btn value="current">Current Trips</v-btn>
        <v-btn value="past">Past Trips</v-btn>
      </v-btn-toggle>
    </v-row>

    <v-data-table :headers="headers"
                  :items="displayedNotices"
                  :expanded.sync="expanded"
                  item-key="id"
                  show-expand
                  show-select
                  class="elevation-1"
                  v-model="selected">
      <template v-slot:top>
             <v-toolbar flat>
               <v-toolbar-title>Travel Notices</v-toolbar-title>
             </v-toolbar>
           </template>
      <template v-slot:expanded-item="{ headers, item }">
             <td :colspan="headers.length">
               Purpose: {{item.purpose}}<br>
               Contacted First Nation: {{item.contactedFirstNation}}<br>
               Contacted Municipality: {{item.contactedMunicipality}}<br>
               Contacted Other Group: {{item.contactedOtherGroup}}<br>
               Other Group Contact Info: {{item.otherContactInfo}}<br>
               Requries Assistance: {{item.requireAssistance}}
             </td>
           </template>
    </v-data-table>
    <div class="text-right" style="padding: 5px 0px;">
      <v-btn value="remove" @click='deleteNotices' class="white--text" color='#dc4404'>
        Remove Selected Requets
      </v-btn>
    </div>
  </v-container>

</template>

<script>
  import urls from '../urls'
  import moment from 'moment'
  export default {
    props: {
      community: String
    },
    components: {},
    name: 'TravelReport',
    data: () => ({
      notices: [],
      expanded: [],
      singleExpand: false,
      dateRange: 'week',
      selected: [],
      headers: [
        { text: 'Department', value: 'department', sortable: true },
        { text: 'Program Manager', value: 'name' },
        { text: 'Destination', value: 'destination' },
        { text: 'Travellers', value: 'travellers' },
        { text: 'Arrival', value: 'arrivalDateDisplay', align: 'center', width: '150' },
        { text: 'Departure', value: 'returnDateDisplay', align: 'center', width: '150' }
      ]
    }),
    computed: {
      displayedNotices() {
        var formattedNotices = []
        var cutoffDate = moment()
        if (this.dateRange == 'week') cutoffDate.add(1, 'week')
        else if (this.dateRange == 'month') cutoffDate.add(1, 'month')
        else cutoffDate.add(1, 'year')
        formattedNotices = this.notices.map(notice => {
          notice.arrivalDateDisplay = moment(notice.arrivalDate).format('LL')
          notice.returnDateDisplay = moment(notice.returnDate).format('LL')
          notice.destination = notice.destination.toString().split(',').join(', ')
          return notice
        })
        return formattedNotices.filter(notice => {
          if( this.dateRange == 'past') {
            //this needs to be a bit reworked
            return (
              moment(notice.returnDate, 'YYYY-MM-DD').isBefore(moment().subtract(1, "days"))
            )
          } else if( this.dateRange.trim() == 'current') {
            return (
              moment(notice.arrivalDate, 'YYYY-MM-DD').isSameOrBefore(moment()) &&
              moment(notice.returnDate, 'YYYY-MM-DD').isSameOrAfter(moment().subtract(1, "days"))
            )
          } else {
            return (
              moment(notice.arrivalDate, 'YYYY-MM-DD').isBefore(cutoffDate) &&
              moment(notice.returnDate, 'YYYY-MM-DD').isAfter(moment().subtract(1, "days"))
            )
          }
        })
      },
      computedHeaders() {
        if (this.publicView)
          return this.headers.filter(header => {
            return header.value != 'purpose'
          })
        return this.headers
      }
    },
    methods: {
      deleteNotices() {
        this.selected.forEach( entry => {
          this.$api.post(urls.deleteNotice, entry).then(this.getNotices())
        })
      },
      getNotices() {
        this.$api.get(urls.getNoticesByCommunity + this.community).then(response => {
          this.notices = response.data
        })
      }
    },
    mounted: function(){
      this.getNotices()
    }
  }

</script>

<style>

</style>

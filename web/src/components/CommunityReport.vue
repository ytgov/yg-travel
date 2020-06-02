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

    <v-data-table :headers="headers"
                  :items="displayedNotices"
                  :expanded.sync="expanded"
                  item-key="name"
                  show-expand
                  class="elevation-1">
      <template v-slot:top>
           <v-toolbar flat>
             <v-toolbar-title>{{community}}</v-toolbar-title>
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

  </div>

</template>

<script>

  import moment from 'moment'
  export default {
    props: {
      notices: Array,
      publicView: Boolean,
      community: String
    },
    components: {},
    name: 'TravelReport',
    data: () => ({
      expanded: [],
      singleExpand: false,
      dateRange: 'week',

      headers: [
        { text: 'Department', value: 'department', sortable: true },
        { text: 'Program Manager', value: 'name' },
        { text: 'Destination', value: 'destination' },
        { text: 'Travellers', value: 'travellers' },
        { text: 'Arrival', value: 'arrivalDateDisplay', align: 'center', width: '150' },
        { text: 'Departure', value: 'returnDateDisplay', align: 'center', width: '150' },
      ]
    }),

    computed: {
      displayedNotices() {
        var formattedNotices = []
        var cutoffDate = moment()
        if (this.dateRange == 'week') cutoffDate.add(1, 'week')
        else if (this.dateRange == 'month') cutoffDate.add(1, 'month')
        else cutoffDate.add(1, 'year')
        formattedNotices = this.notices.map( notice => {
          notice.arrivalDateDisplay = moment(notice.arrivalDate).format('LL')
          notice.returnDateDisplay = moment(notice.returnDate).format('LL')
          return notice
        })
        return formattedNotices.filter(notice => moment(notice.arrivalDate, 'YYYY-MM-DD').isBefore(cutoffDate))
      },
      computedHeaders() {
        if (this.publicView)
          return this.headers.filter(header => {
            return header.value != 'purpose'
          })
        return this.headers
      }
    },
    methods: {}
  }

</script>

<style>

</style>

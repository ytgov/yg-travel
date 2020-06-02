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
    <!-- <v-data-table :headers="computedHeaders"
                    :items="displayedNotices"
                    class="elevation-1"
                    show-select
                    show-expand>
      </v-data-table> -->

    <v-data-table :headers="headers"
                  :items="displayedNotices"
                  :expanded.sync="expanded"
                  item-key="name"
                  show-expand
                  class="elevation-1">
      <template v-slot:top>
           <v-toolbar flat>
             <v-toolbar-title>Expandable Table</v-toolbar-title>
             <v-spacer></v-spacer>
             <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>
           </v-toolbar>
         </template>
      <template v-slot:expanded-item="{ headers, item }">
           <td :colspan="headers.length">
             Purpose: {{item.purpose}}
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

      // { text: 'Destination', value: 'destination' },
      // { text: 'Purpose', value: 'purpose', align: 'center' },
      // { text: 'Travellers', value: 'travellers' },
      // { text: 'Arrival', value: 'arrivalDate', align: 'center', width: '150' },
      // { text: 'Departure', value: 'returnDate', align: 'center', width: '150' },
      // { text: 'First Nation Contacted', value: 'contactedFirstNation', align: 'center' },
      // { text: 'Municipality Contracted', value: 'contactedMunicipality', align: 'center' },
      // { text: 'Other', value: 'contactedOtherGroup', align: 'center' },
      // { text: 'Group Name', value: 'otherContactInfo', align: 'center' }
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

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
                  class="elevation-1"
                  :custom-sort="customSort"></v-data-table>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    props: {
      notices: Array,
      publicView: Boolean
    },
    components: {
    },
    name: 'TravelReport',
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
        { text: 'Arrival', value: 'arrivalDate', align: 'center', width: '150' },
        { text: 'Departure', value: 'returnDate', align: 'center', width: '150' },
        { text: 'First Nation Contacted', value: 'contactedFirstNation', align: 'center' },
        { text: 'Municipality Contracted', value: 'contactedMunicipality', align: 'center' },
        { text: 'Other', value: 'contactedOtherGroup', align: 'center' },
        { text: 'Group Name', value: 'otherGroupInfo', align: 'center' }
      ]
    }),

    computed: {
      displayedNotices() {
        var cutoffDate = moment()
        if (this.dateRange == 'week') cutoffDate.add(1, 'week')
        else if (this.dateRange == 'month') cutoffDate.add(1, 'month')
        else cutoffDate.add(1, 'year')
        return this.notices.filter(notice => moment(notice.arrivalDate, 'YYYY-MM-DD').isBefore(cutoffDate))
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
      customSort: function(items, index, isDesc) {
        items.sort((a, b) => {
            if (index[0]=='arrivalDate' || index[0]=='returnDate') {
              if (!isDesc[0]) {
                  return new Date(b[index]) - new Date(a[index]);
              } else {
                  return new Date(a[index]) - new Date(b[index]);
              }
            }
            else {
              if(typeof a[index] !== 'undefined'){
                if (!isDesc[0]) {
                   return a[index].toLowerCase().localeCompare(b[index].toLowerCase());
                }
                else {
                    return b[index].toLowerCase().localeCompare(a[index].toLowerCase());
                }
              }
            }
        });
        return items;
      }
    }
  }

</script>

<style>

</style>

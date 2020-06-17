<template>
  <v-container>
    <v-toolbar-title>Travel Notices</v-toolbar-title>
    <v-row style="padding: 0px 5px;">
      <v-btn-toggle v-model="dateRange"
                    color="accent-3"
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
      <template v-slot:item.name="{ item }">
        <div :class="requiresAssistance(item)">
          {{item.name}}
        </div>
      </template>
      <template v-slot:item.department="{ item }">
        <div :class="requiresAssistance(item)">
          {{item.department}}
        </div>
      </template>
      <template v-slot:item.destination="{ item }">
        <div :class="requiresAssistance(item)">
          {{item.destination}}
        </div>
      </template>
      <template v-slot:item.travellers="{ item }">
        <div :class="requiresAssistance(item)">
          {{item.travellers}}
        </div>
      </template>
      <template v-slot:item.arrivalDateDisplay="{ item }">
        <div :class="requiresAssistance(item)">
          {{item.arrivalDateDisplay}}
        </div>
      </template>
      <template v-slot:item.returnDateDisplay="{ item }">
        <div :class="requiresAssistance(item)">
          {{item.returnDateDisplay}}
        </div>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row>
            <v-col>
            Purpose: {{item.purpose}}
            </v-col>
            <v-col>
              Contacted First Nation: {{item.contactedFirstNation | booleanToUser}}<br>
              Contacted Municipality: {{item.contactedMunicipality | booleanToUser}}<br>
              Contacted Other Group: {{item.contactedOtherGroup | booleanToUser}}<br>
              <div v-show="item.contactedOtherGroup == true">
                Other Group Contact Info: {{item.otherContactInfo}}<br>
              </div>
              <div :class="requiresAssistance(item)">
                Requries Assistance: {{item.requireAssistance | booleanToUser}}
              </div>
            </v-col>
          </v-row>
          <br>
        </td>
      </template>
    </v-data-table>
    <div class="text-right" style="padding: 5px 0px;">
      <v-btn value="print" @click='printSection' class="white--text" color='#244c58'>
        Print Selected
      </v-btn>
      <v-btn value="toggle" @click='toggleNoticeFlags' class="white--text" color='#ffa500'>
        Toggle Flag
      </v-btn>
      <v-btn value="remove" @click='deleteNotices' class="white--text" color='#dc4404'>
        Remove Selected Requets
      </v-btn>
    </div>

    <div id="printSection" v-show="false">
      <h2>Travel Notices for {{scopeName}}</h2>
      <div style="display: block; margin-before: 0.5em; margin-after: 0.5em; margin-start: auto; margin-end: auto; overflow: hidden; border-style: inset; border-width: 1px;"></div>
      <div v-for="entry in selected" :key="entry.id">
        <p>
          Name: {{entry.name}}<br>
          Department: {{entry.department}}<br>
          Destination: {{entry.destination}}<br>
          # of Travellers:{{entry.travellers}}<br>
          Arrival Date: {{entry.arrivalDate}}<br>
          Return Date: {{entry.returnDate}}<br>
          Contacted First Nation: {{entry.contactedFirstNation}}<br>
          Contacted Municipality: {{entry.contactedMunicipality}}<br>
          Contacted Other Group: {{entry.contactedOtherGroup}}<br>
          Other Group Contact Info: {{entry.otherContactInfo}}<br>
          Requries Assistance: {{entry.requireAssistance}}
        </p>
        <p>
          Purpose: {{entry.purpose}}
        </p>
        <div style="display: block; margin-before: 0.5em; margin-after: 0.5em; margin-start: auto; margin-end: auto; overflow: hidden; border-style: inset; border-width: 1px;"></div>
      </div>
    </div>

  </v-container>

</template>

<script>

  import urls from '../urls'
  import moment from 'moment'
  export default {
    props: {
      scope: String
    },
    components: {},
    name: 'TravelReport',
    data: () => ({
      scopeName: '',
      notices: [],
      expanded: [],
      singleExpand: false,
      dateRange: 'week',
      selected: [],
      headers: [
        { text: 'Department', value: 'department', sortable: true },
        { text: 'Program Manager', value: 'name' },
        { text: 'Destination', value: 'destination' },
        { text: '# of Travellers', value: 'travellers' },
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
          notice.destination = notice.destination
            .toString()
            .split(',')
            .join(', ')
          return notice
        })
        return formattedNotices.filter(notice => {
          if (this.dateRange == 'past') {
            //this needs to be a bit reworked
            return moment(notice.returnDate, 'YYYY-MM-DD').isBefore(moment().subtract(1, 'days'))
          } else if (this.dateRange.trim() == 'current') {
            return (
              moment(notice.arrivalDate, 'YYYY-MM-DD').isSameOrBefore(moment()) &&
              moment(notice.returnDate, 'YYYY-MM-DD').isSameOrAfter(moment().subtract(1, 'days'))
            )
          } else {
            return (
              moment(notice.arrivalDate, 'YYYY-MM-DD').isBefore(cutoffDate) &&
              moment(notice.returnDate, 'YYYY-MM-DD').isAfter(moment().subtract(1, 'days'))
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
      properCase(string) {
        return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
      },
      deleteNotices() {
        this.selected.forEach(entry => {
          this.$api.post(urls.deleteNotice, entry)
          this.notices.splice(this.notices.findIndex(notice => notice.id == entry.id),1)
        })
      },
      toggleNoticeFlags() {
        this.selected.forEach(entry => {
          entry.requireAssistance = !entry.requireAssistance
          this.$api.post(urls.flagNotice, entry)
        })
      },
      getNotices() {
        if(this.type == 'community'){
          this.$api.get(urls.getNoticesByCommunity + this.scope).then(response => {
            this.notices = response.data
          })
        } else if(this.type == 'department'){
          this.$api.get(urls.getNoticesByDepartment + this.scope).then(response => {
            this.notices = response.data
          })
        }
      },
      printSection() {
        this.$htmlToPaper('printSection')
      },
      requiresAssistance(notice){
        if(notice.requireAssistance == true) return 'requireAssistance'
      },
      getTypeFromRoute(){
        if(this.$route.name.search("Community")!=-1) this.type = 'community'
        else if(this.$route.name.search("Department")!=-1) this.type = 'department'
      }
    },
    filters: {
      booleanToUser: function (value) {
        if (value) return 'Yes'
        else return 'No'
      }
    },
    mounted: function() {
      this.getTypeFromRoute()
      this.getNotices()
      this.reportName = this.properCase(this.scope.split('-').join(' '))
    }
  }

</script>

<style>
  .requireAssistance{
    color: red;
  }
</style>

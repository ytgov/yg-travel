<template>
    <v-btn value="print" @click='printSection' class="white--text" color='#244c58'>
      Print Selected
      <div id="printSection" v-show="false">
        <h2>Travel Notices for {{scopeName}}</h2>
        <div style="display: block; margin-before: 0.5em; margin-after: 0.5em; margin-start: auto; margin-end: auto; overflow: hidden; border-style: inset; border-width: 1px;"></div>
        <div v-for="entry in notices" :key="entry.id">
          Name: {{entry.name}}<br>
          Department: {{entry.department}}<br>
          Destination: {{entry.destination}}<br>
          # of Travellers:{{entry.travellers}}<br>
          Arrival Date: {{entry.arrivalDate | formatDate}}<br>
          Return Date: {{entry.returnDate | formatDate}}<br>
          Contacted First Nation: {{entry.contactedFirstNation | booleanToUser}}<br>
          Contacted Municipality: {{entry.contactedMunicipality | booleanToUser}}<br>
          Contacted Other Group: {{entry.contactedOtherGroup | booleanToUser}}<br>
          <div v-show="entry.contactedOtherGroup == true">
            Other Contact: {{entry.otherContactInfo}}<br>
          </div>
          <div :class="requiresAssistance(entry)">
            Requries Assistance: {{entry.requireAssistance | booleanToUser}}
          </div>
          Purpose: {{entry.purpose}}
          <div style="display: block; margin-before: 0.5em; margin-after: 0.5em; margin-start: auto; margin-end: auto; overflow: hidden; border-style: inset; border-width: 1px;"></div>
        </div>
      </div>
    </v-btn>
</template>
<script>
  import moment from 'moment'
  export default {
    props: {
      notices: Array,
      scopeName: String
    },
    components: {
    },
    name: 'PrintReport',
    data: () => ({
    }),
    computed: {
    },
    methods: {
      printSection() {
        this.$htmlToPaper('printSection')
      },
      requiresAssistance(notice){
        if(notice.requireAssistance == true) return 'requireAssistance'
      }
    },
    filters: {
      formatDate: function(date){
          return moment(date).format('LL')
      },
      booleanToUser: function(value){
        if (value) return 'Yes'
        else return 'No'
      }
    },
    mounted: function() {
    }
  }

</script>

<style>
  .requireAssistance{
    color: red;
  }
</style>

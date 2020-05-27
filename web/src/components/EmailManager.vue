<template>

  <v-container>
    {{community}}
    <v-row>
      <v-col>
        <v-text-field label="Email" required filled md="2"></v-text-field>
      </v-col>
      <v-col>
        <v-select label="Frequency"
                  :items="options"
                  filled></v-select>
      </v-col>
      <v-col>
        <v-btn color="#6f9d2a" class="white--text">Add
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
  import urls from '../urls'
  export default {
    name: 'EmailManager',
    data: () => ({
      options: ['Immediately', 'Weekly', 'Both']
    }),
    props: {
      community: String
    },
    methods: {
      getEmails(){
        this.$api.get().then(response => {

        })
      }
    },
    filters: {},
    mounted: function() {}
  }

</script>

<style>

  .travelForm {
    margin: 15px;
  }
  .calendar {
    margin: 15px;
  }

</style>

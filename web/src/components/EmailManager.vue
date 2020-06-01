<template>
  <v-container>
    <v-card style="padding: 15px;">
      Email Notifications
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Email</th>
              <th class="text-left">Frequency</th>
              <th class="text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in entries" :key="entry.id">
              <td>{{ entry.email }}</td>
              <td>{{ entry.frequency }}</td>
              <v-btn icon color="red" v-on:click="deleteEmail(entry)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-row>
        <v-col>
          <v-text-field label="Email" required filled md="2" v-model="subscribe.email"></v-text-field>
        </v-col>
        <v-col>
          <v-select label="Frequency"
                    :items="options"
                    v-model="subscribe.frequency"
                    :rules="emailRules"
                    filled></v-select>
        </v-col>
        <v-col>
          <v-btn color="#ffa500" class="white--text" @click="addEmail">Add
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

  </v-container>

</template>

<script>
  import urls from '../urls'
  export default {
    name: 'EmailManager',
    props: {
      community: String
    },
    data: () => ({
      options: ['Immediately', 'Weekly', 'Both'],
      entries: [],
      subscribe: {
        email: '',
        frequency: ''
      },
      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],

    }),
    methods: {
      getEmails() {
        this.$api.get(urls.getEmailsByCommunity + this.community).then(response => {
          this.entries = response.data
        })
      },
      addEmail() {
        this.subscribe.community = this.community
        this.$api.post(urls.createEmail, this.subscribe).then(() => {this.getEmails()})
      },
      deleteEmail(entry) {
        this.$api.post(urls.deleteEmail, entry).then(() => {this.getEmails()})
      }
    },
    filters: {},
    mounted: function() {
      this.getEmails()
    }
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

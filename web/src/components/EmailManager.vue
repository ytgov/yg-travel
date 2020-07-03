<template>

  <v-container>
    <v-toolbar-title>Email Notifications</v-toolbar-title>
    <v-simple-table>
      <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Email</th>
                <th class="text-left">Frequency</th>
                <th class="text-right">Remove</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="entry in entries" :key="entry.id">
                <td>{{ entry.email }}</td>
                <td>{{ entry.frequency }}</td>
                <td class="text-right">
                <v-btn icon color="red" v-on:click="deleteEmail(entry)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
    </v-simple-table>
    <v-divider></v-divider>
    <br>
    <v-form lazy-validation ref="form">
      <v-row>
        <v-col>
          <v-text-field label="Email"
                        required
                        filled
                        v-model="subscribe.email"
                        :rules="emailRules"></v-text-field>
        </v-col>
        <v-col>
          <v-select label="Frequency"
                    :items="options"
                    v-model="subscribe.frequency"
                    :rules="requiredField"
                    filled></v-select>
        </v-col>
      </v-row>
      <div class="text-right">
        <v-btn color="#6f9d2a" class="white--text" @click="addEmail">Add
        </v-btn>
      </div>
    </v-form>
  </v-container>

</template>

<script>
  import urls from '../urls'
  export default {
    name: 'EmailManager',
    props: {
      scope: String
    },
    data: () => ({
      options: ['Immediately', 'Weekly', 'Both'],
      entries: [],
      subscribe: {
        email: '',
        frequency: ''
      },
      requiredField: [v => !!v || 'This field is required'],
      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid']
    }),
    methods: {
      properCase(string) {
        return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
      },
      getEmails() {
        if(this.type == 'community'){
          this.$api.get(urls.getEmailsByCommunity + this.scope).then(response => {
            this.entries = response.data
          })
        } else if(this.type == 'department'){
          this.$api.get(urls.getEmailsByDepartment + this.scope).then(response => {
            this.entries = response.data
          })
        }
      },
      addEmail() {
        if(this.$refs.form.validate()){
          this.subscribe.value = this.properCase(this.scope.split('-').join(' '))
          this.subscribe.type = this.type
          this.$api.post(urls.createEmail, this.subscribe).then(() => {
            this.getEmails()
          })
        }
      },
      deleteEmail(entry) {
        this.$api.post(urls.deleteEmail, entry).then(() => {
          this.getEmails()
        })
      },
      getTypeFromRoute(){
        if(this.$route.name.search("Community")!=-1) this.type = 'community'
        else if(this.$route.name.search("Department")!=-1) this.type = 'department'
      }
    },
    filters: {},
    mounted: function() {
      this.getTypeFromRoute()
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

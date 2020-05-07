<template>
  <v-container>
    <v-row>
      <v-col md="6">
        <v-form v-model="valid" lazy-validation ref="form">
          
          <v-card md="6">
            
            <v-toolbar
              color="#DC4405"
              dark>
              <v-toolbar-title>Program Manager</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-row>
                <v-col >
                  <v-text-field
                  label="Name"
                  v-model="name"
                  :rules="nameRules"
                  required
                  filled
                  md="2"
                  ></v-text-field>

                  <v-text-field
                  label="Email"
                  v-model="email"
                  :rules="emailRules"
                  required
                  filled
                  ></v-text-field>
                  
                  <v-text-field
                  label="Department"
                  v-model="department"
                  :rules="requiredField"
                  required
                  filled
                  ></v-text-field>
                  
                  <v-text-field
                  label="Phone Number"
                  v-model="phone"
                  :rules="requiredField"
                  required
                  filled
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-row>
            <v-col>
              <v-card md="6">
                <v-toolbar
              color="#244C5A"
              dark>
              <v-toolbar-title>Travel Details</v-toolbar-title>
              </v-toolbar>
              <v-card-text> 
                <v-select
                  label="Travel Locations"
                  :items="communities"
                  item-text="name"
                  item-value="id"
                  :rules="requiredField"
                  v-model="selectedCommunity"
                  filled
                ></v-select>
                
                <v-textarea :rules="requiredField" v-model="purpose" auto-grow label="Purpose for Travel" filled></v-textarea>

                <v-text-field
                label="Number of travellers"
                v-model="travellers"
                type="number"
                :rules="requiredField"
                filled
                ></v-text-field>
                <v-row>
                    <v-col>
                        <div class="body-1">When do you plan on arriving and departing the community? </div>
                    </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-menu v-model="arrivalDate" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                      <template v-slot:activator="{ on }">
                        <v-text-field filled v-model="date" label="Arival Date" readonly v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="date" @input="arrivalDate = false" color="#4a263c"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col>
                    <v-menu v-model="departureDate" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                      <template v-slot:activator="{ on }">
                        <v-text-field filled v-model="date2" label="Return Date" readonly v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="date2" @input="departureDate = false" color="#4a263c"></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-card-text>
              </v-card>

            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card md="6">
                <v-toolbar
                  color="#F2A900"
                  dark>
                  <v-toolbar-title>Travel Checklist</v-toolbar-title>
                </v-toolbar>
                <v-card-text> 
                  <a href="hss-covid-workplace-health-safety.pdf">Covid Workplace Health and Safety</a>
                  <v-checkbox
                    label="I have read the Safety Declerations"
                    v-model="readTerms"
                    :rules="requiredField"
                  ></v-checkbox>
                  <v-switch 
                    label="I have contacted the community about my travel plans."
                    v-model="contactedCommunity"
                  />
                  <div  v-if="contactedCommunity" class="body-1 pl-3">
                    Who have you contacted?
                  </div>
                  <v-checkbox
                    v-if="contactedCommunity"
                    label="First Nation"
                    v-model="fncontact"
                    class="pl-5"
                  ></v-checkbox>
                  <v-checkbox
                  v-if="contactedCommunity"
                  label="Municipality"
                  v-model="mucontact"
                  class="pl-5"
                  ></v-checkbox>
                  <v-checkbox
                  v-if="contactedCommunity"
                  label="Other"
                  v-model="othercontact"
                  class="pl-5"
                  ></v-checkbox>

                  <v-checkbox
                  v-if="!contactedCommunity"
                  label="I require assistance connecting with the community."
                  v-model="requireAssistance"
                  ></v-checkbox>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
    
      <v-btn :disabled="!valid" color="#6f9d2a" class="white--text" @click="validate">Submit
      </v-btn>
    </v-form>

    <v-snackbar v-model="snackbar">
      {{ snackText }}
      <v-btn color="#ffa500" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import urls from '../urls'
import { v4 as uuidv4 } from 'uuid';
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 10),
    name: '',
    email: '',
    phone: '',
    destination: '',
    department: '',
    purpose: '',
    travellers: '',
    readTerms: '',
    othercontact: false,
    mucontact: false,
    fncontact: false,
    selectedCommunity: null,
    communities: [],
    selectedCommunityGroup: null,
    communityGroups: [],
    arrivalDate: null,
    departureDate: null,
    contactedCommunity: false,
    requireAssistance: false,
    valid: false,
    requiredField: [
      v => !!v || 'This field is required'
    ],
    nameRules: [
      v => !!v || 'Name is required'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    travellerRules: [
      v => !!v || 'This field is required'
    ],
    phoneRules: [
      //v => /^[2-9]\d{2}-\d{3}-\d{4}$/.test(v) || 'Phone Number must be valid'
    ],
    arrivalRules: [
      v => v <= this.date2 || 'This date must be before the return date'
    ],
    departureRules: [
      v => v >= this.date1 || 'This date must be after the return date'
    ],
    snackbar: false,
    snackText: ''
  }),
  methods: {
    recover(code){
      this.$api.get(urls.getNotice+code).then(response => {
        if(Object.keys(response.data).length !== 0){
          this.name = response.data[0].name
          this.email = response.data[0].email
          this.phone = response.data[0].phone
          this.selectedCommunity = response.data[0].destination
          this.purpose = response.data[0].purpose
          this.travellers = response.data[0].travellers
          this.date = response.data[0].arrivalDate.substr(0, 10)
          this.date2 = response.data[0].returnDate.substr(0, 10)
          this.selectedCommunityGroup = response.data[0].contactedCommunity
          if(this.selectedCommunityGroup === 0) this.contactedCommunity = false
          else this.contactedCommunity = true
          this.requireAssistance = response.data[0].requireAssistance
          this.code = response.data[0].code
          this.readTerms=true
        }
      })
    },
    submit(){
      if(this.contactedCommunity) this.requireAssistance = false
      else this.selectedCommunityGroup = 0
      this.$api.post(urls.createNotice,{
        name: this.name,
        email: this.email,
        phone: this.phone,
        destination: this.selectedCommunity,
        purpose: this.purpose,
        travellers: this.travellers,
        arrivalDate: this.date,
        returnDate: this.date2,
        contactedCommunity: this.selectedCommunityGroup,
        requireAssistance: this.requireAssistance,
        code: uuidv4()
      })
      .then(response => {
        this.snackText = "Form submitted successfully"
        this.snackbar = true
        console.log(response)
      })
      .catch(e => {
        this.snackText = "Failed to submit form"
        this.snackbar = true
        console.log(e)
      })
    },
    validate(){
      if (this.$refs.form.validate()) {
        this.submit()
      }
    }
  },
  mounted: function () {
    this.$api.get(urls.communities).then(response => {this.communities = response.data})
    this.$api.get(urls.communityGroups).then(response => {this.communityGroups = response.data})
    //this.recover('a0de1871-7565-4841-9f0d-935bdca9584f')
  }
}
</script>

<style>
.travelForm{
  margin: 15px;
}
.calendar{
  margin: 15px;
}
</style>

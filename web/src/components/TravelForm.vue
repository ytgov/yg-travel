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
                v-model="form.name"
                :rules="nameRules"
                required
                filled
                md="2"
                ></v-text-field>

                <v-text-field
                label="Email"
                v-model="form.email"
                :rules="emailRules"
                required
                filled
                ></v-text-field>

                <v-select
                label="Department"
                :items="departments"
                item-text="name"
                :rules="requiredField"
                v-model="form.department"
                filled
                ></v-select>


                <v-text-field
                label="Phone Number"
                v-model="form.phone"
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
              :rules="requiredField"
              v-model="form.destination"
              filled
              ></v-select>

              <v-textarea
              :rules="requiredField"
              v-model="form.purpose"
              auto-grow
              label="Purpose for Travel"
              filled
              ></v-textarea>

              <v-text-field
              label="Number of travellers"
              v-model="form.travellers"
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
                  <v-menu v-model="form.date" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field filled v-model="form.arrivalDate" label="Arival Date" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="form.arrivalDate" @input="form.date = false" color="#4a263c"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col>
                  <v-menu v-model="form.date2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field filled v-model="form.returnDate" label="Return Date" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="form.returnDate" @input="form.date2 = false" color="#4a263c"></v-date-picker>
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
            label="I have read the Safety Declarations"
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
            v-model="form.fncontact"
            class="pl-5"
            ></v-checkbox>
            <v-checkbox
            v-if="contactedCommunity"
            label="Municipality"
            v-model="form.mucontact"
            class="pl-5"
            ></v-checkbox>
            <v-checkbox
            v-if="contactedCommunity"
            label="Other"
            v-model="form.othercontact"
            class="pl-5"
            ></v-checkbox>
            <v-text-field
            v-if="form.othercontact"
            label="Which community have you contacted?"
            v-model="form.otherContactInfo"
            :rules="requiredField"
            filled
            ></v-text-field>

            <v-checkbox
            v-if="!contactedCommunity"
            label="I require assistance connecting with the community."
            v-model="form.requireAssistance"
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
export default {
  name: 'TravelForm',
  data: () => ({
    date1: null,
    date2: null,
    valid: false,
    resubmit: false,
    form: {
      name: '',
      email: '',
      phone: '',
      destination: '',
      department: '',
      purpose: '',
      travellers: '',
      othercontact: false,
      mucontact: false,
      fncontact: false,
      otherContactInfo: '',
      arrivalDate: new Date().toISOString().substr(0, 10),
      returnDate: new Date().toISOString().substr(0, 10),
      requireAssistance: false
    },
    formDefault : {},
    departments: [],
    readTerms: false,
    contactedCommunity: false,
    communities: [],
    communityGroups: [],
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
    returnRules: [
      v => v >= this.date1 || 'This date must be after the return date'
    ],
    snackbar: false,
    snackText: ''
  }),
  methods: {
    createCode(){
      return [...Array(8)].map(~~(Math.random()*36)).toString(36).join('')
    },
    initialState(){
      this.$refs.form.resetValidation()
      this.readTerms = false
      return {
        name: '',
        email: '',
        phone: '',
        destination: '',
        department: '',
        purpose: '',
        travellers: '',
        othercontact: false,
        mucontact: false,
        fncontact: false,
        otherContactInfo: '',
        arrivalDate: new Date().toISOString().substr(0, 10),
        returnDate: new Date().toISOString().substr(0, 10),
        requireAssistance: false
      }
    },
    recover(code){
      this.$api.get(urls.getNotice+code).then(response => {
        if(Object.keys(response.data).length !== 0){
          this.resubmit = true;

          this.form.name = response.data[0].name
          this.form.email = response.data[0].email
          this.form.phone = response.data[0].phone
          this.form.department = response.data[0].department
          this.form.destination = response.data[0].destination
          this.form.purpose = response.data[0].purpose
          this.form.travellers = response.data[0].travellers
          this.form.arrivalDate = response.data[0].arrivaldate.substr(0, 10)
          this.form.returnDate = response.data[0].returndate.substr(0, 10)
          this.form.requireAssistance = response.data[0].requireassistance
          this.form.othercontact = response.data[0].othercontact
          this.form.mucontact = response.data[0].mucontact
          this.form.fncontact = response.data[0].fncontact
          this.form.otherContactInfo = response.data[0].othercontactinfo
          this.form.code = response.data[0].code

          //remap this

          if(this.othercontact || this.form.fncontact) this.contactedCommunity = true
          this.readTerms = true;
        } else {
          return ''
        }
      })
    },
    submit(){
      // if(this.contactedCommunity) this.requireAssistance = false
      // else this.selectedCommunityGroup = 0
      if(this.form.code && this.form.code.length > 0){
        this.$api.post(urls.updateNotice, this.form)
        .then(() => {
          this.snackText = "Form updated successfully"
          this.snackbar = true
          this.form = this.initialState()
        })
        .catch(e => {
          this.snackText = "Failed to update form"
          this.snackbar = true
          console.log(e)
        })
      } else {
        this.form.code=this.createCode()
        this.$api.post(urls.createNotice, this.form)
        .then(() => {
          this.snackText = "Form submitted successfully"
          this.snackbar = true
          this.form = this.initialState()
        })
        .catch(e => {
          this.snackText = "Failed to submit form"
          this.snackbar = true
          console.log(e)
        })
      }
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
    this.$api.get(urls.departments).then(response => {this.departments = response.data})
    this.recover(this.$route.params.code)
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

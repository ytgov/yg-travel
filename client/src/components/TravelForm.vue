<template>
  <v-container class=travelForm>
    <v-form v-model="valid" lazy-validation ref="form">
      Travel Form
      <v-text-field
      label="Name"
      v-model="name"
      :rules="nameRules"
      required
      filled
      ></v-text-field>

      <v-text-field
      label="Email"
      v-model="email"
      :rules="emailRules"
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

      <v-textarea :rules="requiredField" v-model="purpose" auto-grow label="Purpose for Travel" filled></v-textarea>

      <v-select
      label="Travel Locations"
      :items="communities"
      item-text="name"
      item-value="id"
      :rules="requiredField"
      v-model="selectedCommunity"
      filled
      ></v-select>

      <v-text-field
      label="Number of people going"
      v-model="travellers"
      type="number"
      :rules="requiredField"
      single-line
      filled
      ></v-text-field>

      <v-menu v-model="arrivalDate" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
        <template v-slot:activator="{ on }">
          <v-text-field filled v-model="date" label="Arival Date" readonly v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="arrivalDate = false" color="#4a263c"></v-date-picker>
      </v-menu>

      <v-menu v-model="departureDate" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
        <template v-slot:activator="{ on }">
          <v-text-field filled v-model="date2" label="Return Date" readonly v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="date2" @input="departureDate = false" color="#4a263c"></v-date-picker>
      </v-menu>

      <a href="hss-covid-workplace-health-safety.pdf">Covid Workplace Health and Safety</a>
      <v-checkbox
      label="I have read the Safety Declerations"
      v-model="readTerms"
      :rules="requiredField"
      ></v-checkbox>

      <v-checkbox
      label="I have contacted the community about my travel plans"
      v-model="contactedCommunity"
      ></v-checkbox>

      <v-select
      v-if="contactedCommunity"
      label="Which Community?"
      :items="communityGroups"
      item-text="name"
      item-value="id"
      v-model="selectedCommunityGroup"
      :rules="requiredField"
      ></v-select>

      <v-checkbox
      v-if="!contactedCommunity"
      label="I require assistance connecting with the community"
      v-model="requireAssistance"
      ></v-checkbox>

      <v-btn :disabled="!valid" color="success" @click="validate">Submit
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import urls from '../urls'
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 10),
    name: '',
    email: '',
    phone: '',
    destination: '',
    purpose: '',
    travellers: '',
    readTerms: '',
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
    ]
  }),
  methods: {
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
        requireAssistance: false,
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

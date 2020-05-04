<template>
  <div>
    Travel Form
    <v-text-field
    label="Name"
    v-model="name"
    single-line
    ></v-text-field>

    <v-text-field
    label="Email"
    v-model="email"
    single-line
    ></v-text-field>

    <v-text-field
    label="Phone Number"
    v-model="phone"
    single-line
    ></v-text-field>

    <v-textarea
    v-model="purpose">
    <template v-slot:label>
      <div>
        Purpose?
      </div>
    </template>
  </v-textarea>

  <v-select
  label="Travel Locations"
  :items="communities"
  item-text="name"
  item-value="id"
  v-model="selectedCommunity"
  ></v-select>

  <v-text-field
  label="Number of people going"
  v-model="travellers"
  single-line
  ></v-text-field>

  <template>
    <v-row>
      <v-date-picker v-model="arrivalDate" color="#4a263c"></v-date-picker>
      <v-date-picker v-model="departureDate" color="#4a263c"></v-date-picker>
    </v-row>
  </template>

  <a href="hss-covid-workplace-health-safety.pdf">Covid Workplace Health and Safety</a>
  <v-checkbox
  label="I have read the Safety Declerations"
  v-model="readTerms"
  ></v-checkbox>

  <v-checkbox
  label="Have you been in contact with the community?"
  v-model="contactedCommunity"
  ></v-checkbox>

  <v-select
  v-if="contactedCommunity"
  label="Community Group"
  :items="communityGroups"
  item-text="name"
  item-value="id"
  v-model="selectedCommunityGroup"
  ></v-select>

  <v-checkbox
  v-if="!contactedCommunity"
  label="Do you need assistance connecting with the community?"
  v-model="requireAssistance"
  ></v-checkbox>

  <v-btn @click="submit()">Submit</v-btn>
</div>
</template>

<script>
import urls from '../urls'
export default {
  data: () => ({
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
  }),
  methods: {
    submit(){
      this.$api.post(urls.createNotice,{
        name: this.name,
        email: this.email,
        phone: this.phone,
        destination: this.selectedCommunity,
        purpose: this.purpose,
        travellers: this.travellers,
        arrivalDate: this.arrivalDate,
        departureDate: this.departureDate,
        contactedCommunity: this.selectedCommunityGroup,
        requireAssistance: false,
      })
    }
  },
  mounted: function () {
    this.$api.get(urls.communities).then(response => {this.communities = response.data})
    this.$api.get(urls.communityGroups).then(response => {this.communityGroups = response.data})
  }
}
</script>

<style>
.card {
  box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
  min-width: 250px;
  max-width: 300px;
  margin: 12px;
  padding:10px;
  transition: .15s all ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  a {
    text-decoration: none;
    padding: 12px;
    color: #03A9F4;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      height: 100px;
    }
    small {
      font-size: 10px;
      padding: 4px;
    }
  }
}

.wrapper {
  display: flex;
  max-width: 100%;
  flex-wrap: wrap;
  padding-top: 12px;
  align-items: center;
  justify-content: left;
}
</style>

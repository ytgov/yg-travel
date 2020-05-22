<template>

  <v-container>
    <v-row>
      <v-col md="8">
        <v-form v-model="valid" lazy-validation ref="form">

          <v-card md="8">

            <v-toolbar color="#DC4405" dark>
              <v-toolbar-title>Program Manager</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field label="Name"
                                v-model="form.name"
                                :rules="nameRules"
                                required
                                filled
                                md="2"></v-text-field>

                  <v-text-field label="Email"
                                v-model="form.email"
                                :rules="emailRules"
                                required
                                filled></v-text-field>

                  <v-select label="Department"
                            :items="departments"
                            item-text="name"
                            :rules="requiredField"
                            v-model="form.department"
                            filled></v-select>

                  <v-text-field label="Business Phone"
                                v-model="form.phone"
                                :rules="requiredField"
                                required
                                filled></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-row>
            <v-col>
              <v-card md="6">
                <v-toolbar color="#244C5A" dark>
                  <v-toolbar-title>Travel Details</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-combobox v-model="form.destination"
                              :items="communities"
                              label="Travel Locations"
                              filled
                              multiple></v-combobox>

                  <v-textarea :rules="requiredField"
                              v-model="form.purpose"
                              auto-grow
                              label="Purpose for Travel"
                              filled></v-textarea>

                  <v-text-field label="Number of travellers"
                                v-model="form.travellers"
                                type="number"
                                :rules="requiredField"
                                filled></v-text-field>
                  <v-row>
                    <v-col>
                      <div class="body-1">When do you plan on arriving and departing the community? </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-menu v-model="date1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on }">
                          <v-text-field filled v-model="form.arrivalDate" label="Arival Date" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="form.arrivalDate" @input="date1 = false" color="#4a263c"></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col>
                      <v-menu v-model="date2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on }">
                          <v-text-field filled v-model="form.returnDate" label="Return Date" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="form.returnDate" @input="date2 = false" color="#4a263c"></v-date-picker>
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
                <v-toolbar color="#F2A900" dark>
                  <v-toolbar-title>Travel Checklist</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <a href="eco-guidelines-delivery-critical-essential-other-services-covid-19-may-8-2020-final.pdf"> Guidelines for the Delivery of Critical, Essential and Other Services</a>
                  <v-checkbox label="I have read the Safety Declarations"
                              v-model="readTerms"
                              :rules="requiredField"></v-checkbox>
                  <v-switch label="I have contacted the community about my travel plans." v-model="contactedCommunity" />
                  <div v-if="contactedCommunity" class="body-1 pl-3">
                    Who have you contacted?
                  </div>
                  <v-checkbox v-if="contactedCommunity"
                              label="First Nation"
                              v-model="form.contactedFirstNations"
                              class="pl-5"></v-checkbox>
                  <v-checkbox v-if="contactedCommunity"
                              label="Municipality"
                              v-model="form.contactedMunicipality"
                              class="pl-5"></v-checkbox>
                  <v-checkbox v-if="contactedCommunity"
                              label="Other"
                              v-model="form.contactedOtherGroup"
                              class="pl-5"></v-checkbox>
                  <v-text-field v-if="form.contactedOtherGroup"
                                label="Who have you contacted?"
                                v-model="form.otherContactInfo"
                                :rules="requiredField"
                                filled></v-text-field>

                  <v-checkbox v-if="!contactedCommunity"
                              label="I require assistance connecting with the community."
                              v-model="form.requireAssistance"></v-checkbox>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-card>
                <v-toolbar color="#6f9d2a" dark>
                  <v-toolbar-title>Collection Notice</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <div class="subtitle-1 font-italic font-weight-medium">
                    The information collected on this form will be shared with Yukon communities in order to inform them of who from Yukon government
                    will be entering their community and for what purpose. <br/> <br /> Avoid providing any
                    details that may identify a person or otherwise reveal confidential infomation.
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-row justify="center">
                    <v-btn :disabled="!valid" color="#6f9d2a" class="white--text" @click="validate">Submit
                    </v-btn>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-col>

          </v-row>
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
  import moment from 'moment'
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
        contactedOtherGroup: false,
        contactedMunicipality: false,
        contactedFirstNations: false,
        otherGroupInfo: '',
        arrivalDate: moment().format('YYYY-MM-DD'),
        returnDate: moment().format('YYYY-MM-DD'),
        requireAssistance: false,
        code: ''
      },
      departments: [],
      readTerms: false,
      contactedCommunity: false,
      communities: [],
      requiredField: [v => !!v || 'This field is required'],
      nameRules: [v => !!v || 'Name is required'],
      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
      travellerRules: [v => !!v || 'This field is required'],
      phoneRules: [
        //v => /^[2-9]\d{2}-\d{3}-\d{4}$/.test(v) || 'Phone Number must be valid'
      ],
      arrivalRules: [v => v <= this.date2 || 'This date must be before the return date'],
      returnRules: [v => v >= this.date1 || 'This date must be after the return date'],
      snackbar: false,
      snackText: ''
    }),
    methods: {
      createCode() {
        return Math.random()
          .toString(36)
          .slice(2)
      },
      initialState() {
        this.$refs.form.resetValidation()
        this.contactedCommunity = false
        this.readTerms = false
        return {
          name: '',
          email: '',
          phone: '',
          destination: '',
          department: '',
          purpose: '',
          travellers: '',
          contactedOtherGroup: false,
          contactedMunicipality: false,
          contactedFirstNations: false,
          otherGroupInfo: '',
          arrivalDate: moment().format('YYYY-MM-DD'),
          returnDate: moment().format('YYYY-MM-DD'),
          requireAssistance: false,
          code: ''
        }
      },
      recover(code) {
        this.$api.get(urls.getNotice + code).then(response => {
          if (Object.keys(response.data).length !== 0) {
            this.resubmit = true
            this.form = response.data[0]
            this.form.arrivalDate = moment().format('YYYY-MM-DD')
            this.form.returnDate = moment().format('YYYY-MM-DD')
            if (this.contactedMunicipality || this.form.contactedFirstNations || this.contactedOtherGroup)
              this.contactedCommunity = true

            this.readTerms = true
          } else {
            //this.$router.push('/')
            return ''
          }
        })
      },
      submit() {
        if (this.form.code && this.form.code.length > 0) {
          this.$api
            .post(urls.updateNotice, this.form)
            .then(() => {
              this.snackText = 'Form updated successfully'
              this.snackbar = true
              this.$router.push('/')
              this.form = this.initialState()
            })
            .catch(e => {
              this.snackText = 'Failed to update form'
              this.snackbar = true
              console.log(e)
            })
        } else {
          this.form.code = this.createCode()
          this.$api
            .post(urls.createNotice, this.form)
            .then(() => {
              this.snackText = 'Form submitted successfully'
              this.snackbar = true
              this.form = this.initialState()
              this.form.code = null
            })
            .catch(e => {
              this.snackText = 'Failed to submit form'
              this.snackbar = true
              this.form.code = null
              console.log(e)
            })
        }
      },
      validate() {
        if (this.$refs.form.validate()) {
          this.submit()
        }
      }
    },
    filters: {
      formatDate: function(date) {
        return moment(date).format('MMMM Do YYYY')
      }
    },
    mounted: function() {
      this.$api.get(urls.communities).then(response => {
        this.communities = response.data.map(community => {return community.name})
      })
      this.$api.get(urls.communityGroups).then(response => {
        this.communityGroups = response.data
      })
      this.$api.get(urls.departments).then(response => {
        this.departments = response.data
      })
      this.recover(this.$route.params.code)
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

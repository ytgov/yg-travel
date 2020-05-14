<template>
  <v-card>
    <v-toolbar color="#F2A900" dark>
      <v-toolbar-title class="display-2">Frequently Asked Questions</v-toolbar-title>
      <v-spacer />
                <v-btn icon @click="onClickClose">
                    <v-icon>mdi-close</v-icon>
                </v-btn>

    </v-toolbar>
    <v-card-text class="pt-5">

    <div :class="qaStyle">Q. Who is this Travel Portal for?</div>
    <div :class="qaText">
      <span :class="qaStyle">A.</span> This is for YG staff and contractors traveling to Yukon communities.  Eventually, the portal may be adapted for a broader use.
    </div>
    <div :class="qaStyle">Q. I have a last minute trip, should I still log the travel? </div>
    <div :class="qaText">
     <span :class="qaStyle">A.</span>  Yes, even if the travel needs to happen today log it in the travel portal so that the community and First Nation are aware of who is coming into their community.
    </div>
    <div :class="qaStyle">Q. How far in advance should I log my travel? </div>
    <div :class="qaText">
      <span :class="qaStyle">A. </span> For now, a weekly look out is recommended, but if there is travel booked for later in the season the system will accept it (note - editing an existing travel notice is a feature still being developed)
    </div>

    <div :class="qaStyle">Q. Does this apply to critical or essential services being carried out?</div>
    <div :class="qaText">
      <span :class="qaStyle">A. </span> Yes, Communities want to know who is coming into their community and why there are there.  This is true, regardless of the class or type of service provided.
    </div>

    <div :class="qaStyle">Q. Do we notify all communities we travel through en route?</div>
    <div :class="qaText">
      <span :class="qaStyle">A. </span>No, just your destination is sufficient.
    </div>

    <div :class="qaStyle">Q. Does this apply to community travel to Whitehorse?</div>
    <div :class="qaText">
      <span :class="qaStyle">A. </span>A. Not at this time, though we could include Whitehorse at a later date if it provides value.
    </div>
    <div :class="qaStyle">Q. I have a question that's not answered here, what do I do? </div>
    <div :class="qaText">
      <span :class="qaStyle">A.</span> Send an email to ecc.operationssection@gov.yk.ca, and a member of the ECC Operations Section will respond as soon as they can.
    </div>
    </v-card-text>
    <v-card-actions>
        <v-row justify="center">
                <v-btn color="#ffa500" text @click="onClickClose">
                Close
                </v-btn>
              </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "faq",
  data: () => ({
    titleStyle:"display-1 pb-2",
    textStyle:"",
    qaStyle: "title",
    qaText: "subtitle-2 pl-3 pb-5",
    topPadding: "pt-3"
 }),
  methods: {
    onClickClose () {
      console.log('Clicked close')
      this.$emit('close')
    }
 }
}
</script>

<style>
</style>

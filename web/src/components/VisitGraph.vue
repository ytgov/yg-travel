<template>
  <div id="chart">
    <ApexCharts type="heatmap" height="350" :options="chartOptions" :series="series"></ApexCharts>
  </div>
</template>

<script>
  import ApexCharts from 'vue-apexcharts'
  export default {
    components: {
      ApexCharts
    },
    props: {
      notices: Array
    },
    name: 'TravelChart',
    data: () => ({
      series: [
        {
          name: 'Community',
          data: [10,30,50,4]
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'heatmap'
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#008FFB'],
        title: {
          text: 'HeatMap Chart (Single color)'
        }
      }
    }),
    computed: {},
    filters: {},
    methods: {},
    mounted: function() {
      console.log(this.notices)
    }
  }
</script>

<style>

</style>

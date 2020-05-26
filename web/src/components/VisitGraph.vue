<template>

  <div id="chart">
    <ApexCharts type="heatmap" height="350" :options="chartOptions" :series="series"></ApexCharts>
  </div>

</template>

<script>
  import moment from 'moment'
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
          name: 'Whitehorse',
          data: [
            { x: 'May', y: 1 },
            { x: 'June', y: 2 }
          ]
        },
        {
          name: 'Mayo',
          data: [
            { x: 'May', y: 3 },
            { x: 'June', y: 4 }
          ]
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
    methods: {
      noticesToSeries() {
        var data = []
        //var clean = []
        this.notices.map(notice => {
          if(!data[notice.destination]) data[notice.destination] = []
          if(!data[notice.destination][notice.arrivalDate]) data[notice.destination][notice.arrivalDate] = 1
          else data[notice.destination][notice.arrivalDate]++
        })

        var cutoffDate = moment()
        if (this.dateRange == 'week') cutoffDate.add(1, 'week')
      }
    },
    mounted: function() {
      this.noticesToSeries()
    }
  }

</script>

<style>

</style>

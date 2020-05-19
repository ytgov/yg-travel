import Vue from 'vue'
import Router from 'vue-router'
import combo from '@/views/combo'
import Admin from '@/views/Admin'

import TravelReport from '@/components/TravelReport'
import TravelForm from '@/components/TravelForm'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'Combo',
            title: 'YG Travel Form',
            component: combo
        },
        {
            path: '/recover/:code',
            name: 'Update',
            title: 'Update - YG Travel Form',
            component: combo
        },
        {
            path: '/reports/:community',
            name: 'Community Report',
            component: TravelReport
        },
        {
            path: '/reports/',
            name: 'Community Reports',
            component: TravelReport
        },
        {
            path: '/form',
            name: 'Travel Form',
            title: 'YG Travel Form',
            component: TravelForm
        },
        {
            path: '/admin',
            name: 'Admin Page',
            title: 'Admin Page',
            component: Admin
        },

    ]
})

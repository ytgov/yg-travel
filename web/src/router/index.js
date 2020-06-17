import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/views/Admin'
import ReportPage from '@/views/ReportPage'

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
            component: TravelForm
        },
        {
            path: '/recover/:code',
            name: 'Update',
            title: 'Update - YG Travel Form',
            component: TravelForm
        },
        {
            path: '/reportsByCommunity/:scope',
            name: 'Community Report',
            component: ReportPage
        },
        {
            path: '/reportsByDepartment/:scope',
            name: 'Department Report',
            component: ReportPage
        },
        {
            path: '/reports',
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

import Vue              from 'vue'
import VueResource      from 'vue-resource'
import App              from './App'
import router           from './router'
import store            from './store'
import './assets/css/index.scss'

Vue.config.productionTip = false

Vue.use(VueResource)

Vue.filter('toDate', (date) => {                    // 2017年5月10日15：35
    if (date) {
        const d = new Date(date)
        const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
        const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
        return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' +
            d.getDate() + '日 ' + hours + ' : ' + minutes
    }
})

Vue.filter('to_date', (date) => {                   // 2017-5-10 at 15：35
    if (date) {
        const d = new Date(date)
        const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
        const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' +
            d.getDate() + ' ' + hours + ': ' + minutes
    }
})

Vue.filter('toTag', (arr) => {
    if (arr) {
        return arr.join('，')
    }
})

Vue.http.interceptors.push((request, next) => {
    if (window.localStorage.getItem('token')) {
        request.headers.set('authorization', 'Bearer ' + window.localStorage.getItem('token'))
    }
    next((response) => {
        if (response.status === 401) {
            store.commit('unset_user')
            router.go({name: 'login'})
        }
        return response
    })
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})

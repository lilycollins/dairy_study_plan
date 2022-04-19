// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
// 引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import  * as filters from './filter/filter.js'
import axios from 'axios'
// import stores from './store/stores'

Object.keys(filters).forEach((key) =>{
    Vue.filter(key,filters[key])
})

Vue.prototype.$axios = axios

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.config.productionTip = false
// 总线
Vue.prototype.bus = new Vue({
    data () {
      return {
        callData:{
            ServiceDirect:null,
            callId:null,         
          },  
      }
    },
    created: function () {
    },
    beforeDestroy: function () {
    },
    methods: {
    }
  })

// const store =new Vuex.Store({
//     state:{
//         count:0
//     },
//     mutations:{
//         increment(state){
//             state.count++
//         }
//     },
// })
// store.commit('increment');
// console.log(store.state.count);
// const Counter={
//     template:`<div>${ store.state.count }</div>`,
//     computed:{
//         count(){
//             return store.state.count;
//         }
//     }
// }
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    Vuex,
    // stores,
    components: { App },
    template: '<App/>'
})
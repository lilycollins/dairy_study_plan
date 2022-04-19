import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// import Login from '@/view/login'
// import Home from '@/view/index/index'
const Home = r => require.ensure([], () => r(require('@/view/index/index')), 'Home')
const Login = r => require.ensure([], () => r(require('@/view/login')), 'Login')

// 首页的子页面
const firstIndex = r => require.ensure([], () => r(require('@/view/index/first')), 'firstIndex')
const secondIndex = r => require.ensure([], () => r(require('@/view/index/second')), 'secondIndex')
const table = r => require.ensure([], () => r(require('@/view/publicComponent/table')), 'table')
const phonecall = r => require.ensure([], () => r(require('@/view/index/phonecall')), 'phonecall')
const phonecall2 = r => require.ensure([], () => r(require('@/view/index/phonecall2')), 'phonecall2')
const thirdIndex = r => require.ensure([], () => r(require('@/view/index/third')), 'thirdIndex')
Vue.use(Router)
let router= new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: Home,
            children: [
              // 第一个子链接
                {
                    path: '/first',
                    component: firstIndex,
                },
                // 第二个子链接
                {
                    path: '/second',
                    component: secondIndex
                },
                 // 第二个子链接
                 {
                    path: '/third',
                    component: thirdIndex
                },
                {
                    path: '/login',
                    name: 'login',
                    component: Login,
                },
                {
                    path: '/table',
                    name: 'table',
                    component: table,
                },
                {
                    path: '/phonecall',
                    component: phonecall,
                },
                {
                    path: '/phonecall2',
                    component: phonecall2,
                },
            ]
        },
          
    ]

})
router.beforeEach((to, from, next) => {
        next();
})
export default router;
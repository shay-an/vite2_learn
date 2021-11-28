import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home.vue'
import flex from '../views/flex.vue'

const Router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'realHome',
            meta: { title: '首页' },
            component: Home
        },
        {
            path: '/flex',
            name: 'flex',
            meta: { title: 'flex' },
            component: flex,
            props: true
        },
        {
            path: '/:msg',
            name: 'home',
            meta: { title: '首页(props测试)' },
            component: Home,
            props: true
        },
        {
            path: '/404',
            name: 'PageNotExist',
            meta: { title: '404' },
            component: () => import('../views/404.vue'),
        },
        {
            path: "/:catchAll(.*)", // 不识别的path自动匹配404
            redirect: '/404',
        },


    ]
})

export default Router
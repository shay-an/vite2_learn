import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home.vue'
import E404 from '../views/404.vue'

const Router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/:msg',
            name: 'home',
            component: Home,
            props: true
        },
        {
            path: '/404',
            name: 'PageNotExist',
            component: () => import('../views/404.vue'),
        },
        {
            path: "/:catchAll(.*)", // 不识别的path自动匹配404
            redirect: '/404',
        },


    ]
})

export default Router
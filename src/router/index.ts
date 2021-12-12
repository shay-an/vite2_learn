import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/home/index.vue'

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
            path: '/login',
            name: 'login',
            meta: { title: '登录' },
            component: () => import('../components/login-component/index.vue')
        },
        {
            path: '/huolala',
            name: 'huolala',
            meta: { title: '货拉拉面试题' },
            component: () => import('../components/huolala/index.vue')
        },
        {
            path: '/flex',
            name: 'flex',
            meta: { title: 'flex' },
            component: () => import('../components/flex/index.vue'),
            children: [
                {
                    path: '/flex/flex2',
                    name: 'flex2',
                    meta: { title: '色子布局' },
                    component: () => import('../components/flex/flex2.vue'),
                },
            ]
        },
        {
            path: '/cnode',
            name: 'cnodeJs',
            meta: { title: 'cnode' },
            component: () => import('../components/cnode/index.vue'),
        },
        {
            path: '/cnode-topic/:id',
            name: 'cnode-topic',
            meta: { title: 'cnode-详情页' },
            component: () => import('../components/cnode/topic/index.vue'),
        },
        {
            path: '/:msg',
            name: 'home',
            meta: { title: '首页(props测试)' },
            component: Home,
            props: true
        },
        {
            path: '/transition-group',
            name: 'transition-group',
            meta: { title: '首页(props测试)' },
            component: import('../components/transition-group/index.vue')
        },
        {
            path: '/tree-view',
            name: 'tree-view',
            meta: { title: 'tree-view' },
            component: import('../components/tree-view/index.vue')
        },
        {
            path: '/404',
            name: 'PageNotExist',
            meta: { title: '404' },
            component: () => import('../components/404/index.vue'),
        },
        {
            path: "/:catchAll(.*)", // 不识别的path自动匹配404
            redirect: '/404',
        },
    ]
})
export default Router
import { createRouter, createWebHashHistory } from 'vue-router'
import modules from './global_modules'
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
            component: modules['../components/login-component/index.vue']
        },
        {
            path: '/huolala',
            name: 'huolala',
            meta: { title: '货拉拉面试题' },
            component: modules['../components/huolala/index.vue']
        },
        {
            path: '/ref',
            name: 'ref',
            meta: { title: 'ref' },
            component: modules['../components/ref/index.vue']
        },
        {
            path: '/flex',
            name: 'flex',
            meta: { title: 'flex' },
            component: modules['../components/flex/index.vue'],
            children: [
                {
                    path: '/flex/flex2',
                    name: 'flex2',
                    meta: { title: '色子布局' },
                    component: modules['../components/flex/flex2.vue'],
                },
            ]
        },
        {
            path: '/swiper/first',
            name: 'swiper',
            meta: { title: 'swiper' },
            component: modules['../components/swiper/index.vue'],
            props: true
        },
        {
            path: '/cnode/:tabsName',
            name: 'cnodeJs',
            meta: { title: 'cnode' },
            component: modules['../components/cnode/index.vue'],
            props: true
        },
        {
            path: '/cnode-topic/:id',
            name: 'cnode-topic',
            meta: { title: 'cnode-详情页' },
            component:  modules['../components/cnode/topic/index.vue'],
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
            component: modules['../components/404/index.vue'],
        },
        {
            path: "/:catchAll(.*)", // 不识别的path自动匹配404
            redirect: '/404',
        },
    ]
})
export default Router
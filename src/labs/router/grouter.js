import { ref, inject } from 'vue';
import RouterLink from './RouterLink';
import RouterView from './RouterView'
const routerKey = '__router__';

function createRouter(options) {
    return new Router(options);
}

function useRouter() {
    return inject(routerKey);
}

function createWebHashHistory() {
    function bindEvents(fn) {
        window.addEventListener('hashchange', fn)
    }

    return {
        bindEvents,
        url: window.location.hash.slice(1) || '/'
    }
}

class Router {
    constructor(options) {
        this.history = options.history;
        this.routers = options.routers;
        this.current = ref(this.history.url)

        this.history.bindEvents(() => {
            this.current.value = window.location.hash.slice(1)
        })
    }

    install(app) {
        app.provide(routerKey, this);
        app.component('router-link', RouterLink);
        app.component('router-view', RouterView);
    }
}

export { createRouter, useRouter, createWebHashHistory }
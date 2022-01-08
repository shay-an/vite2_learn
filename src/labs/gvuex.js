import { inject, reactive } from 'vue'
const STORE_KEY = '__store__'

export function useStore() {
    return inject(STORE_KEY)
}

export function createStore(options) {
    return new Store(options)
}

class Store {
    install(app) {
        app.provide(STORE_KEY, this);
    }
    constructor(options) {
        this._store = reactive({
            data: options.state()
        })

        this._mutations = options.mutations;
    }

    get state() {
        return this._store.data
    }

    commit = (type, payload) => {
        const entry = this._mutations[type];
        entry && entry(this.state, payload)
    }
}

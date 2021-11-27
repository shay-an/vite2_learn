import { createStore } from 'vuex'

export default createStore({
    state: {
        num: 10,
        str: 'tom',
        arr: [1, 2, 4],
        obj: {
            name: 'jerry',
            age: 12
        }
    },
    getters: {
        getNum(state) {
            return state.num + 2;
        },
        getObj(state) {

            return state.obj;
        }
    },
    mutations: {
        numMutation(state, data) {
            state.num = data;
        },
        strMutation(state, data) {
            state.str = data;
        },
        arrMutation(state, data) {
            state.arr = data;
        },
        objMutation(state, data) {
            state.obj = data;
        },
    },
    actions: {
        numAction({ commit }, args) {
            commit('numMutation', args)
            console.log("numAction")
        }
    },
    modules: {
    }
})
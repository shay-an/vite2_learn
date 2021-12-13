import { createStore, Commit, MutationPayload, Store } from 'vuex'


interface homeStore {
    cNode: cNode;
    num: number,
    str: string,
    arr: number[],
    obj: {
        name: string,
        age: number
    }

}
const storeHome = {
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
        getNum(state: homeStore) {
            return state.num + 2;
        },
        getObj(state: homeStore) {

            return state.obj;
        }
    },
    mutations: {
        numMutation(state: homeStore, data: number) {
            state.num = data;
        },
        strMutation(state: homeStore, data: string) {
            state.str = data;
        },
        arrMutation(state: homeStore, data: number[]) {
            state.arr = data;
        },
        objMutation(state: homeStore, data: { name: string, age: number }) {
            state.obj = data;
        },
    },
    actions: {
        numAction({ commit }: { commit: Commit }, args: number) {
            commit('numMutation', args)
            console.log("numAction")
        }
    },
    modules: {
    }
}

interface cNode {
    accesstoken: string
}

const cNodePlugin = (store: Store<homeStore>) => {
    // 当 store 初始化后调用
    store.subscribe((mutation: MutationPayload, state) => {
        if (mutation.type === 'cNode/changeToken') {
            localStorage.setItem('cnode_token', mutation.payload)
        }
    })
}

const storeCNode = {
    state: {
        accesstoken: localStorage.getItem('cnode_token') || '',
    },
    mutations: {
        changeToken(state: cNode, data: string) {
            state.accesstoken = data;
        },
    }
}
export default createStore({
    plugins: [cNodePlugin],
    modules: {
        home: {
            namespaced: true,
            ...storeHome
        },
        cNode: {
            namespaced: true,
            ...storeCNode
        }
    }
})
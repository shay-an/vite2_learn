import axios, { Axios, AxiosRequestConfig } from "axios";
import store from '../store/index'
interface topicsCreate {
    accesstoken: string;
    title: string
    tab: 'ask' | 'share' | 'job' | 'dev'
    content: string
    topic_id?: string
}

interface axiosBase<T> {
    config: any
    data: T
    headers: any
    request: XMLHttpRequest
    status: number
    statusText: string
}

interface requestBase {
    success: boolean
}

interface topicsRes extends requestBase {
    topic_id: string
}

interface upsRes extends requestBase {
    action: 'up' | 'down'
}

interface topicsGet {
    page?: number
    tab?: 'ask' | 'share' | 'job' | 'good' | 'dev' | null
    limit?: number
    mdrender?: boolean
}

export interface replie {
    id: string;
    author: {
        loginname: string,
        avatar_url: string
    },
    is_uped: boolean,
    content: string,
    create_at: string,
}

export interface topicsRess {
    id: string,
    author_id: string,
    tab: string,
    content: string,
    title: string,
    last_reply_at: string,
    good: boolean,
    top: boolean,
    reply_count: number,
    visit_count: number,
    create_at: string,
    is_collect: boolean,
    replies?: replie[],
    author: {
        loginname: string,
        avatar_url: string
    }
}

interface topicResData extends requestBase {
    data: topicsRess[]
}

interface topicInfoResData extends requestBase {
    data: topicsRess
}

const http = axios.create({
    baseURL: 'https://cnodejs.org/api/v1'
})

http.interceptors.request.use(function (config: AxiosRequestConfig) {
    if (store.state.cNode.accesstoken.length < 36) return config;
    const method = config.method?.toUpperCase()
    if (method === 'GET') {
        if (config.params) {
            config.params.accesstoken = store.state.cNode.accesstoken
        } else {
            config.params = { accesstoken: store.state.cNode.accesstoken }
        }
    } else if (method === 'POST' && typeof config.data === 'string') {
        let data = JSON.parse(config.data);
        data.accesstoken = store.state.cNode.accesstoken
        config.data = JSON.stringify(data)
    } else if (method === 'POST') {
        let data = config.data;
        data.accesstoken = store.state.cNode.accesstoken
        config.data = data
    }
    return config;
})


export const topics = function (data: topicsGet = {}): Promise<axiosBase<topicResData>> {
    return http.get('/topics', {
        params: data
    })
}


export const accesstoken = function (token: string): Promise<axiosBase<requestBase>> {
    return http.post('/accesstoken', {
        accesstoken: token
    })
}

export const collect = function (id: string): Promise<axiosBase<requestBase>> {
    return http.post('/topic_collect/collect', {
        topic_id: id
    })
}

export const uncollect = function (id: string): Promise<axiosBase<requestBase>> {
    return http.post('/topic_collect/de_collect', {
        topic_id: id
    })
}

export const ups = function (id: string): Promise<axiosBase<requestBase>> {
    return http.post(`/reply/${id}/ups`, {
    })
}

export const topicsInfo = function (id: string): Promise<axiosBase<topicInfoResData>> {
    return http.get('/topic/' + id)
}



export const createTopics = function (data: topicsCreate) {
    return http.post('/topics', data)
}

export const updateTopics = function (data: topicsCreate) {
    return http.post('/topics/update', data)
}
import axios, { Axios } from "axios";

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

export const topics = function (data: topicsGet = {}): Promise<axiosBase<topicResData>> {
    return http.get('/topics', {
        params: data
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
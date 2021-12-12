<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ topic.title }}</span>
      </div>
    </template>
    <div v-html="topic.content"></div>
    <div class="replies-item" v-for="item in topic.replies" :key="item.id">
        <img class="avatar" :src="item.author.avatar_url" :alt="item.author.loginname">
        <span class="nickname">{{ item.author.loginname }}</span>
        <div class="content" v-html="item.content"></div>
  </div>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { topicsRess, topicsInfo } from '../../../utils/http'
type topics = Partial<topicsRess>
const topic = reactive<topics>({})

const router = useRouter()
const route = useRoute()
console.log(route.params.id)

async function getData() {
    let res = await topicsInfo(route.params.id as string)
    Object.assign(topic,res.data.data)
    console.log(topic)
}
getData()
</script>
<style lang="less">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
    width: 100%;
    box-sizing: border-box;

    img {
        max-width: 100%;
    }
}

.avatar {
    width: 30px;
    height: 30px;
    border-radius: 20%;
}

.replies-item {
    border-bottom: 1px solid #ccc;
    padding: 20px 10px;
}

.replies-item:last-child{
    border-bottom:none;
}

.nickname {
    line-height: 30px;
}

.content {
    padding: 10px;
}
</style>
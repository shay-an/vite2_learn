<template>
 
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ topic.title }}</span>
        <el-button 
        :type="topic.is_collect ? 'success': ''" 
        :icon="Star"
        @click="collect"
        circle></el-button>
      </div>
    </template>
    <div v-html="topic.content"></div>
    <div class="replies-item" v-for="item in topic.replies" :key="item.id">
        <img class="avatar" :src="item.author.avatar_url" :alt="item.author.loginname">
        <span class="nickname">{{ item.author.loginname }}</span>
        <el-button 
        class="star"
        :type="item.is_uped ? 'success': ''" 
        :icon="Star"
        @click="uped(item)"
        circle></el-button>
        <div class="content" v-html="item.content"></div>
  </div>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Star } from '@element-plus/icons'
import { topicsRess, topicsInfo, collect as collectHttp,uncollect,ups,replie } from '../../../utils/http'
type topics = Partial<topicsRess>
const topic = reactive<topics>({})

const router = useRouter()
const route = useRoute()

async function getData() {
    let res = await topicsInfo(route.params.id as string)
    Object.assign(topic,res.data.data)
}
async function collect() {
    if (!topic.id) return;
    if (topic.is_collect) {
        await uncollect(topic.id)
    } else {
        await collectHttp(topic.id)
    }
    topic.is_collect = !topic.is_collect;
}

async function uped(replie:replie) {
    await ups(replie.id);
    replie.is_uped = !replie.is_uped;
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
    height: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
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
    background-color: rgb(239, 239, 239);
    border-bottom: 1px solid #ccc;
    padding: 20px 10px;
}

.replies-item:last-child{
    border-bottom:none;
}

.nickname {
    line-height: 30px;
    margin-left: 10px;
    color: rgb(60, 60, 60);
}

.content {
    padding: 10px;
    background: rgb(255, 221, 221);
    border-radius: 4px;
}
.star {
    transform: scale(0.7);
}

</style>
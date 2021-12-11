<template>
<div class="list" v-infinite-scroll="load">
  <el-card 
  class="item"
  v-for="(item) in list"
  :key="item.id"
  :span="8"
  :body-style="{ padding: '0px' }"
  >
    <img
      :src="item.author.avatar_url || defaultImgUrl"
      class="image"
    />
    <div style="padding: 14px">
      <span style="font-size:14px">{{ item.title }}</span>
      <div class="bottom">
        <time class="time">{{ item.create_at }}</time>
        <div class="button" v-if="item.good">推荐</div>
        <div class="button" v-if="item.top">置顶</div>
        <div class="tab">{{ getType(item.tab) }}</div>
      </div>
    </div>
    <div class="info" style="padding: 14px">
      <span>已回复：{{ item.reply_count }}</span>
      <span>已阅：{{ item.visit_count }}</span>
    </div>
  </el-card>
  </div>
 
</template>

<script lang="ts" setup>
import { ImageEmits } from 'element-plus'
import { defineComponent, ref, reactive } from 'vue'
import { topics, topicsRess } from '../../utils/http'
const currentDate = ref(new Date())

// const tabMap = {
//   ask:'问答',
//   share:'分享',
//   job:'招聘',
//   good:'推荐'
// }

enum tabMap {
  ask='问答',
  share='分享',
  job='招聘',
  good='推荐'
}

function getType(type:string) {
  switch (type) {
    case 'ask':
      return tabMap.ask;
    case 'share':
      return tabMap.share;
    case 'job':
      return tabMap.job;
  }
}

const list = reactive<topicsRess[]>([])
const defaultImgUrl = 'https://avatars.githubusercontent.com/u/92838042?v=4&s=120'
const pages = {
  page:0
}
const load = () => {
  pages.page ++;
  getData()
}

async function getData(){
  let res = await topics(pages)
  list.push(...res.data.data)
}

getData()

</script>

<style lang="less">
.list {
  height: 700px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 200px;
  margin: 10px;
  position: relative;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  position: absolute;
  left: 0;
  top: 0;
  color: red;
  background: #ccc;
  padding: 10px;
}

.tab {
  position: absolute;
  right: 0;
  top: 0;
  color: rgb(47, 47, 47);
  background: #ccc;
  padding: 10px;
}

// .info {
//   position: absolute;
//   width: 100%;
//   left: 0;
//   bottom: 0;
//   color: rgb(47, 47, 47);
//   background: #ccc;
//   padding: 10px;
// }

.image {
  width: 100%;
  display: block;
}
</style>
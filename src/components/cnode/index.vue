<template>
  <transition-group name="list" tag="div" class="list" v-infinite-scroll="load">
    <el-card 
    class="item"
    v-for="(item) in list"
    :key="item.id"
    :span="8"
    @click="router.push({
      name:'cnode-topic',
      params:{
        id:item.id
      }
    })"
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
  </transition-group>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { topics, topicsRess } from '../../utils/http'
const currentDate = ref(new Date())

const router = useRouter()
const route = useRoute()

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
  .el-card__body {
    height: 100%;
    padding: 4px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
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

.info {
  color: #2e8d6f;
}

.image {
  width: 100%;
  display: block;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
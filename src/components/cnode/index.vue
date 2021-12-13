<template>
  <el-button type="primary" class="login" v-if="loginToken.length !== 36" @click="loginShow = true"
      >登录</el-button>
  <el-dialog v-model="loginShow" title="accesstoken">
    <el-form ref="accesstokenFormRef" :rules="accesstokenRules" :model="accesstokenForm" label-width="120px">
      <el-form-item  prop="token" label="accesstoken">
        <el-input v-model="accesstokenForm.token"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="accesstokenSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <div class="cnode-content">
    <ul class="tabs">
      <li 
      v-for="item in tabsData" :key="item.name"
      :class="{ active: item.isActive }"
      @click="router.push({
        name:'cnodeJs',
        params:{
          tabsName:item.key
        }
      })"
      >{{ item.name }}</li>
    </ul>
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
  </div>
  
</template>

<script lang="ts" setup>
import { ref, reactive, watch, toRefs, defineProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { topics, topicsRess, accesstoken } from '../../utils/http'
import { useStore,mapMutations } from 'vuex'
import { ElMessage } from 'element-plus'
const router = useRouter();
const route = useRoute();
const store = useStore();
const { accesstoken:loginToken } = toRefs(store.state.cNode)
const { changeToken } = mapMutations('cNode',['changeToken']);
const tokenSave = changeToken.bind({ $store: store });
const accesstokenFormRef = ref(null)
//58c61ed8-ea03-4eb4-a8a8-6ee919f764b3
const loginShow = ref(false)

const accesstokenSubmit = async ()=> {
  try {
    await (accesstokenFormRef.value as any).validate()
    let data = await accesstoken(accesstokenForm.token);
    if (data.data.success) {
      ElMessage.success('登录成功')
      tokenSave(accesstokenForm.token)
      loginShow.value = false;
    } else {
      ElMessage.success('登录失败')
    }
  } catch (e) {
    ElMessage.success('登录失败')
  }
}

const accesstokenForm = reactive({
  token: ''
})

const accesstokenRules = { // 定义表单验证规则，普通对象即可
    token: [
        {
        required: true,
        message: '请输入accesstoken',
        trigger: 'blur',
        },
        {
        min: 36,
        max: 36,
        message: 'token有效长度36位',
        trigger: 'blur',
        },
    ]
}

// 使用路由传入props 需要在这定义props
const props = defineProps({
  tabsName:{
    type: String,
    required: true
  }
})
// 解构需要转ref
const { tabsName } = toRefs(props)

enum tabMap {
  ask='问答',
  share='分享',
  job='招聘',
  good='推荐',
  dev = '客户端测试'
}

enum tabs {
  ask = 'ask',
  share = 'share',
  job = 'job',
  good = 'good',
  dev = 'dev',
  all = 'all'
}

const tabsData = reactive([
  {key:tabs.all,name:'全部',isActive:true,params:null},
  {key:tabs.good,name:'精华',isActive:false,params:tabs.good},
  {key:tabs.share,name:'分享',isActive:false,params:tabs.share},
  {key:tabs.ask,name:'问答',isActive:false,params:tabs.ask},
  {key:tabs.job,name:'招聘',isActive:false,params:tabs.job},
  {key:tabs.dev,name:'客户端测试',isActive:false,params:tabs.dev},
])

function getType(type:string) {
  switch (type) {
    case 'ask':
      return tabMap.ask;
    case 'share':
      return tabMap.share;
    case 'job':
      return tabMap.job;
    case 'dev':
      return tabMap.dev;
  }
}

const list = reactive<topicsRess[]>([])
const defaultImgUrl = 'https://avatars.githubusercontent.com/u/92838042?v=4&s=120'
const pages = reactive({
  page:0,
  tab:null
})
const { page, tab } = toRefs(pages)
watch(page,()=>{
  getData()
})
// 需要watch这个props
watch(tabsName,()=>{
  list.length = 0;
  getPage(tabsName.value)
})

const getPage = (tab:any)=> {
  let myTab = null;
  if (tab !== tabs.all) myTab = tab;
  (pages.tab as any) = myTab;
  if (tab === tabs.all) {
    tabsData[0].isActive = true;
  }
  for (let item of tabsData) {
    if (item.key === tab) {
      item.isActive = true;
    } else {
      item.isActive = false;
    }
  }
  pages.tab = tab
  pages.page = 0
  getData()
}
const load = () => {
  pages.page ++;
}

async function getData(){
  let res = await topics(pages)
  list.push(...res.data.data)
}

getPage(tabsName.value)

</script>

<style lang="less">
.cnode-content {
  display: flex;
  flex-direction: column;
  height: 100%;

  .tabs {
    height: 30px;
    display: flex;
    padding: 20px 0;;
  }

  li {
    margin: 0 20px;
    font-size: 14px;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
  }
  li.active {
    background: #2e8d6f;
    color: #fff
  }
}
.list {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  flex: auto;
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

.login {
  position: absolute;
  right: 0;
}
</style>
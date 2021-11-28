<script setup lang="ts">
import { ref,onMounted,onBeforeUpdate,reactive,toRef,  onUnmounted, toRefs, watch, computed } from "vue";
import { Search, Edit, Check, Message, Star, Delete } from '@element-plus/icons'
import {  useStore, mapMutations,mapActions } from 'vuex'
let props = defineProps<{ msg: string }>();
console.log(props);

const count = ref(0);
const age = ref(0);

function useMousePosition () {
  // 第一个参数 props
  // 第二个参数 context，attrs、emit、slots
  const position = reactive({
    x: 0,
    y: 0
  })

  const store = useStore()

  const { str, arr, obj } = toRefs(store.state)
  const num = toRef(store.state, 'num');

  const { getNum, getObj } = toRefs(store.getters)

  const { 
    numMutation,
    strMutation,
    objMutation
    } = mapMutations([
    'numMutation',
    'strMutation',
    'arrMutation',
    'objMutation'
    ])

    const { numAction } = mapActions(['numAction'])

  const update = (e:MouseEvent) => {
    position.x = e.pageX
    position.y = e.pageY
  }

  watch(position,()=>{
    // console.log('position:update')
  })

  const cmp = computed(()=>{
    return position.x + position.y
  })

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onBeforeUpdate(()=>{
    // console.log('useMousePosition:update')
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return {
    str,
    num,
    arr,
    obj,
    getNum,
    getObj,
    strMutation:strMutation.bind({ $store: store }),
    numAction:numAction.bind({ $store: store }),
    cmp,
    ...toRefs(position)
  }
}

const { x,
 y,
cmp,
str,
num,
arr,
obj,
getNum,
getObj,
strMutation,
numAction,
} = useMousePosition()

</script>

<template>
  <h1>{{ msg }}</h1>
  <span>{{ x }},{{ y }},{{cmp}}</span>
  <p>
    {{ age }}
  </p>

   <el-row>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </el-row>

  <el-row>
    <el-button plain>Plain</el-button>
    <el-button type="primary" plain>Primary</el-button>
    <el-button type="success" plain>Success</el-button>
    <el-button type="info" plain>Info</el-button>
    <el-button type="warning" plain>Warning</el-button>
    <el-button type="danger" plain>Danger</el-button>
  </el-row>

  <el-row>
    <el-button round>Round</el-button>
    <el-button type="primary" round>Primary</el-button>
    <el-button type="success" round>Success</el-button>
    <el-button type="info" round>Info</el-button>
    <el-button type="warning" round>Warning</el-button>
    <el-button type="danger" round>Danger</el-button>
  </el-row>

  <el-row>
    <el-button :icon="Search" circle></el-button>
    <el-button type="primary" :icon="Edit" circle></el-button>
    <el-button type="success" :icon="Check" circle></el-button>
    <el-button type="info" :icon="Message" circle></el-button>
    <el-button type="warning" :icon="Star" circle></el-button>
    <el-button type="danger" :icon="Delete" circle></el-button>
  </el-row>
   <h4>state.num:</h4>
  <span>{{ num }}</span>
  <button @click="numAction(120)">numAction</button>
  <br />

  <h4>state.str:</h4>
  <span>{{ str }}</span>
  <button @click="strMutation('张三')">strMutation</button> <br />
  <br />
  <span
    >state.arr:
    <h4>{{ arr }}</h4></span
  >
  <br />
  <span
    >state.obj:
    <h4>{{ obj }}</h4></span
  >
  <br />
  <span
    >state.getters.getNum:
    <h4>{{ getNum }}</h4></span
  >
  <br />
  <span
    >state.getters.getObj:
    <h4>{{ getObj }}</h4></span
  >
  <br />
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>

<template>
  <div id="list-demo" @mousemove="mousemove" :style="{backgroundColor:`hsl(${x},80%,50%)`}">
    <el-button @click="add">Add</el-button>
    <el-button @click="remove">Remove</el-button>
    <transition-group name="list" tag="p">
      <span v-for="item in items" :key="item" class="list-item">
        {{ item }}
      </span>
    </transition-group>
    <div id="demo">
      <el-button @click="show = !show">
        toggle
      </el-button>
      <transition name="fade">
        <p v-if="show">hello</p>
      </transition>
    </div>
    <div id="demo2">
      <transition name="mode-fade" mode="out-in">
        <button class="my-btn" v-if="on" key="on" @click="on = false">
          on
        </button>
        <button class="my-btn" v-else key="off" @click="on = true">
          off
        </button>
      </transition>
    </div>
    <el-button @click="changeComponent(0)">
      child1
    </el-button>
    <el-button @click="changeComponent(1)">
      child2
    </el-button>
    <el-button @click="changeComponent(2)">
      child3
    </el-button>
    <transition name="component-fade" mode="out-in">
      <component :is="allComponent[curComponent]"></component>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import Child1 from './child/child1.vue'
import Child2 from './child/child2.vue'
import Child3 from './child/child3.vue'
const allComponent = reactive([Child1,Child2,Child3])

const curComponent = ref(0)

const items = reactive([1,2,3,4,5,6,7,8,9])
const nextNum = ref(10)
const x = ref(0)
const show = ref(true)
const on = ref(true)

function changeComponent(index:number){
  curComponent.value = index;
}

function randomIndex() {
  return Math.floor(Math.random() * items.length)
}

function mousemove(e:MouseEvent) {
  x.value = e.clientX
}

function add() {
  items.splice(randomIndex(), 0, nextNum.value++)
}

function remove() {
  items.splice(randomIndex(), 1)
}

</script>

<style lang="less" scoped>
#list-demo {
  width: 100vw;
  height: 100vh;
  transition: 0.2s background-color ease;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#demo2 {
  position: relative;
}

.mode-fade-enter-active, .mode-fade-leave-active {
  transition: opacity .5s ease
}

.mode-fade-enter-from, .mode-fade-leave-to {
  opacity: 0
}

.my-btn {
  // position: absolute;
  background: #05ae7f;
  border-radius: 4px;
  display: inline-block;
  border: none;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}
</style>
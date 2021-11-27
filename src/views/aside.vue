<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>vue3</span>
      </template>
      <el-menu-item-group title="vue3 学习">
        <el-menu-item index="1-1">
          <router-link class="link" to="/">主页</router-link>
        </el-menu-item>
        <el-menu-item index="1-2">
          <router-link class="link" to="/43434/3434">404</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><location /></el-icon>
        <span>布局</span>
      </template>
      <el-menu-item-group title="布局学习">
        <el-menu-item index="2-1">
          <router-link to="/flex">flex</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    
  </el-menu>
    
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons'

export default defineComponent({
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
  },
  setup() {
    const handleOpen = (key:any, keyPath:any) => {
      console.log(key, keyPath)
    }
    const handleClose = (key:any, keyPath:any) => {
      console.log(key, keyPath)
    }
    return {
      handleOpen,
      handleClose,

    }
  },
})
</script>

<style>
.el-menu-vertical-demo {
  height: 100vh;
  background-color: #545c64;
}
</style>
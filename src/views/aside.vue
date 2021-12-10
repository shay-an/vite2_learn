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
        <el-menu-item @click="router.push({path:'/'})" index="1-1">
          主页
        </el-menu-item>
        <el-menu-item @click="router.push({ path:'/login' })" index="1-2">
          登录
        </el-menu-item>
        <el-menu-item @click="router.push({ path:'/43434/3434' })" index="1-3">
          404
        </el-menu-item>
        <el-menu-item @click="router.push({ path:'/transition-group' })" index="1-4">
          transition-group
        </el-menu-item>
        <el-menu-item @click="router.push({ path:'/tree-view' })" index="1-5">
          tree-view
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><location /></el-icon>
        <span>布局</span>
      </template>
      <el-menu-item-group title="布局学习">
        <el-menu-item @click="router.push({ path:'/flex' })" index="2-1">
          flex
        </el-menu-item>
        <el-menu-item @click="router.push({ path:'/huolala' })" index="2-2">
          货拉拉面试题
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
import { useRoute,useRouter } from 'vue-router'

export default defineComponent({
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const handleOpen = (key:any, keyPath:any) => {
      console.log(key, keyPath)
    }
    const handleClose = (key:any, keyPath:any) => {
      console.log(key, keyPath)
    }
    return {
      handleOpen,
      handleClose,
      router
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
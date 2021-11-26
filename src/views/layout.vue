<template>
  <el-container>
    <el-aside>
      <Aside></Aside>
    </el-aside>
    <el-main>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer></el-footer>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import Aside from './aside.vue'
import Header from './header.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    Aside,
    Header
  },
})
</script>

<style lang="scss" scoped>

</style>
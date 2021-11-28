<template>
  <el-page-header  @back="goBack">
    <template #content>
      <el-breadcrumb  separator="/">
        <el-breadcrumb-item v-for="item in breadList" :key="item.path"  :to="{ path: item.path }">{{ item.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
  </el-page-header>
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { RouteLocationMatched,useRoute, useRouter } from 'vue-router'
function isHome(route:RouteLocationMatched){
  return route.name === 'home'
}
function getBreadList() {
  let list:RouteLocationMatched[] = reactive([])
  const route = useRoute()
  watch(route,()=>{
    let matched = route.matched;
    //如果不是首页
    if (matched.length && !isHome(matched[0])) {
      matched = ([{ path: "/", meta: { title: "首页" } }] as unknown as RouteLocationMatched[]).concat(matched);
    }
    list.length = 0;
    matched.forEach(item=>list.push(item))
  },{immediate:true})
  return list
}

export default defineComponent({
  setup() {
    const router = useRouter()
    const goBack = () => {
      router.back()
    }
    const breadList = getBreadList()
    return {
      goBack,
      breadList
    }
  },
})
</script>
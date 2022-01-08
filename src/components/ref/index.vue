<template>
  <div>sonRef</div>
  <button @click="sendValue">send</button>
  // 这里ref接受的字符串，要setup返回的ref类型的变量同名
  <Son ref="sonRef" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Son from './components/sun.vue'
import { Son as Sun } from './components/sun'

export default defineComponent({
  name: 'Demo',
  components: {
    Son
  },
  setup() {
    // 如果ref初始值是一个空，可以用于接受一个实例
    // vue3中获取实例的方式和vue2略有不同
    const sonRef = ref<Sun>()

    const sendValue = () => {
      // 可以拿到son组件实例，并调用其setup返回的所有信息
      console.log(sonRef.value)
      
      // 通过调用son组件实例的方法，向其传递数据
      if (sonRef && sonRef.value) {
        sonRef.value.acceptValue('123456')
      }
    }

    return {
      sonRef,
      sendValue
    }
  }
})
</script>
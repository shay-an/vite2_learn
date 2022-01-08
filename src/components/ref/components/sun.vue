<template>
  // 渲染从父级接受到的值
  <div>Son: {{ valueRef }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Son } from './sun'

export default defineComponent<Son>({
  name: 'Son',
  setup() {
    const valueRef = ref('')
    
    // 该函数可以接受父级传递一个参数，并修改valueRef的值
    const acceptValue = (value: string) => (valueRef.value = value)

    return {
      acceptValue,
      valueRef
    }
  }
})
</script>
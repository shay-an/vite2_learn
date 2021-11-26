<script setup lang="ts">
import { ref,onMounted,onBeforeUpdate,reactive,  onUnmounted, toRefs, watch, computed } from "vue";


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

  const update = (e:MouseEvent) => {
    position.x = e.pageX
    position.y = e.pageY
  }

  watch(position,()=>{
    console.log('position:update')
  })

  const cmp = computed(()=>{
    return position.x + position.y
  })

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onBeforeUpdate(()=>{
    console.log('useMousePosition:update')
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return toRefs({
    cmp,
    ...toRefs(position)
  })
}

const { x, y, cmp } = useMousePosition()

</script>

<template>
  <h1>{{ msg }}</h1>
  <span>{{ x }},{{ y }},{{cmp}}</span>
  <p>
    {{ age }}
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
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

<template>
  <li>
    <div
         :class="{bold: isFolder}"
         @click="toggle"
         @dblclick="makeFolder">
      {{ item && item.name }}
      <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <tree-item
         class="item"
         v-for="(child, index) in item && item.children"
         :key="index"
         :item="child"
         @make-folder="emit('make-folder', $event)"
         @add-item="emit('add-item', $event)"
         ></tree-item>
      <li class="add" @click="emit('add-item', item)">+</li>
    </ul>
  </li>
</template>
<script lang="ts">

// 声明额外的选项
import { defineComponent } from 'vue'

export default defineComponent({
  name:'tree-item'
})
</script>
<script lang="ts" setup>
import { defineProps, ref, computed, defineEmits } from 'vue'
export interface Item {
  name:string,
  children?: Item[]
}
const emit = defineEmits(['make-folder','add-item']) // 定义事件

const { item } = defineProps({
    item:{
        type:Object as () => Item,
    }
})

const isOpen = ref(false)
const isFolder = computed({
  get: () => {
    if (item) return item.children && item.children.length;
  },
  set: val => {
    
  }
})
function toggle() {
  if (isFolder.value) {
        isOpen.value = !isOpen.value;
    }
}

function makeFolder () {
    if (!isFolder.value) {
        emit("make-folder", item);
        isOpen.value = true;
    }
}

</script>

<style scoped lang="less">
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
<template>
  <ul id="demo">
  <tree-item
    class="item"
    :item="treeData"
    @make-folder="makeFolder"
    @add-item="addItem"
    ></tree-item>
</ul>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import  treeItem from './components/index.vue'
import { Item } from './components/index.vue'
var treeData = reactive({
  name: "My Tree",
  children: [
    { name: "hello" },
    { name: "wat" },
    {
      name: "child folder",
      children: [
        {
          name: "child folder",
          children: [{ name: "hello" }, { name: "wat" }]
        },
        { name: "hello" },
        { name: "wat" },
        {
          name: "child folder",
          children: [{ name: "hello" }, { name: "wat" }]
        }
      ]
    }
  ]
})

function makeFolder (item:any) {
    item.children = [];
    addItem(item);
}
function addItem (item:any) {
    item.children.push({
        name: "new stuff"
    });
}
  
</script>

<style>

</style>
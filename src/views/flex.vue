<script setup lang="ts">
</script>

<template>
  <h3>基础布局 行</h3>
  <div class="flex1">
    <div class="flex-item"></div>
    <div class="flex-item"></div>
    <div class="flex-item"></div>
  </div>
  <h3>基础布局 列</h3>
  <div class="flex2">
    <div class="flex-item"></div>
    <div class="flex-item"></div>
    <div class="flex-item"></div>
  </div>
</template>

<style lang="less" scoped>
.flex1 {
  display: flex;
  height: 100px;
  background-color: #ccc;
  align-items: center;
  justify-content: space-around;

  .flex-item {
    height: 60px;
    background-color: aqua;
    flex: 1;
    margin: 0 10px;
  }
}

.flex2 {
  display: flex;
  width: 100px;
  height: 400px;
  background-color: #ccc;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;

  .flex-item {
    width: 60px;
    background-color: aqua;
    flex: 1;
    margin: 10px 0;
  }
}
</style>

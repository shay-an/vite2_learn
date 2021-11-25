<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <div class="tap">
    <router-link class="taps" to="/">index</router-link>
    <router-link class="taps" to="/744444">404 test</router-link>
  </div>

  <img alt="Vue logo" src="./assets/logo.png" />
  <router-view />
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.tap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;

  .taps {
    width: 70px;
    height: 24px;
    margin: 0 20px;
    background-color: #999;
    color: #fff;
  }
}

.router-link-active {
  background-color: red !important;
}
</style>

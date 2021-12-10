<template>
  <div>
    css新世界
    <input type="text">

    <img src="../../../assets/logo.png" alt="">
    <div class="icon-loading"></div>
    <div class="panel-x"></div>
    <span class="space-size-zero">1</span>111
    <span class="space-size-zero">2</span>111
    <span class="space-size-zero">3</span>111
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
input {
  all: inherit;
  background: #fff;
  border: 1px solid #ccc;
}

img {
  border-radius: 50%;
}

.icon-loading {
  display: inline-block;
  width: 30px;height: 30px;
  background: url(../../../assets/loading.gif);
  background: url(../../../assets/loading.png), linear-gradient(transparent,transparent);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

.panel-x {
  width: 100px;height: 100px;
  border: 1px solid #ddd;
  border: 1px solid rgba(0, 0, 0, 0);
  box-shadow: 2px 2px;
}

.space-size-zero {
  font-size: .1px;
  font-size: -webkit-calc(1px - 1px);
}

@supports (animation: none) {
  .icon-loading {
    background: url(../../../assets/loading.png);
    animation: spin 1s linear infinite;
  }
}
</style>
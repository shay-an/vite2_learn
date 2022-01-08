<template>
  <div>
    <teleport-components></teleport-components>
    <hello-world></hello-world>
    <effect-cube></effect-cube>
    <effect-cards></effect-cards>
  </div>
</template>

<script lang="ts" setup>
import HelloWorld from './first/index.vue'
import EffectCube from './effect_cube/index.vue'
import EffectCards from './effect_cards/index.vue'
import TeleportComponents from '../teleport/index.vue'
</script>

<style lang="less" scoped>

</style>
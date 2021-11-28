<script lang="ts" setup>
import Login from './login/login.vue'
function onSubmit() {
    console.log('f-submit')
}
</script>
<template>
<Login name="123" @submit="onSubmit" password="999"></Login>
</template>

<style lang="less">

</style>
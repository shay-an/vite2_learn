<script lang="ts" setup>
import { ref } from 'vue'
import Login from './login/login.vue'
const name = ref('');
const password = ref('');
function onSubmit(isVied:boolean) {
    console.log('f-submit',isVied,name.value,password.value)
}
</script>
<template>
<Login :propsName="name" @submit="onSubmit" :propsPassword="password"></Login>
</template>

<style lang="less">

</style>
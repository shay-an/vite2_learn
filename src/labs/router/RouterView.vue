<template>
  <component :is="cmp"></component>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from './grouter';
let router = useRouter();

const cmp = computed(()=>{
    const router = router.routers.find((route)=> {
        return route.path === router.current.value
    })

    return router ? router.component : null;
})
</script>

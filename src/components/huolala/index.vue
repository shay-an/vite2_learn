<script setup lang="ts">
import { ref, reactive,onMounted,onUnmounted, toRefs } from 'vue'
function sum (...args:number[]) {
    let sum = 0;
    for (let item of args) {
        sum += item;
    }

    return sum;
}
const s = sum(1,2,3)
console.log(s);
function useMousePosition () {
    const position = reactive({
        x:0,
        y:0
    })

    const update = (e:MouseEvent) => {
        position.x = e.pageX -150
        position.y = e.pageY -150
    }

    onMounted(() => {
        window.addEventListener('mousemove', update)
    })

    onUnmounted(() => {
        window.removeEventListener('mousemove', update)
    })

    return toRefs(position)
}
const { x, y } = useMousePosition();


</script>

<template>
<div class="postion" :style="{top:y+'px',left:x+'px'}"></div>
  <ul class="box">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <p>5</p>
  </ul>
  <ul class="box">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <p>5</p>
  </ul>
  <ul class="box">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <p>5</p>
  </ul>
  <ul class="box">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <p>5</p>
  </ul>
  <ul class="box">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <p>5</p>
  </ul>
  <ul class="box">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <p>5</p>
  </ul>
  <ul class="box">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <p>5</p>
  </ul>
  <ul class="box">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <p>5</p>
  </ul>
</template>

<style scoped lang="less">
.box {
    background-color: aqua;
}

.postion {
    width: 100px;
    height: 100px;
    background-color: blue;
    position: fixed;

    animation:turn 1s linear infinite;
    transform-origin:150% 150%;
}

@keyframes turn{
    0%{
        transform:rotate(0deg);
        
    }
    25%{
        transform:rotate(90deg);
    }
    50%{
        transform:rotate(180deg);
    }
    75%{
        transform:rotate(270deg);
    }
    100%{
        transform:rotate(360deg);
    }
}

.box li {
    background-color: blue;
}

// .box li:nth-last-of-type(1){
//     background-color: red;
// }

.box > li:nth-last-child(3) {
    background-color: red;
}

.box > li:last-of-type {
    background-color: red;
}
</style>

## vue3 vite2 vue-router4 vuex4
> 初始化项目
```
npm init vite
```
一个字
# 快

### 名词解释

sfc 单文件组件

遇到的问题：

- 开发依赖一定要放到 devDependencies
- 404 匹配

```
{
    path: "/:catchAll(.*)", // 不识别的path自动匹配404
    redirect: '/404',
},
```
> 原因：Vue Router不再使用path-to-regexp，而是实现了自己的解析系统，该系统允许路由排名并启用动态路由。由于我们通常会在每个项目中添加一条单独的包罗万象的路线，因此支持的特殊语法没有太大的好处*。参数的编码是跨路线编码，无一例外使事情更容易预测。
> 
> 更好的封装，把一套逻辑封装到一个函数内，利于程序解耦
> 脚本标签上加上setup属性 标签内的脚本就可以使用
```
<script setup lang="ts">
import { ref,onMounted,onBeforeUpdate,reactive,  onUnmounted, toRefs, watch, computed } from "vue";

// props的使用
let props = defineProps<{ msg: string }>();
console.log(props);
// 创建响应式数据
const count = ref(0);
const age = ref(0);
// 每个函数都可以注册生命周期函数
function useMousePosition () {
  const position = reactive({
    x: 0,
    y: 0
  })

  const update = (e:MouseEvent) => {
    position.x = e.pageX
    position.y = e.pageY
  }

  watch(position,()=>{
    console.log('position:update')
  })
  // 计算属性返回的是一个响应式数据
  const cmp = computed(()=>{
    return position.x + position.y
  })

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onBeforeUpdate(()=>{
    console.log('useMousePosition:update')
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })
  // 在需要解构的场景需要将对象用toRefs包装一下
  return toRefs({
    cmp,
    ...toRefs(position)
  })
}

const { x, y, cmp } = useMousePosition()

</script>
```
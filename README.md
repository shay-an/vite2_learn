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
vuex 在 setup函数内使用 mapActions mapMutations 直接返回映射后的函数会报错，报错大概是在：
```
var dispatch = this.$store.dispatch;// this 是undefined
```
解决办法：
```
const { numAction } = mapActions(['numAction'])

strMutation:strMutation.bind({ $store: store }),

```

##### flex 布局笔记
```
• 开启 flex 布局使用display: flex属性。
• flex 布局有主轴和交叉轴，分别使用justify-content和align-items控制对齐方式。
 -  justify-content: flex-start|center|flex-end|space-between|space-evenly|space-around;
 对应轴上的对齐方式
-align-items: stretch(拉伸)|flex-start(轴向开始)|center(轴向居中)|flex-end | baseline (文字基线)|align-content
• 支持按行或列进行排列，使用flex-direction，另外也支持row-reverse和column-reverse反向排列。
•  -flex-direction: column(行模式)| row（列模式）| *-reverse （对应模式的逆序）
• 子元素可以通过flex简写形式，或者flex-grow，flex-shrink，flex-basis 来调整元素的空间占比和缩放。
 -flex-basis 设置主轴方向为固定值
 -flex-grow 这个属性是说 flex 容器在有剩余空间的时候，子元素占据剩余空间的占比。
  -flex-shrink当它们的宽度超过 flex 容器之后，该如何进行收缩
• 通过flex-wrap可以设置 flex 子元素折行显示。
• 嵌套flex容器的缩放问题。
作者：峰华
链接：https://juejin.cn/post/6844904116141948936
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```
##### 面包屑功能
```
function getBreadList() {
  let list:RouteLocationMatched[] = reactive([])
  const route = useRoute()
  watch(route,()=>{
    let matched = route.matched;
    //如果不是首页
    if (matched.length && !isHome(matched[0])) {
      matched = ([{ path: "/", meta: { title: "首页" } }] as unknown as RouteLocationMatched[]).concat(matched);
    }
    list.length = 0;
    matched.forEach(item=>list.push(item))
  },{immediate:true})
  return list
}
```
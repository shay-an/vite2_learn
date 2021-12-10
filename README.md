## vue3 vite2 vue-router4 vuex4

[TOC]
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

```javascript
{
    path: "/:catchAll(.*)", // 不识别的path自动匹配404
    redirect: '/404',
},
```
> 原因：Vue Router不再使用path-to-regexp，而是实现了自己的解析系统，该系统允许路由排名并启用动态路由。由于我们通常会在每个项目中添加一条单独的包罗万象的路线，因此支持的特殊语法没有太大的好处*。参数的编码是跨路线编码，无一例外使事情更容易预测。
> 
> 更好的封装，把一套逻辑封装到一个函数内，利于程序解耦
> 脚本标签上加上setup属性 标签内的脚本就可以使用
```javascript
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
```javascript
var dispatch = this.$store.dispatch;// this 是undefined
```
解决办法：
```javascript
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
```javascript
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

##### 双向绑定

```javascript
//在 <script setup>内使用
<template>
  <el-form ref="form"  label-width="120px">
    <el-form-item label="名称">
      <el-input v-model="name"></el-input>
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="age"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, toRefs,ref } from 'vue'

function getForm () {
    const form = reactive({
        name:'',
        age: 0,
    })
    return toRefs(form)
}
const { name, age } = getForm();
const onSubmit = function() {
    console.log('submit!',name.value,age.value)
}

</script>
```
```javascript
//在普通<script>内使用
<template>
  <el-input v-model="input" placeholder="Please input" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    return {
      input: ref(''),// 对象需要toRefs转换
    }
  },
})
</script>
```

##### div 绕鼠标旋转

```html
<-- 跟随鼠标移动 >
<div class="postion" :style="{top:y+'px',left:x+'px'}"></div>
```

```javascript
const update = (e:MouseEvent) => {
    position.x = e.pageX -150
    position.y = e.pageY -150
}
```
```css
.postion {
  width: 100px;
  height: 100px;
  background-color: blue;
  position: fixed;
  /* 旋转动画 */
  animation:turn 1s linear infinite;
  /* 旋转偏移 */
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
```

#### 伪类选择器
##### nth-last-child last-child nth-child first-child
li:nth-child(n) n = int / even odd
如果最后一个/第一个不是li则不选择任何元素（助记：选中第一(n)个/最后一（n）个,前面的条件符合则选中，否则不选中）
##### last-of-type nth-last-of-type first-of-type nth-of-type
li:nth-of-type()n = int / even odd
有li则选中最后一个/第一个（助记：选中第一(n)个/最后一（n）个并且符合前面条件的元素）

#### vue3 组合式API
##### setup
可以在选项API中声明setup函数，也可以在script标签上添加setup属性，脚本内所处的就是setup环境，这里所处的生命周期相当于vue2的created,这里没有this，建议要符合函数式编程思想来编写逻辑，一切都是函数，每组逻辑的状态都是在函数内进行维护


##### 响应式数据

> ref reactive toRefs

ref 是对单值进行响应化操作，通过xxx.value的方式对值进行取值赋值的操作，使其拥有响应式能力

reactive 是对对象类型的数据进行响应化的操作，包括一般对象及数组进行包装，但是不能对其进行解构操作，这将失去响应式，此时可以对其进行toRefs操作，使其浅层属性进行ref包装，在解构时不会丢失响应式能力，在混合多个对象时也应该使用该方式。

#### 过渡 & 动画
##### class 

1. v-enter-from：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

1. v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

1. v-enter-to：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter-from 被移除)，在过渡/动画完成之后移除。

1. v-leave-from：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

1. v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

1. v-leave-to：离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave-from 被移除)，在过渡/动画完成之后移除。

##### 普通过渡

```html
<transition name="component-fade" mode="out-in">
  <component :is="allComponent[curComponent]"></component>
</transition>
```

##### 列表过渡

```html
<transition-group name="list" tag="p">
  <span v-for="item in items" :key="item" class="list-item">
    {{ item }}
  </span>
</transition-group>
```

##### 常用属性理解

name: 动态生成class前缀

mode: out-in in-out 先出后进  先进后出 为空时同时进行（transition-group 无效）
更多属性见官方文档： https://v3.cn.vuejs.org/api/built-in-components.html#transition

#### 渐进增强技巧

1. 对于高版本浏览器支持但是低版本浏览器不支持的属性，在不影响基本功能和版式的基础上可以放弃某些效果
2. 利用属性值的语法差异实现兼容
```css
.icon-loading {
  display: inline-block;
  width: 30px;height: 30px;
  background: url(../../../assets/loading.gif);
  background: url(../../../assets/loading.png), linear-gradient(transparent,transparent);
  animation: spin 1s linear infinite;
}
```
3. 借助伪类或伪元素区分浏览器
4. @supports规则,<var>=<declaration> | <supports-condition>
```css
@supports (animation: none) {
  .icon-loading {
    background: url(../../../assets/loading.png);
    animation: spin 1s linear infinite;
  }
}
```
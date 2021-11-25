## vue3 vite2 vue-router4 vuex4
> 初始化项目
```
npm init vite
```
一个字
#快

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


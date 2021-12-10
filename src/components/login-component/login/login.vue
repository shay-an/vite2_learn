<template>
<el-card class="card">
    <el-form :rules="rules" :model="formData" ref="ruleForm" label-width="120px">
        <el-form-item prop="name" label="用户名">
            <el-input 
            v-model="name"
            placeholder="请输入用户名"
            ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
            <el-input 
            type="password" 
            show-password
            v-model="password"
            placeholder="请输入密码"
            ></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
    </el-form>
</el-card>
</template>

<script lang="ts" setup>
import { reactive, toRefs,ref,defineProps,defineEmits} from 'vue'

const {propsName, propsPassword} = defineProps({
  propsName: {
    type: String,
    required: true
  },
  propsPassword: {
    type: String,
    required: true
  }
})

const rules = { // 定义表单验证规则，普通对象即可
    name: [
        {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
        },
        {
        min: 3,
        max: 60,
        message: '用户名在3-60位之间',
        trigger: 'blur',
        },
    ],
    password: [
        {
        required: true,
        message: '请输入密码',
        trigger: 'blur',
        },
        {
        min: 3,
        max: 60,
        message: '密码在3-60位之间',
        trigger: 'blur',
        },
    ]
}
const ruleForm = ref(null) // 获取组件实例的ref
const emit = defineEmits(['submit']) // 定义事件

function getForm () {// 下面定义了表单的数据，该数据为响应式数据，通过 reactive 包装
    const form = reactive({
        name:propsName,
        password: propsPassword,
    })
    return form
}
const formData = getForm();
const { name, password } = toRefs(formData)// 如果要解构响应式对象 通过 toRefs 包装，通过xxx.value 取值、赋值达到触发更新的目的，双向绑定也可以使用该方法定义
const onSubmit = function() {
    console.log('submit!',name.value,password.value);
    (ruleForm.value as any).validate((valid:boolean)=>{// 这里elementUI设计的不太友好，没用提供组件的类型
        emit('submit',valid);
    })
}

</script>

<style lang="less">
.card {
    width: 600px;
    margin: auto;
}
</style>
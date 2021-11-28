<template>
<el-card class="card">
    <el-form :rules="rules" ref="ruleForm" label-width="120px">
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
import { reactive, toRefs,ref,defineProps,defineEmits,getCurrentInstance,Ref } from 'vue'
import { ElForm } from 'element-plus'

const {name, password} = defineProps({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const rules = {
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
const ruleForm = ref(null)
const emit = defineEmits(['submit'])
console.log(name,password)
function getForm () {
    const form = reactive({
        name:name,
        password: password,
    })
    return toRefs(form)
}
// const { name, password } = getForm();
const onSubmit = function() {
    console.log('submit!',name,password)
    emit('submit')
}

</script>

<style lang="less">
.card {
    width: 600px;
    margin: auto;
}
</style>
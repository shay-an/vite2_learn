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
<template>
    <div class="CommonAttr">
        <el-collapse v-model="activeNames" @change="handleChange">
             <el-collapse-item title="样式" name="1">
                <el-form-item label="背景色">
                    <el-color-picker v-model="color" />
                </el-form-item>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
  console.log(val)
}
const color = ref('#409EFF')
</script>

<style>
.DCol{
    border: 1px dotted #aaaaaa;
    min-height: 90px;
}
</style>
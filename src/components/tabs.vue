<template>
    <div class="DTabs">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="User" name="first">
                 <slot></slot>
            </el-tab-pane>
            <el-tab-pane label="Config" name="second">
                  <!-- <slot></slot> -->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type {TabsPaneContext } from 'element-plus';
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style lang="scss">
.DTabs{
    border: 1px dotted #aaaaaa;
    min-height: 90px;
    padding: 10px;
}
</style>
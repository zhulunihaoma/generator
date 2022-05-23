<template>
    <div :style="componentStyle" class="DTabs">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="子页签1" name="first">
                 <slot></slot>
            </el-tab-pane>
            <el-tab-pane label="子页签2" name="second">
                  <!-- <slot></slot> -->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import type {TabsPaneContext } from 'element-plus';
    const props = defineProps({
        block: {
          type: Object
        }
      });
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const componentStyle = computed(() => {
            return props.block.attr?.componentStyle || "";
        });
</script>

<style lang="scss">
.DTabs{
    border: 1px dotted #aaaaaa;
    min-height: 90px;
    padding: 10px;
}
</style>
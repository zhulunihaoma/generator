<template>
    <div :style="componentStyle" class="DFlodpanel">
        <div class="DFlodpanel-header">
            <span class="DFlodpanel-header-title">折叠面板</span>
            <el-icon><ArrowDown /></el-icon>
        </div>
        <div class="DFlodpanel-content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue';
import { computed } from "vue";
    const props = defineProps({
        block: {
          type: Object
        }
      });
   const componentStyle = computed(() => {
            return props.block.attr?.componentStyle || "";
        });
</script>

<style lang="scss">
.DFlodpanel{
    border: 1px dotted #aaaaaa;
    min-height: 90px;
    padding:10px;
    &-header{
        height: 20px;
        display: flex;
        align-items: center;
        i{
            font-size: 13px;
            margin-left: 10px;
        }
        &-title{
            padding-left: 10px;
            border-left: 5px solid #4680ff;
        }
    }
}
</style>
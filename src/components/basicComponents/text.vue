<template>
    <div :style="componentStyle" class="DText">
        <div class="DText-content">
            文本内容
        </div>
    </div>
</template>

<script setup>
import {
    ArrowDown
  } from '@element-plus/icons-vue'
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
.DText{
    &-content{

    }
}
</style>
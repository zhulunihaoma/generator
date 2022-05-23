<template>
  <div :style="componentStyle" class="DRate">
    <el-rate
      v-model="value"
      :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
      show-text
    />
  </div>
</template>

<script lang="ts" setup>
import { ref,computed } from 'vue'
const props = defineProps({
        block: {
          type: Object
        }
      });
    const componentStyle = computed(() => {
            return props.block.attr?.componentStyle || "";
        });
const value = ref()
</script>
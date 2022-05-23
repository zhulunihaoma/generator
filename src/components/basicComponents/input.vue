<template>
    <div :style="componentStyle" class="DInput">
        <el-input v-model="input" placeholder="Please input" />
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
    const input = ref('')
</script>
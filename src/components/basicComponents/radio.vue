<template>
    <div :style="componentStyle" class="DRadio">
        <el-radio-group v-model="radio">
            <el-radio :label="3">Option A</el-radio>
            <el-radio :label="6">Option B</el-radio>
            <el-radio :label="9">Option C</el-radio>
        </el-radio-group>
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
const radio = ref(3)
</script>
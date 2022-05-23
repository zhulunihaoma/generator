<template>
  <div class="DSelect">
    <el-select v-model="value" placeholder="Select" size="large">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
    const props = defineProps({
        block: {
          type: Object
        }
      });
    const componentStyle = computed(() => {
      return props.block.attr?.componentStyle || "";
    });
const value = ref('')

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>
<style lang="scss">
.el-select{
  width: 100%;
}
</style>

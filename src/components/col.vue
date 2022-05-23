<template>
    <div :style="componentStyle" class="DCol">
        <slot></slot>
    </div>
</template>

<script setup>
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

<style>
.DCol{
    border: 1px dotted #aaaaaa;
    min-height: 90px;
}
</style>
<template>
    <div :style="componentStyle" class="DBlock">
        <slot></slot>
    </div>
</template>

<script>
import { onMounted, ref, reactive, computed } from "vue";
export default {
    name: "DBlock",
    props: {
        block: {
            type: Object,
            require: true,
        },
    },
    components: {},
    setup(props, ctx) {
        const componentStyle = computed(() => {
            return props.block.attr?.componentStyle || "";
        });
        return {
            componentStyle,
        };
    },
};
</script>

<style lang="scss">
.DBlock {
    border: 1px dotted #aaa;
    min-height: 100px;
    box-sizing: border-box; //包含内边距和边框
    padding: 10px;
}
</style>

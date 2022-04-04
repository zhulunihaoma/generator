<template>
    <!--vue3.0和Ts的模板 -->
    <div class="DSelect">

    </div>
    <!-- <ElSelect></ElSelect> -->
</template>
<script>
import { ElSelect } from "element-plus";
export default {
    components: {
        ElSelect,
    },
    setup() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
.DSelect {
    width: 100%;
    height: 200px;
    background-color: coral;
}
</style>

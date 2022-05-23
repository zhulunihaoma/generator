<template>
    <div :style="componentStyle" class="DButtonCard"></div>
    <el-button class="DButtonCard-button">按钮1</el-button>
    <el-button class="DButtonCard-button">按钮2</el-button>
    <el-button class="DButtonCard-button">按钮3</el-button>
</template>

<script>
import { computed } from 'vue';
export default {
  name:'DButtonCard',
  props:{
      block:{
          type: Object,
          require: true
      }
  },
  setup(props){
    const componentStyle = computed(() => {
            return props.block.attr?.componentStyle || "";
        });
    return {
      componentStyle
    }
  }
}
</script>

<style lang="scss">
.DButtonCard{
  width: 100%;
  display: flex;
  &-button{
    width: 90px;
  }
  // margin-left: 0px;
}
</style>

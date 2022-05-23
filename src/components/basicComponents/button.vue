<template>
  <div :style="componentStyle" class="DButton">
        <ElButton class="DButton">{{block && block.name || '按钮'}}</ElButton>
  </div>
</template>

<script>
import { ElButton } from 'element-plus';
import { computed } from 'vue';
export default {
  name:'DButton',
  components:{
    ElButton
  },
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
.DButton{
  width: 100%;
  // margin-left: 0px;
}
</style>

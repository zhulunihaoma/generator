<template>
    <ElButton class="DButton">{{block && block.name || '按钮'}}</ElButton>
</template>

<script>
import { ElButton } from 'element-plus'
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
    // console.log('props: ', props);

  }
}
</script>

<style lang="scss">
.DButton{
  width: 100%;
  // margin-left: 0px;
}
</style>

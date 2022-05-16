<template>
    <div class="DButtonCard"></div>
    <el-button class="DButtonCard-button">按钮1</el-button>
    <el-button class="DButtonCard-button">按钮2</el-button>
    <el-button class="DButtonCard-button">按钮3</el-button>
</template>

<script>
export default {
  name:'DButtonCard',
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
.DButtonCard{
  width: 100%;
  display: flex;
  &-button{
    width: 90px;
  }
  // margin-left: 0px;
}
</style>

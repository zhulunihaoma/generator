<template>
    <div class="DBlock" >
         <slot></slot>
    </div>
</template>

<script>
import { onMounted, ref, reactive, nextTick } from 'vue'
import { events } from "../packages/events";
import { cloneDeep } from "lodash";
export default {
  name:'DBlock',
  props:{
      block:{
          type: Object,
          require: true
      },
      dropInComponent:{
          type: Object,
          require: true
      },
  },
  components:{
  },
  setup(props, ctx){
        //技术方案  整理拖拽方法 editor的递归完善，让中间区域与block组件 共用一套 useMenuDragger   或者通过 props 把获取到的组件数据传递给所有的block组件
        // 一类的组件信息 以及公共信息 抽成一个prop传进来
    return {

    }

  }
}
</script>

<style lang="scss">
.DBlock{
    // width: 100%;
    border: 2px dashed var(--el-border-color-base);
    min-height: 100px;
    box-sizing: border-box;
}
</style>

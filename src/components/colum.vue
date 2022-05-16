<template>
    <div :style=gridStyle class="DColum">
         <slot></slot>
         <!-- <Col v-for="(block, index) in columNum" :key="index" /> -->
    </div>
</template>

<script>
import { onMounted, ref, reactive, nextTick, computed } from 'vue'
import { cloneDeep } from "lodash";
import Col from './col.vue'
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
      Col
  },
  setup(props, ctx){
        const columNum = ref(2);
        const gridStyle = computed(()=>{
            const styles = {
                gridTemplateColumns: '1fr 1fr',

            }
            return styles;
        })
        //技术方案  整理拖拽方法 editor的递归完善，让中间区域与block组件 共用一套 useMenuDragger   或者通过 props 把获取到的组件数据传递给所有的block组件
        // 一类的组件信息 以及公共信息 抽成一个prop传进来
    return {
        columNum,
        gridStyle
    }

  }
}
</script>

<style lang="scss">
.DColum{
    border: 1px dotted #aaa;
    min-height: 100px;
    box-sizing: border-box;
    display: grid;
    // padding: 10px;
    // flex-direction: row;
    // flex-wrap: nowrap;
}
</style>

<template>
    <div class="ColumAttr">
        <el-collapse v-model="activeNames" @change="handleChange">
             <el-collapse-item title="组件特有属性" name="1">
                <el-form-item label="分栏数量">
                    <div class="ColumAttr-colNum">
                        <div @click="ChangeSelectColum(colum)" class="ColumAttr-colNum-item" v-for="colum in colums" :key="colum.key">
                            <div class="ColumAttr-colNum-item-container" :class="{'actived':colum.value === selectColNum}">
                                <div class="ColumAttr-colNum-item-container-col" :style="`flex-grow:${item};margin-left:${index == 0 ? 0 : 10}px`" v-for="(item, index) in colum.display" :key="index">

                                </div>
                            </div>
                        </div>
                    </div>
                </el-form-item>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
const props = defineProps({
  focusComponent: {
    type: Object
  }
});
const colums = reactive([
    {
        key:'1',
        value:'1',
        display:[1]
    },
    {
        key:'1|1',
        value:'1|1',
        display:[1,1]
    },
    {
        key:'1|1|1',
        value:'1|1|1',
        display:[1,1,1]
    },
    {
        key:'1|1|1|1',
        value:'1|1|1|1',
        display:[1,1,1,1]
    },
    {
        key:'1|3',
        value:'1|3',
        display:[1,3]
    },
    {
        key:'3|1',
        value:'3|1',
        display:[3,1]
    },
    {
        key:'1|2|1',
        value:'1|2|1',
        display:[1,2,1]
    },
    {
        key:'1|1|2',
        value:'1|1|2',
        display:[1,1,2]
    },
])
const selectColNum = ref('1|1');
//1、暴露内部数据
const emits = defineEmits(['UpdateAttr']);
const ChangeSelectColum = (colum)=>{
    selectColNum.value = colum.value;
    //2、触发父组件中暴露的childFn方法并携带数据
  emits('UpdateAttr',{
      colNum: selectColNum.value
  })
}
const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
  console.log(val)
}
</script>

<style lang="scss">
.ColumAttr{
    .el-form-item__content{
        display: block;
    }
    &-colNum{
        display: flex;

        flex-wrap: wrap;
        .actived {
            border-color: #4680ff;
            .ColumAttr-colNum-item-container-col {
                background: #4680ff;
            }
        }
        &-item{
            width: 32.5%;
            height: 80px;
            &-container{
                margin: 5px;
                padding: 6px;
                border: 1px solid #d9d9d9;
                display: flex;
                &-col{
                    background-color: rgba(187, 197, 213, 0.5);
                    height: 60px;
                }
            }
        }
    }
}
</style>
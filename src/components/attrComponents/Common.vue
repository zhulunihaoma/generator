<template>
    <div class="CommonAttr">
        <el-collapse v-model="activeNames" @change="handleChange">
             <el-collapse-item title="样式" name="1">
                <el-form-item label="背景色">
                    <el-color-picker @change="ChangeBackgroundColor" v-model="focusComponent.attr.componentStyle.backgroundColor" />
                </el-form-item>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, defineProps } from 'vue';
import { useSetAttr } from './AtrrSet';
import { cloneDeep } from 'loadsh';
    const activeNames = ref(['1'])
    const handleChange = (val: string[]) => {
    console.log(val)
    }
    const props = defineProps({
        focusComponent: {
          type: Object
        }
      });
    let emits = defineEmits(['UpdateAttr']);
    let focusComponent  =  useSetAttr(props,emits);
    const ChangeBackgroundColor = (val:string)=>{
        let focusComponentData = cloneDeep(focusComponent.value)
        focusComponentData.attr.componentStyle.backgroundColor = val;
        focusComponent.value= focusComponentData;
    }

</script>

<style>
.DCol{
    border: 1px dotted #aaaaaa;
    min-height: 90px;
}
</style>
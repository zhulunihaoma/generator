import { defineComponent, computed, inject, onMounted, ref } from 'vue';
import {ElForm, ElFormItem, ElInput, ElCollapse, ElCollapseItem, ElSelect, ElOption, ElColorPicker, ElSlider } from 'element-plus'
import './editor.scss';
import { cloneDeep } from "lodash";
export default defineComponent({
    props:{
        blockData: {
            type:Object
        },
        container: {
            type:Object
        },
    },
    components:{
        ElForm, ElFormItem, ElInput
    },
    setup(props, ctx){
        console.log('props-setting: ', props);
        const data = computed({
            get(){
                return props.blockData || {top:0};
            },
            set(newValue){
                console.log('newValue: ', newValue);
                ctx.emit('updateDataItem',cloneDeep(newValue));
                // ctx.emit('update:blockData', cloneDeep(newValue));
            }
        });
        onMounted(()=>{

        })
        const predefineColors = ref([
            '#ff4500',
            '#ff8c00',
            '#ffd700',
            '#90ee90',
            '#00ced1',
            '#1e90ff',
            '#c71585',
            'rgba(255, 69, 0, 0.68)',
            'rgb(255, 120, 0)',
            'hsv(51, 100, 98)',
            'hsva(120, 40, 94, 0.5)',
            'hsl(181, 100%, 37%)',
            'hsla(209, 100%, 56%, 0.73)',
            '#c7158577',
          ]);
        const activeNames = ref([]);
        const container = props.container;
        const handleChange = (val)=>{

        }
        const ChangeContainerPosition = ({key, val})=>{
            ctx.emit('updateContainer',{key, val});
        }
        const ChangeSetting = (val,key)=>{
            console.log('val: ', val);
            // data.left = val;
            data.value = {...data.value,[key]:val};
        }
        return ()=>{
            return <div class="setting-block">
                <ElCollapse modelValue={activeNames} onChange={(val)=>{handleChange(val)}}>
                    <ElCollapseItem title="页面属性" name="1">
                        <div>
                        <ElForm ref="formRef"  label-width="60px" label-position="top">
                            <ElFormItem label="布局方式">
                            <ElSelect onChange={(val)=>{ChangeContainerPosition({key:'position', val})}} modelValue={container.position} placeholder="please select your zone">
                                <ElOption label="固定布局" value="absolute"></ElOption>
                                <ElOption label="自适应布局" value="relative"></ElOption>
                            </ElSelect>
                            </ElFormItem>
                            <ElFormItem label="背景色">
                                <ElColorPicker onChange={(val)=>{ChangeContainerPosition({key:'backgroundColor', val})}} modelValue={container.backgroundColor} show-alpha predefine={predefineColors.value} />
                            </ElFormItem>
                            <ElFormItem label="宽">
                                <ElSlider max={900} onInput={(val)=>{ChangeContainerPosition({key:'width', val})}} modelValue={container.width} show-input/>
                            </ElFormItem>
                            <ElFormItem label="高">
                                <ElSlider max={900} onInput={(val)=>{ChangeContainerPosition({key:'height', val})}} modelValue={container.height} show-input/>
                            </ElFormItem>


                        </ElForm>
                        </div>
                    </ElCollapseItem>
                    <ElCollapseItem title="组件属性" name="2">
                        <div>
                        <ElForm ref="formRef"  label-width="60px" label-position="top">
                            <ElFormItem label="top">
                            <ElInput modelValue={data.value.top} onInput={(val)=>{ChangeSetting(val, 'top')}}></ElInput>
                            </ElFormItem>
                            <ElFormItem label="left">
                            <ElInput modelValue={data.value.left} onInput={(val)=>{ChangeSetting(val, 'left')}}></ElInput>
                            </ElFormItem>
                        </ElForm>
                        </div>
                    </ElCollapseItem>

                </ElCollapse>
            </div>
        }
    }
})

import { defineComponent, computed, inject, onMounted, ref, watch, reactive } from 'vue';
import {ElForm, ElFormItem, ElInput, ElCollapse, ElCollapseItem, ElSelect, ElOption, ElColorPicker, ElSlider, ElTabs, ElTabPane, } from 'element-plus'
import '../editor.scss';
import { registerLayoutConfig, registerBasicConfig, registerFieldConfig } from '../../utils/editor-config'
import { cloneDeep } from "lodash";
import { ComponentAttr } from '../../components/attrComponents/ComponentAttr';
import { setDefaultColumBlocks } from '../../utils/componentsOperate';
export default defineComponent({
    props:{
        focusComponent: {
            type:Object
        },
        container: {
            type:Object
        },
    },
    components:{
        ElForm, ElFormItem, ElInput, ElTabs, ElTabPane,
    },
    setup(props, ctx){
        const focusComponent = computed({
            get(){
                return props.focusComponent || {};
            },
            set(newValue){
                console.log('newValue====: ', newValue);
                ctx.emit('updateDataItem',cloneDeep(newValue));
                // ctx.emit('update:componentData', cloneDeep(newValue));
            }
        });
        const componentConfig = reactive({
                    config:{
                        ...registerLayoutConfig.componentMap,
                        ...registerBasicConfig.componentMap,
                        ...registerFieldConfig.componentMap
                    }
                }
        )
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
        const elTabsType = ref("attributes");
        const activeNames = ref([]);
        const container = props.container;
        const handleChange = (val)=>{

        }
        const ChangeContainerPosition = ({key, val})=>{
            ctx.emit('updateContainer',{key, val});
        }
        const ChangeSetting = (val,key)=>{
            data.value = {...data.value,[key]:val};
        }
        const UpdateAttr = (attr)=>{
            console.log('attr: ', attr);
            focusComponent.value.attr = attr;
            // debugger;
            if(focusComponent.value.key === 'colum'){
                const { colNum } = attr;
                const colNumList = colNum.split('|');
                const offset = colNumList.length - focusComponent.value.blocks.length;
                if(offset > 0){
                    console.log('offset: ', offset);
                    let data = cloneDeep(focusComponent.value)
                    const insertBlocks = setDefaultColumBlocks(focusComponent.value.id , offset);
                    console.log('setDefaultColumBlocks===: ', setDefaultColumBlocks(focusComponent.value.id , offset));
                    data.blocks = [...data.blocks, ...insertBlocks,];
                    console.log('data.blocks: ', data.blocks);
                    focusComponent.value = data;
                }else{
                    focusComponent.value.blocks.splice(Math.abs(offset),1);
                }

            }
        }
        return ()=>{
            return <div class="setting-block">
                <div className="setting-block-header">
                    <div className="setting-block-header-titleIcon">
                        {focusComponent.value.name || '全局视图'}
                    </div>
                </div>
                <div className="setting-block-content">
                    <ElTabs stretch={true} modelValue={elTabsType} class="demo-tabs">
                    <ElTabPane label="属性" name="attributes">
                    <el-form
                        label-position="top"
                        label-width="100px"
                        modelValue={focusComponent.value.attr}
                        style="max-width: 460px"
                    >
                        {
                          focusComponent.value.key && ComponentAttr[focusComponent.value.key](focusComponent, UpdateAttr)
                        }
                        {ComponentAttr['common'](focusComponent, UpdateAttr)}
                    </el-form>
                    </ElTabPane>
                    <ElTabPane label="事件" name="events"></ElTabPane>
                </ElTabs>

                </div>

            </div>
        }
    }
})

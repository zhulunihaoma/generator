import { computed, defineComponent, inject, ref, reactive, onMounted, watch, toRefs} from "vue";
import {
    CopyDocument,
    Delete
  } from '@element-plus/icons-vue'
import { ElIcon, ElButton } from 'element-plus'
import './editor.scss';
import EditorBlock from './editor-block';
import SettingBlock from './PageComponents/RightSetting';
import Header from './PageComponents/Header'
import Left from './PageComponents/Left'

import { cloneDeep } from 'loadsh'
import { useMenuDragger } from './useMenuDragger';
import { useFocus } from './useFocus'
import { useBlockDraggers } from "./useBlockDragger";
import { useCommand } from "./useCommand";
import { events } from "./events";
import { removeBlock, copyBlock, updateComponent } from '../utils/componentsOperate'
const imgsrc = require('../assets/images/pikachu.png');

export default defineComponent({
    props:{
        modelValue:{
            type: Object
        }
    },
    components:{
        EditorBlock,
        ElIcon,
        SettingBlock
    },
    emits:['update:modelValue'],
    setup(props, ctx){
        const data = computed({
            get(){
                return props.modelValue;
            },
            set(newValue){
                if(!newValue.attr){
                    newValue.attr = props.modelValue.attr;
                }
                ctx.emit('update:modelValue', cloneDeep(newValue));
            }
        });
        const containerStyles = computed(() => {
            const styles = {
                width: data.value.attr.componentStyle.width,
                height: data.value.attr.componentStyle.height + 'px',
                backgroundColor: data.value.attr.componentStyle.backgroundColor
            }
            return styles;
        })
        const containerRef = ref(null);
        // 1：实现菜单拖拽功能
        const {dragstart, dragend, currentComponent} = useMenuDragger(containerRef, data);

        // 2：实现获取焦点
         // 选中的组件
         let focusComponent = reactive({
                componentData: null
            })
        const {
            blockMouseDown,
            focusData,
            containerMousedown,
            lastSelectBlock
        } = useFocus(data,focusComponent,(e)=>{
            mousedown(e);
        });
        const computeComponent = computed(() => {
            return currentComponent;
        })
        // 3：实现画布的组件拖拽 实现画布的组件拖拽
        let { mousedown, markLine } = useBlockDraggers(focusData, lastSelectBlock, data);
        const { commands } = useCommand(data);
        // 更新属性
        const updateDataItem = (val)=>{
            const dataList = cloneDeep(data.value);
            // 递归查找然后替换
            debugger;
            updateComponent(data.value, val)
            // data.value = dataList;
        }
        // 更新container
        const updateContainer = ({key, val})=>{
            data.value.attr.componentStyle[key] = val;
        }
         // 更新(清空画布)data.Block
         const updateBlocks = (val)=>{
            data.value.blocks = val;
        }
        // 已有组件的拖拽
        const focusMouseDown = (e)=>{
            e.stopPropagation();
        }

        const updateFocusComponent =(component)=>{
            focusComponent.componentData = component
        }
        // 操作组件
        const copyComponent = ()=>{
            copyBlock()(data.value, focusComponent.componentData)
            const positionDiv = document.getElementById('editor-block-focus');
            positionDiv.style.display = "none";
        }
        const deleteComponent = ()=>{
            removeBlock()(data.value, focusComponent.componentData)
            const positionDiv = document.getElementById('editor-block-focus');
            positionDiv.style.display = "none";
        }
        //
        // 渲染布局组件updateComponent
        const renderBlock = (data)=>{
              return  (data.blocks.map((block, index)=>{
                  return <EditorBlock
                            onUpdateFocusComponent = {updateFocusComponent}
                            currentComponent={computeComponent}
                            block={block} container={data.attr}
                            class={block.focus ? 'editor-block-focus' : ''}
                            // OnInComponentMouseDown={inComponentMouseDown}
                            index={index}
                            // onMousedown={(e)=>{blockMouseDown(e, block, index)}}
                            >
                            测试
                        </EditorBlock>
                }))

        }
        return ()=> <div class="editor">
            <Left onComponentDragstart={dragstart} onComponentDragend={dragend}></Left>
            <Header onUpdateBlocks={updateBlocks} data={data}></Header>
            <div class="editor-right">
                <SettingBlock focusComponent={focusComponent.componentData || data.value} container={data.value} onUpdateDataItem={updateDataItem} onUpdateContainer={updateContainer}></SettingBlock>
            </div>
            <div class="editor-container">
                {/* {负责产生滚动条} */}
                <div className="editor-container-canvas">
                {/* {产生内容区域} */}
                    <div className="editor-block" id="1">
                        <div className="editor-container-canvas__content" onMousedown={containerMousedown} style={containerStyles.value} ref={containerRef}>
                            <div onMousedown={focusMouseDown} draggable onDragstart={e=>dragstart({e, component: focusComponent.componentData})} onDragend={dragend} className="editor-block-focus" id="editor-block-focus">
                                <div className="editor-block-focus-box"></div>
                                <div className="editor-block-focus-tools">
                                    <ElButton type="primary" icon={CopyDocument} onClick={copyComponent} circle />
                                    <ElButton type="primary" icon={Delete} onClick={deleteComponent} circle />
                                </div>
                            </div>
                            {renderBlock(data.value)}
                            {
                                markLine.x !== null && <div class="line-x" style={{left:markLine.x + 'px'}}></div>
                            }
                            {
                                markLine.y !== null && <div class="line-y" style={{top:markLine.y + 'px'}}></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
})
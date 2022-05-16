import { computed, defineComponent, inject, ref, reactive, onMounted} from "vue";
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
import { componentDragger } from "./componentDragger"
import { useCommand } from "./useCommand";
import { events } from "./events";
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
                if(!newValue.container){
                    newValue.container = props.modelValue.container;
                }
                ctx.emit('update:modelValue', cloneDeep(newValue));
            }
        });
        const containerStyles = computed(() => {
            const styles = {
                width: data.value.container.width + 'px',
                height: data.value.container.height + 'px',
                backgroundColor: data.value.container.backgroundColor
            }
            return styles;
        })
        const containerRef = ref(null);
        // 1：实现菜单拖拽功能
        const {dragstart, dragend, currentComponent} = useMenuDragger(containerRef, data);

        // 2：实现获取焦点
        const {
            blockMouseDown,
            focusData,
            containerMousedown,
            lastSelectBlock
        } = useFocus(data,(e)=>{
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
            dataList.blocks.forEach(block=>{
                if(block.id === val.id){
                    block.top = val.top;
                    block.left = val.left;
                    block.blocks = val.blocks;
                    // block = {...block, ...val};
                }
            })
            data.value = dataList;
        }
        // 更新container
        const updateContainer = ({key, val})=>{
            data.value.container[key] = val;
        }
        // onMounted(()=>{
        //     window.document.addEventListener('onMousedown',(e)=>{
        //         debugger;
        //         console.log('onMousedown>>>>>>e: ', e);
        //     })
        // })
        // 已有组件的拖拽
        const focusMouseDown = (e)=>{
            e.stopPropagation();
        }
        // 选中的组件
        let focusComponent = reactive();

        const updateFocusComponent =(component)=>{
            focusComponent = component;
        }

        // 渲染布局组件
        const renderBlock = (data)=>{
              return  (data.blocks.map((block, index)=>{
                  return <EditorBlock
                            onUpdateDataItem= {updateDataItem}
                            onUpdateFocusComponent = {updateFocusComponent}
                            currentComponent={computeComponent}
                            block={block} container={data.container}
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
            <Header data={data}></Header>
            <div class="editor-right">
                <SettingBlock blockData={lastSelectBlock.value} container={data.value.container} onUpdateDataItem={updateDataItem} onUpdateContainer={updateContainer}></SettingBlock>
            </div>
            <div class="editor-container">
                {/* {负责产生滚动条} */}
                <div className="editor-container-canvas">
                {/* {产生内容区域} */}
                    <div className="editor-block" id="1">
                        <div className="editor-container-canvas__content" onMousedown={containerMousedown} style={containerStyles.value} ref={containerRef}>
                            <div onMousedown={focusMouseDown} draggable onDragstart={e=>dragstart({e, component: focusComponent})} onDragend={dragend} className="editor-block-focus" id="editor-block-focus">
                                <div className="editor-block-focus-tools">
                                    <ElButton type="primary" icon={CopyDocument} circle />
                                    <ElButton type="primary" icon={Delete} circle />
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
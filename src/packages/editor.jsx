import { computed, defineComponent, inject, ref, reactive, onMounted} from "vue";
import {
    CopyDocument,
    Delete,
  } from '@element-plus/icons-vue'
import { ElIcon, ElButton } from 'element-plus'
import './editor.scss';
import EditorBlock from './editor-block';
import SettingBlock from './setting-block'
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
        console.log('props: ', props.modelValue);
        const data = computed({
            get(){
                return props.modelValue;
            },
            set(newValue){
                console.log('newValue: ', newValue);
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
            console.log('styles: ', styles);
            return styles;
        })
        const config = inject('config');
        console.log('data: ', data.value.blocks);
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
            console.log('currentComponenteditor: ', currentComponent);
            return currentComponent;
        })
        // 3：实现画布的组件拖拽 实现画布的组件拖拽
        let { mousedown, markLine } = useBlockDraggers(focusData, lastSelectBlock, data);
        const { commands } = useCommand(data);
        console.log('commands: ', commands);
        const buttons = [
            {
                label:'撤销',
                icon:'Back',
                handle:()=> commands.undo()
            },
            {
                label:'重做',
                icon:'RefreshLeft',
                handle:()=> commands.redo()
            }
        ]
        // 更新属性
        const updateDataItem = (val)=>{
            console.log('valupdateDataItem: ', val);
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
            console.log('data.value: ', data.value);
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
        const {focusDragstart, focusDragend} = componentDragger(containerRef, data);

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
            <div class="editor-left">
                {config.componentList.map(component=>{
                 return <div draggable onDragstart={e=>dragstart(e, component)} onDragend={dragend} class="editor-left-item">
                        <span>
                            {component.label}
                        </span>
                        {/* <div> */}
                            {component.preview()}
                        {/* </div> */}
                    </div>
                })}

            </div>
            <div class="editor-top">
                {
                    buttons.map(button=>{
                        return  <div onClick={button.handle} class="editor-top-button">
                            <ElIcon class={button.icon}></ElIcon>
                            <span>{button.label}</span>
                        </div>
                    })
                }
            </div>
            <div class="editor-right">
                <SettingBlock blockData={lastSelectBlock.value} container={data.value.container} onUpdateDataItem={updateDataItem} onUpdateContainer={updateContainer}></SettingBlock>
            </div>
            <div class="editor-container">
                {/* {负责产生滚动条} */}
                <div className="editor-container-canvas">
                {/* {产生内容区域} */}
                <div className="editor-container-canvas__content" id="container" onMousedown={containerMousedown} style={containerStyles.value} ref={containerRef}>
                    <div onMousedown={focusMouseDown} draggable onDragstart={e=>focusDragstart(e, focusComponent)} onDragend={focusDragend}  id="editor-block-focus">
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
    }
})
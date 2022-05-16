import { defineComponent, computed, inject, onMounted, ref } from 'vue';
import { ElButton } from "element-plus";
import { registerLayoutConfig, registerBasicConfig, registerFieldConfig } from '../utils/editor-config'
export default defineComponent({
    props:{
        block:{
            type:Object
        },
        container: {
            type:Object
        },
        currentComponent:{
            type: Object
        },
        index:{
            type:Number
        }
    },
    setup(props, ctx){
        const blockRef = ref(null);
        // 所有组件的配置
        const componentConfig = {
            ...registerLayoutConfig.componentMap,
            ...registerBasicConfig.componentMap,
            ...registerFieldConfig.componentMap
        }
        onMounted(()=>{
            let {offsetWidth, offsetHeight } = blockRef.value;
            if(props.block.alignCenter){//手动拖拽的时候才居中渲染，其他的默认渲染到界面上的内容不需要居中
                props.block.left = props.block.left - offsetWidth / 2;
                props.block.top = props.block.top - offsetHeight / 2; //原则上需要重新派发时间（emit之类） 但是vue3里面可以直接改
                props.block.alignCenter = false;
            }
            props.block.width = offsetWidth;
            props.block.height = offsetHeight;
        })
        const blockStyles = computed(()=>{
            if(props.container.position === 'absolute'){
                return {
                    top:`${props.block.top}px`,
                    left:`${props.block.left}px`,
                    zIndex:`${props.block.zIndex}`,
                    position: `${props.block.position}`,
                }
            }else{
                return {
                    left:`0px`,
                    zIndex:`${props.block.zIndex}`,
                }
            }
        })
        const updateDataItem = (value)=>{
            ctx.emit('updateDataItem', value)
        }
       const inComponentMouseDown = (e, block, index)=>{
           const positionDiv = document.getElementById('editor-block-focus');
           ctx.emit('updateFocusComponent', {...block, index})
           let currentComponent = e.target;
            // 还可以根据id直接获取组件dom
            while (!currentComponent.classList.contains('editor-block')) {
                currentComponent =  currentComponent.parentNode;
            }
            const componentId = currentComponent.id;
            positionDiv.style.display = "block";
            positionDiv.style.top = currentComponent.offsetTop + "px";
            positionDiv.style.left = currentComponent.offsetLeft + "px";
            positionDiv.style.width = currentComponent.offsetWidth + "px";
            positionDiv.style.height = (currentComponent.offsetHeight) + "px";
            // console.log('componentId: ', currentComponent);
        //    e.target.parentNode.classList.add('editor-block-focus');
            e.stopPropagation();
            // ctx.emit('inComponentMouseDown', e, block, index)
       }
        // 组装出一个 嵌套的block 外面要套一层div 优化
       const renderSubBlock  = (blocks)=>{
            return  blocks.map((block, index)=>{
                return  RenderComponent(block, index);
            })
        }
        const renderBlock = (block)=>{
            const component = componentConfig[block.key];
            const slotComponents = [];
            if(block.blocks && block.blocks.length){
                const ComponentRender = component.render(block, renderSubBlock(block.blocks), props.currentComponent);
                return ComponentRender;
            }else{
                const ComponentRender = component.render(block, slotComponents, props.currentComponent);
                return ComponentRender;
            }
        }
        const RenderComponent = (block, index)=>{
            // block当前要渲染的block renderBlock内嵌的slot 循环组件 props.curre拖进去的组件 updateDataItem更新的方法
          return  <div onMousedown={(e)=>{inComponentMouseDown(e, block, index)}} class="editor-block" index={index} id={block.id} style={blockStyles.value} ref={blockRef}>
                {renderBlock(block)}
            </div>
        // return  renderBlock(block);
        }
        return ()=>{
            return RenderComponent(props.block, props.index);
        }
    }
})
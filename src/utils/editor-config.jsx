// 列表区可以显示所有的物料
//
import { ElButton, ElInput } from 'element-plus'
import DButton from "../components/button";
import Block from '../components/block';
import Select from '../components/select.vue'
function createEditorConfig() {
        const componentList = [];
        const componentMap = {};
        return {
            componentList,
            componentMap,
            register:(component)=>{
                componentList.push(
                    component
                );
                componentMap[component.key] = component;
            }
        }

}
export let registerConfig = createEditorConfig();
console.log('registerConfig: ', registerConfig);
registerConfig.register({
    label:'文本',
    preview:()=>'预览文本',
    render:()=> <div class="DText">渲染文本</div>,
    key: 'text'
});
registerConfig.register({
    label:'按钮',
    preview:()=><ElButton>预览按钮</ElButton>,
    render:(block,slotComponents)=> {
        return <DButton block={block}></DButton>
    },
    key: 'button'
});
registerConfig.register({
    label:'输入框',
    preview:()=><ElInput placeholder="预览输入框"></ElInput>,
    render:()=> <ElInput class="DInput" placeholder="渲染输入框"></ElInput>,
    key: 'input'
});
registerConfig.register({
    label:'行容器',
    preview:()=><Block block={{}}></Block>,
    render:(block,slotComponents, dropInComponent, updateDataItem, hideContainerPositionLine)=> {
        return <Block onHideContainerPositionLine={hideContainerPositionLine} onUpdateDataItem={updateDataItem} block={block}>{...slotComponents}</Block>
    },
    key: 'block'
});
registerConfig.register({
    label:'选择框',
    preview:()=><ElInput placeholder="预览输入框"></ElInput>,
    render:()=> <Select></Select>,
    key: 'select'
});
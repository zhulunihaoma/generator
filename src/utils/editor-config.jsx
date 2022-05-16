// 列表区可以显示所有的物料
//
import { ElButton, ElInput } from 'element-plus'
import Block from '../components/block';
import Select from '../components/select.vue'
import Colum from '../components/colum.vue'
import Col from '../components/col.vue'
import Tabs from '../components/tabs.vue'
import Flodpanel from '../components/flodpanel.vue'
import Tittle from '../components/basicComponents/title.vue'
import Text from '../components/basicComponents/text.vue'
import DButton from "../components/basicComponents/button";
import DButtonCard from "../components/basicComponents/buttonCard";
import DTableList from "../components/basicComponents/tableList.vue";
import DAssociatedApp from "../components/basicComponents/associatedApp.vue";


export const NeedsColComponent = ['colum','tabs', 'flodpanel']
export const ElementComponentsClass = ['DSelect','DButton', 'DText', 'DInput']
export const BlockComponentsClass = ['DBlock','DCol','editor-container-canvas__content']
export const ComponentsClass = [...ElementComponentsClass, ...BlockComponentsClass];
// 工厂模式方法？
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
// 布局组件的注册
export let registerLayoutConfig = createEditorConfig();
registerLayoutConfig.register({
    label:'区块',
    preview:()=> <img src={require('../assets/img/block.png')} />,
    render:(block,slotComponents)=> {
        return <Block block={block}>{...slotComponents}</Block>
    },
    key: 'block'
});
registerLayoutConfig.register({
    label:'分栏',
    preview:()=> <img src={require('../assets/img/Column.png')} />,
    render:(block,slotComponents)=> {
        return <Colum block={block}>{...slotComponents}</Colum>
    },
    key: 'colum'
});
registerLayoutConfig.register({
    label:'子分栏',
    preview:()=> '',
    render:(block, slotComponents)=> <Col block={block}>{...slotComponents}</Col>,
    key: 'col'
});
registerLayoutConfig.register({
    label:'页签',
    preview:()=> <img src={require('../assets/img/tab.png')} />,
    render:(block, slotComponents)=> <Tabs block={block}>{...slotComponents}</Tabs>,
    key: 'tabs'
});
registerLayoutConfig.register({
    label:'折叠面板',
    preview:()=> <img src={require('../assets/img/tab.png')} />,
    render:(block, slotComponents)=> <Flodpanel block={block}>{...slotComponents}</Flodpanel>,
    key: 'flodpanel'
});
// 基础组件的注册
export let registerBasicConfig = createEditorConfig();
registerBasicConfig.register({
    label:'标题',
    preview:()=> <img src={require('../assets/img/layout_Title.png')} />,
    render:()=> <Tittle ></Tittle>,
    key: 'title'
});
registerBasicConfig.register({
    label:'文本',
    preview:()=> <img src={require('../assets/img/layout_Text.png')} />,
    render:()=> <Text>渲染文本</Text>,
    key: 'text'
});
registerBasicConfig.register({
    label:'按钮',
    preview:()=> <img src={require('../assets/img/layout_button.png')} />,
    render:(block,slotComponents)=> {
        return <DButton block={block}></DButton>
    },
    key: 'button'
});
registerBasicConfig.register({
    label:'按钮卡',
    preview:()=> <img src={require('../assets/img/button.png')} />,
    render:()=> <DButtonCard></DButtonCard>,
    key: 'buttonCard'
});
registerBasicConfig.register({
    label:'多行记录',
    preview:()=> <img src={require('../assets/img/layout_record.png')} />,
    render:()=> <DTableList>渲染文本</DTableList>,
    key: 'tableList'
});
registerBasicConfig.register({
    label:'关联应用',
    preview:()=> <img src={require('../assets/img/layout_associated.png')} />,
    render:()=> <DAssociatedApp></DAssociatedApp>,
    key: 'associatedapp'
});
// 字段组件的注册
export let registerFieldConfig = createEditorConfig();
registerFieldConfig.register({
    label:'文本',
    preview:()=>'预览文本',
    render:()=> <div class="DText">渲染文本</div>,
    key: 'text'
});
registerFieldConfig.register({
    label:'按钮',
    preview:()=><ElButton>预览按钮</ElButton>,
    render:(block,slotComponents)=> {
        return <DButton block={block}></DButton>
    },
    key: 'button'
});
registerFieldConfig.register({
    label:'输入框',
    preview:()=><ElInput placeholder="预览输入框"></ElInput>,
    render:()=> <ElInput class="DInput" placeholder="渲染输入框"></ElInput>,
    key: 'input'
});
registerFieldConfig.register({
    label:'行容器',
    preview:()=><Block block={{}}></Block>,
    render:(block,slotComponents)=> {
        return <Block block={block}>{...slotComponents}</Block>
    },
    key: 'block'
});
registerFieldConfig.register({
    label:'选择框',
    preview:()=><ElInput placeholder="预览输入框"></ElInput>,
    render:()=> <Select></Select>,
    key: 'select'
});
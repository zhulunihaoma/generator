// 列表区可以显示所有的物料
//
import { ElButton, ElInput, ElSelect } from 'element-plus'
import Block from '../components/block';
import Colum from '../components/colum.vue'
import Col from '../components/col.vue'
import Tabs from '../components/tabs.vue'
import Flodpanel from '../components/flodpanel.vue'

import Tittle from '../components/basicComponents/title.vue'
import Text from '../components/basicComponents/text.vue';
import DSelect from '../components/basicComponents/select.vue'
import Radio from '../components/basicComponents/radio.vue'
import Rate from '../components/basicComponents/rate.vue'
import Input from '../components/basicComponents/input.vue'

import DButton from "../components/basicComponents/button";
import DButtonCard from "../components/basicComponents/buttonCard";
import DTableList from "../components/basicComponents/tableList.vue";
import DAssociatedApp from "../components/basicComponents/associatedApp.vue";


export const NeedsColComponent = ['colum','tabs', 'flodpanel']
export const ElementComponentsClass = ['DSelect','DButton', 'DText', 'DInput', 'DTitle','DRadio', 'DRate','DButtonCard', 'DAssociateApp']
export const BlockComponentsClass = ['DBlock','DColum','DCol','DTabs','DFlodpanel','editor-container-canvas__content']
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
        console.log('block====: ', block);
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
    render:(block)=> <Tittle block={block}></Tittle>,
    key: 'title'
});
registerBasicConfig.register({
    label:'文本',
    preview:()=> <img src={require('../assets/img/layout_Text.png')} />,
    render:(block)=> <Text block={block}>渲染文本</Text>,
    key: 'text'
});
registerBasicConfig.register({
    label:'按钮',
    preview:()=> <img src={require('../assets/img/layout_button.png')} />,
    render:(block)=> {
        return <DButton block={block}></DButton>
    },
    key: 'button'
});
registerBasicConfig.register({
    label:'按钮卡',
    preview:()=> <img src={require('../assets/img/button.png')} />,
    render:(block)=> <DButtonCard block={block}></DButtonCard>,
    key: 'buttonCard'
});
registerBasicConfig.register({
    label:'多行记录',
    preview:()=> <img src={require('../assets/img/layout_record.png')} />,
    render:(block)=> <DTableList block={block}>渲染文本</DTableList>,
    key: 'tableList'
});
registerBasicConfig.register({
    label:'关联应用',
    preview:()=> <img src={require('../assets/img/layout_associated.png')} />,
    render:(block)=> <DAssociatedApp block={block}></DAssociatedApp>,
    key: 'associatedapp'
});
// 字段组件的注册
export let registerFieldConfig = createEditorConfig();
registerFieldConfig.register({
    label:'文本',
    preview:()=>'预览文本',
    render:(block)=> <Text block={block}>渲染文本</Text>,
    key: 'text'
});
registerFieldConfig.register({
    label:'按钮',
    preview:()=><ElButton>预览按钮</ElButton>,
    render:(block)=> {
        return <DButton block={block}></DButton>
    },
    key: 'button'
});
registerFieldConfig.register({
    label:'输入框',
    preview:()=><ElInput placeholder="预览输入框"></ElInput>,
    render:(block)=> <Input block={block}></Input>,
    key: 'input'
});
registerFieldConfig.register({
    label:'选择框',
    preview:()=><ElSelect placeholder="请选择一个选项"></ElSelect>,
    render:(block)=> {
        return <DSelect block={block}></DSelect>
    },
    key: 'select'
});
registerFieldConfig.register({
    label:'单选',
    preview:()=><ElRadio></ElRadio>,
    render:(block)=> {
        return <Radio block={block}></Radio>
    },
    key: 'radio'
});
registerFieldConfig.register({
    label:'评分',
    preview:()=><ElRate placeholder="预览输入框"></ElRate>,
    render:(block)=> {
        return <Rate block={block}></Rate>
    },
    key: 'rate'
});
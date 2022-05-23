import Common from './Common.vue';
import Colum from './Colum.vue';
export const ComponentAttr = {
    common: (focusComponent, UpdateAttr)=> <Common onUpdateAttr={UpdateAttr} focusComponent={focusComponent}></Common>,
    container: (focusComponent)=> <span>全局属性</span>,
    block: (focusComponent)=> <span></span>,
    colum: (focusComponent, UpdateAttr)=> <Colum onUpdateAttr={UpdateAttr} focusComponent={focusComponent}></Colum>,
    col: (focusComponent)=> <span focusComponent={focusComponent}>子分栏属性</span>,
    block: (focusComponent)=> <span focusComponent={focusComponent}>区块属性</span>,
    tabs: (focusComponent)=> <span focusComponent={focusComponent}>页签属性</span>,
    flodpanel: (focusComponent)=> <span focusComponent={focusComponent}>折叠面板属性</span>,
    title: (focusComponent)=> <span focusComponent={focusComponent}>标题属性</span>,
    text:(focusComponent)=> <span focusComponent={focusComponent}>文本属性</span>,
    button:(focusComponent)=> <span focusComponent={focusComponent}></span>,
    buttonCard:(focusComponent)=> <span focusComponent={focusComponent}></span>,
    tableList:(focusComponent)=> <span focusComponent={focusComponent}></span>,
    associatedapp:(focusComponent)=> <span focusComponent={focusComponent}></span>,
    input:(focusComponent)=> <span focusComponent={focusComponent}>输入框属性</span>,
    select:(focusComponent)=> <span focusComponent={focusComponent}>选择框属性</span>,
    radio:(focusComponent)=> <span focusComponent={focusComponent}>单选属性</span>,
    rate:(focusComponent)=> <span focusComponent={focusComponent}>评分属性</span>,
}
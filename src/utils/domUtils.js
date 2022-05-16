import { ComponentsClass, BlockComponentsClass } from "./editor-config";
import { insertComponentToContainer, insertComponentToBlock } from '../utils/componentsOperate'
const positionDiv = document.createElement('div');
positionDiv.id = "positionLine-stickyTop";
export const insertAfter = (newElement, targetElement)=>{
    let parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}
/**
 * 查找元素的父布局
 * @param {*} dom
 * @returns
 */
export const findParentBlockDom = (dom)=>{
    let parentBlockDom = dom;
    // 还可以根据id直接获取组件dom
    while (!BlockComponentsClass.some(className=>{
        return parentBlockDom.classList.contains(className);
    })) {
        parentBlockDom =  parentBlockDom.parentNode;
    }
    return parentBlockDom;
}
/**
 * 查找元素属于哪个分布局组件class
 * @param {*} dom
 * @returns
 */
 export const findSelfComponentDom = (dom)=>{

    let selfComponentDom = dom;
    // 还可以根据id直接获取组件dom
    while (!ComponentsClass.some(className=>{
        return selfComponentDom.classList.contains(className);
    })) {
        selfComponentDom =  selfComponentDom.parentNode;
    }
    return selfComponentDom;
}
/**
 * dragenter事件方法
 * @param {*} e
 */
export const dragenterCommonds = ({e})=>{
    if (BlockComponentsClass.indexOf(e.target.className) > -1) {
        // 如果拖拽到最外层画布
        positionDiv.setAttribute('positionLineId',e.target.parentNode.id);
        // positionDiv && positionDiv.remove();
        e.target.appendChild(positionDiv);
    }
}
/**
 * dragover事件方法
 * @param {*} e
 */
export const dragoverCommonds = ({e})=>{
    // console.log('dragover: ', e.target.classList);
    // 如果目标是非布局组件
    if([...BlockComponentsClass, 'editor-block', 'editor-block-focus'].indexOf(e.target.classList[e.target.classList.length -1]) === -1 && e.target.id !== "positionLine-stickyTop"){
        console.log('e.target.classList: ', e.target.classList);
        const offsetY =  e.offsetY;
        const elementOffset = offsetY - (e.target.parentNode.offsetHeight/2);
        // 偏移量大于0在后面添加
        // 查找到离当前节点最近的布局组件的外层包裹dom 即editor-block的dom
        const selfComponentDom = findSelfComponentDom(e.target);
        const parentBlockDom = findParentBlockDom(e.target);
        console.log('selfComponentDom=========: ', selfComponentDom.parentNode, selfComponentDom.parentNode.id);
        console.log('parentBlockDom===========: ', parentBlockDom.parentNode, parentBlockDom.parentNode.id);
        console.log('elementOffset============: ', elementOffset);
        positionDiv.setAttribute('offset',elementOffset);
        positionDiv.setAttribute('positionLineId',parentBlockDom.parentNode.id);
        positionDiv.setAttribute('offsetId',selfComponentDom.parentNode.id);
        // debugger;
        if(elementOffset > 0){
            insertAfter(positionDiv, selfComponentDom);
        }else{//否则在前面添加
            parentBlockDom.insertBefore(positionDiv, selfComponentDom.parentNode);
        }
    }else{

    }
}
export const dragCommonds = ({e, data, currentComponent})=>{
    // 如果是排序
    const blockId = positionDiv.getAttribute('positionLineId');
    const offset = positionDiv.getAttribute('offset');
    console.log('offset========: ', offset);
    console.log('blockId=======: ', blockId);
    if(positionDiv.getAttribute('offset')){
        insertComponentToBlock(data.value, e, currentComponent, positionDiv);
    }else{
        insertComponentToBlock(data.value, e, currentComponent, positionDiv);
    }
    currentComponent = null;
    positionDiv.removeAttribute('offset')
    positionDiv.removeAttribute('positionLineId')
    positionDiv.removeAttribute('offsetId')
    positionDiv && positionDiv.remove();
}
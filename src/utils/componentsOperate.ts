
import { NeedsColComponent } from '../utils/editor-config.jsx';
import { cloneDeep } from 'loadsh';
export const setDefaultColumBlocks = (parentId, num)=>{
    let blocks = []
    for(let i = 0; i< num; i++){
        blocks.push({
            id: (Date.parse(new Date())+ i).toString(),
            parentId: parentId,
            top: 0,
            left: 0,
            zIndex: 1,
            key: 'col',
            blocks:[],
            alignCenter: true //松手的时候 居中
        })
    }
    return blocks;
}
/**
 * 在布局组件中插入组件
 * @param block 全局数据
 * @param e 触发事件的e
 * @param currentComponent //当前插入的组件
 * @param positionDiv
 */
export const insertComponentToBlock = (block, e, currentComponent, positionDiv)=>{
    //blockId 占位div所在布局组件的id
    let newId;
    newId = 0;
    const blockId = positionDiv.getAttribute('positionLineId');
    const offset = positionDiv.getAttribute('offset');
    const offsetId = positionDiv.getAttribute('offsetId');
    const componentPositionDiv = document.getElementById('editor-block-focus');
    componentPositionDiv.style.display = "none";
    if(currentComponent.id){
        removeBlock()(block, currentComponent);
    }
    if(blockId === '1' || (blockId + '' === block.id + '')){
        newId = Date.parse(new Date()).toString();
        if(!block.blocks) block.blocks  = [];
        if(offset){
            const offsetIndex = offset > 0 ? findIndex(block.blocks, offsetId) + 1 : findIndex(block.blocks, offsetId);
            // console.log('findIndex: ', block.blocks, offsetId, findIndex(block.blocks, offsetId));
            // console.log('offsetIndex====: ', offsetIndex);
            block.blocks.splice(offsetIndex, 0, currentComponent.id ? currentComponent : {
                id: newId,
                parentId: block.id,
                top: e.offsetY,
                left: 0,
                zIndex: 1,
                key: currentComponent.key,
                blocks:NeedsColComponent.includes(currentComponent.key) ? setDefaultColumBlocks(newId, currentComponent.key === 'colum' ? 2: 1) : [],
                alignCenter: true //松手的时候 居中
            });
        }else{
            block.blocks.push(currentComponent.id ? currentComponent : {
                id: newId,
                parentId: block.id,
                top: e.offsetY,
                left: 0,
                zIndex: 1,
                key: currentComponent.key,
                blocks:NeedsColComponent.includes(currentComponent.key) ? setDefaultColumBlocks(newId, currentComponent.key === 'colum' ? 2: 1) : [],
                alignCenter: true //松手的时候 居中
            })
        }
    }else if (block.blocks){
        block.blocks.forEach((subBlock, index)=>{
            insertComponentToBlock(subBlock, e ,currentComponent, positionDiv)
        })
    }
}
/**
 * 查找一个组件所在的下标
 * @param blocks
 * @param componentId
 * @returns index
 */
const findIndex =(blocks, componentId)=>{
   return blocks.findIndex((block)=>block.id + '' === componentId + '');
}
/**
 * 获取一个组件的父组件id
 * @param componentId
 * @param block
 */
export const getParentBlockId = (componentId:string,block)=>{
    block.blocks.forEach(subBlock=>{
        if(subBlock.id === componentId){
            return block.id;
        }
        if(subBlock.blocks){
            getParentBlockId(componentId, subBlock)
        }
    })
}
/**
 *
 * @returns 删除一个组件
 */
export const removeBlock = ()=>{
    let findFlag = 0;
     const removeSub = (block, component)=>{
        block.blocks && block.blocks.forEach((subBlock)=>{
            if(subBlock.id === component.id){
                block.blocks.splice(component.index, 1);
                findFlag ++;
                return;
            }else if(subBlock.blocks &&  subBlock.blocks.length && findFlag === 0){
                removeSub(subBlock, component)
            }
        })
    }
    return removeSub;
}
export const copyBlock = ()=>{
    let findFlag = 0;
     const removeSub = (block, component)=>{
        block.blocks && block.blocks.forEach((subBlock)=>{
            if(subBlock.id === component.id){
                block.blocks.splice(component.index+1, 0, updateComponentId(cloneDeep(component)));
                findFlag ++;
                return;
            }else if(subBlock.blocks &&  subBlock.blocks.length && findFlag === 0){
                removeSub(subBlock, component)
            }
        })
    }
    return removeSub;
}

const updateComponentId = (component)=>{
    component.id = component.id + (new Date().getTime()+ 1).toString();
    component.blocks && component.blocks.forEach((data, index) => {
        if(data.blocks){
            updateComponentId(data);
        }
    });
    return component;
}
/**
 *  删除一个组件，在另一个地方插入
 * @param {*} block 全局组件数据
 * @param {*} newBlockId
 * @param {*} removeBlockId
 * @param {*} component
 */
export const exchangeBlock = (block, newBlockId:string, removeBlockId, component)=>{
    if(block.id === removeBlockId){
        block.blocks.splice(component.index, 1);
    }
    if(block.id === newBlockId){
        block.blocks.push({...component,parentId:block.id});
    }
    block.blocks.forEach((subBlock)=>{
        if(subBlock.blocks){
            exchangeBlock(subBlock, newBlockId, removeBlockId, component)
        }
    })
}
/**
 * 更新属性
 */
export const updateComponent = (data,component)=>{
    if(data.id === component.id){
        data.attr = component.attr;
        if(component.key === 'colum'){
            data.blocks = component.blocks;
        }
    }
    data.blocks && data.blocks.forEach(subData => {
        updateComponent(subData, component);
    });
}
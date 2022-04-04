let data = {};
let removeIndex = -1;
export const getParentBlockId = (componentId,block)=>{
    block.blocks.forEach(subBlock=>{
        if(subBlock.id === componentId){
            return block.id;
        }
        if(subBlock.blocks){
            getParentBlockId(componentId, subBlock)
        }
    })
}
// 删除一个组件，在另一个地方插入
/**
 *
 * @param {*} block 全局组件数据
 * @param {*} newBlockId
 * @param {*} removeBlockId
 * @param {*} component
 */
export const exchangeBlock = (block, newBlockId, removeBlockId, component)=>{
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


// 在某个位置以及顺序下插入一个元素


export const findBlock = (block, blockId, e, elementOffset, currentComponent, removeBlockId)=>{
    let insertIndex = -1;
    block.blocks.forEach((subBlock, index)=>{
        if(removeIndex === -1 && currentComponent.id && ((subBlock.id*1)  === (currentComponent.id *1))){
            removeIndex = index;

        }
        if((subBlock.id*1)  === (blockId *1)){
            if(elementOffset){
                insertIndex = index;
            }else{
                subBlock.blocks.push(currentComponent.id ? currentComponent : {
                    id: Date.parse(new Date()),
                    parentId: subBlock.id,
                    top: e.offsetY,
                    left: data.container.position === 'absolute' ? e.offsetX : '0',
                    zIndex: 1,
                    key: currentComponent.key,
                    blocks:[],
                    alignCenter: true //松手的时候 居中
                })
            }

        }
        if(subBlock.blocks && subBlock.blocks.length){
            operateBlocks(subBlock, blockId, e, elementOffset, currentComponent, removeBlockId)
        }
    })
    if(removeIndex> -1){
        block.blocks.splice(removeIndex, 1);
        removeIndex = -2
    }
    if(elementOffset && insertIndex > -1){
        const newComponent = currentComponent.id ? {...currentComponent, parentId: block.parentId,} :{
            id: Date.parse(new Date()),
            parentId: block.parentId,
            top: e.offsetY,
            left: data.container.position === 'absolute' ? e.offsetX : '0',
            zIndex: 1,
            key: currentComponent.key,
            blocks:[],
            alignCenter: true //松手的时候 居中
        }
        const spliceIndex = elementOffset > 0 ? insertIndex + 1 : insertIndex;
        block.blocks.splice(spliceIndex, 0, newComponent);
    }

}
export const repeatBlocks = (block, blockId, e, elementOffset, currentComponent, removeBlockId)=>{


        data = block;
        removeIndex = -1;
        operateBlocks(block, blockId, e, elementOffset, currentComponent, removeBlockId);
}
export const operateBlocks = (block, blockId, e, elementOffset, currentComponent, removeBlockId)=>{
    if(block.blocks && block.blocks.length){
        findBlock(block, blockId, e, elementOffset, currentComponent, removeBlockId)
    }
}
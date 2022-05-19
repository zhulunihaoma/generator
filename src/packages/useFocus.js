import { computed, ref } from "vue";
export function useFocus(data, focusComponent,callback) {
    const selectIndex = ref(-1);//最后一个选中的画布内的物料
    const lastSelectBlock = computed(()=>{
       return data.value.blocks[selectIndex.value];
    })
    const clearBlockFocus = ()=>{
        const positionDiv = document.getElementById('editor-block-focus');
        positionDiv.style.display = 'none';
        focusComponent.componentData = data.value;
        data.value.blocks.forEach(block=>{
            block.focus = false;
        })
    }
    const containerMousedown = ()=>{
        clearBlockFocus();
        selectIndex.value = -1;
    }
    const blockMouseDown = (e, block, index)=>{
        console.log('blockMouseDown====== ', e, block, index);
        //block上我们放一个属性focus 获取焦点后focus 为true
        e.preventDefault();
        e.stopPropagation();
        if(e.shiftKey){
            if(focusData.value.focus.length <= 1){
                block.focus = true;//当前只有一个物料被选中的时候 摁住shift键和点击也不会切换focus状态
            }else{
                block.focus = !block.focus;
            }
        }else{
            if(!block.focus){
                clearBlockFocus();
                block.focus = !block.focus;
            }
        }
        selectIndex.value = index;

        callback(e);
    }
    const focusData = computed(()=>{
        let focus = [];
        let unfocus = [];
        data.value.blocks.forEach((block)=>{
            (block.focus ? focus: unfocus).push(block);
        })
        return {
            focus,
            unfocus
        }
    })
    return{
        blockMouseDown,
        focusData,
        containerMousedown,
        lastSelectBlock
    }
}
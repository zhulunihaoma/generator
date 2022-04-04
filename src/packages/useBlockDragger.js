import { reactive } from "vue";
import { events } from "./events";

export function useBlockDraggers(focusData, lastSelectBlock, data) {
    let dragState = {
        startX:0,
        startY:0,
        dragging: false //默认不是正在拖拽
    }
    let markLine  = reactive({
        x: null,
        y: null
    })
    const mousedown = (e)=>{
        console.log('111',lastSelectBlock.value);
        const {width:Bwidth, height:Bheight } = lastSelectBlock.value;//b是选中的无聊
        // clientX：当鼠标事件发生时（不管是onclick，还是omousemove，onmouseover等），鼠标相对于浏览器（这里说的是浏览器的有效区域）x轴的位置；
        // clientY：当鼠标事件发生时，鼠标相对于浏览器（这里说的是浏览器的有效区域）y轴的位置；
        // screenX：当鼠标事件发生时，鼠标相对于显示器屏幕x轴的位置；
        // screenY：当鼠标事件发生时，鼠标相对于显示器屏幕y轴的位置；
        // offsetX：当鼠标事件发生时，鼠标相对于事件源x轴的位置
        // offsetY：当鼠标事件发生时，鼠标相对于事件源y轴的位置
        dragState = {
            startX:e.clientX,
            startY:e.clientY,//记录每一个选中的位置 window的坐标
            startLeft: lastSelectBlock.value.left,//b点拖拽前的位置 left 和 top   画布的坐标
            startTop: lastSelectBlock.value.top,
            dragging: false,
            startPos: focusData.value.focus.map(({top, left})=> ({top, left})),
            lines:(()=>{
                const { unfocus } = focusData.value;//获取其他未选中的以他们的位置做辅助线
                let lines =  {x: [], y: []}; //计算横线的位置用Y来存放，x存放的是纵线的
                [...unfocus,
                {
                    top: 0,
                    left: 0,
                    width: data.value.container.width,
                    height: data.value.container.height

                }].forEach((block)=>{
                    const { top: Atop, left: Aleft, width: Awidth, height:Aheight } = block;



                    lines.y.push({showTop:Atop, top:Atop});
                    lines.y.push({showTop:Atop, top:Atop - Bheight});//顶对底部
                    lines.y.push({showTop:Atop + Aheight/2, top:Atop + (Aheight/2 - Bheight/2)});//中对中
                    lines.y.push({showTop:Atop + Aheight, top:Atop + Aheight});//底对顶
                    lines.y.push({showTop:Atop+Aheight, top: Aheight + Aheight - Bheight})//底对底


                    // A(未选中的物料) 对 B（选中的）
                    lines.x.push({showLeft:Aleft, left: Aleft});//左对左
                    lines.x.push({showLeft:Aleft + Awidth, left: Aleft + Awidth});//右对左
                    lines.x.push({showLeft:Aleft + Awidth/2, left: Aleft + Awidth/2 - Bwidth/2}); //中间对中间
                    lines.x.push({showLeft:Aleft + Awidth, left: Aleft + Awidth - Bwidth});//
                    lines.x.push({showLeft:Aleft, left: Aleft - Bwidth});// 左对右
                })
                return lines;
            })()
        }
        document.addEventListener('mousemove',mousemove);
        document.addEventListener('mouseup',mouseup);

    }
    const mousemove = (e)=>{
        let {clientX: moveX, clientY: moveY} = e;
        if(!dragState.dragging){
            dragState.dragging = true;
            events.emit('start');//触发事件就会记住拖拽前的位置
        }
        // 计算当前元素最新的left和top 去线里面找，找到显示线
        // 最新left = 鼠标移动后 - 鼠标移动前 + left
        let left = moveX - dragState.startX + dragState.startLeft;
        let top = moveY - dragState.startY + dragState.startTop;
        // 先计算横线 距离参照物元素5像素的时候就显示这根线
        let y = null;
        let x = null;
        for(let i = 0 ;i < dragState.lines.y.length; i++){
           const {top:t,showTop:st} =  dragState.lines.y[i];//获取每根线
           if(Math.abs(t - top) < 5){//如果绝对值小于5 说明可以展示了
                y = st;//线要实现的位置
                // 实现快速和这个元素贴在一起
                moveY = dragState.startY - dragState.startTop + t;//容器距离顶部的距离 + 目标的高度 就是最新的moveY
                // 实现和这个元素贴在一起

                break;
           }
        }

        for(let i = 0 ;i < dragState.lines.x.length; i++){
            const {left:l,showLeft:sl} =  dragState.lines.x[i];//获取每根线
            if(Math.abs(l - left) < 5){//如果绝对值小于5 说明可以展示了
                 x = sl;//线要实现的位置
                 // 实现快速和这个元素贴在一起
                 moveX = dragState.startX - dragState.startLeft + l;//容器距离顶部的距离 + 目标的高度 就是最新的moveY
                 // 实现和这个元素贴在一起

                 break;
            }
         }

        markLine.x = x;//markLine 响应数据 x，y更新了，视图会更新
        markLine.y = y;
        let durX = moveX - dragState.startX;//之前和之后拖拽的距离
        let durY = moveY - dragState.startY;
        focusData.value.focus.forEach((block,index)=>{
            block.top = dragState.startPos[index].top + durY;
            block.left = dragState.startPos[index].left + durX;
        })
    }

    const mouseup = ()=>{
        document.removeEventListener('mousemove',mousemove);
        document.removeEventListener('mouseup',mouseup);
        markLine.x = null;
        markLine.y = null;
        if(dragState.dragging){//如果只是点击，则不会触发
            events.emit('end');
        }
    }
    return {
        mousedown,
        markLine
    }
}
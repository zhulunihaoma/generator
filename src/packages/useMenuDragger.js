import { events } from "./events";
import { reactive } from "vue";
import { dragenterCommonds, dragoverCommonds, dragCommonds } from '../utils/domUtils';
import { throttle } from '../utils/eventCommonUtils'

const imgsrc = require('../assets/images/pikachu.png');
export function useMenuDragger(containerRef, data) {
    console.log('useMenuDragger-data: ', data);
    let currentComponent = reactive();
        const dragenter = (e)=>{
            e.dataTransfer.dropEffect = 'move';
            throttle(dragenterCommonds, 500)({e});
            // console.log('dragenter-e: ', e.target);

        };
        const dragover = (e)=>{
            e.preventDefault();
            throttle(dragoverCommonds, 500)({e});
            // e.Effect = DragDropEffects.Copy
        };
        const dragleave = (e)=>{
            e.dataTransfer.dropEffect = 'none';
        };
        const drop = (e)=>{
            // console.log('drop-e: ', e.target.className);
            // 阻止默认动作（如打开一些元素的链接）
            // 根据positionDiv记录的信息，更新数据结构
            e.preventDefault();
            throttle(dragCommonds, 500)({e, data, currentComponent});
        };
        const dragstart = ({e, component})=>{
            // dragenter 进入元素中 添加一个移动的标识
            // dragover 在目标元素经过 必须要阻止默认行为 否则不能触发drop
            // dragleave 离开元素 增加一个禁用标识
            // drop 松手的时候 根据拖拽的组件添加一个组件
            const icon = document.createElement('img');
            // icon.src = 'https://img0.baidu.com/it/u=962361882,2281204904&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500';//imgsrc;
            // const img = document.getElementById('pikachu');
            var img = new Image();
            img.src = `https://h5.bestwehotel.com/storage/download/3a4fd61b-f818-4def-bd51-0ce4ab4c515c/we_1612513678550.png?x-oss-process=image/resize,h_200`;

            // e.dataTransfer.setDragImage(img, 10, 10)
            // make it half transparent
            // e.target.style.opacity = .5;

            containerRef.value.addEventListener('dragenter', dragenter);
            containerRef.value.addEventListener('dragover', dragover)
            containerRef.value.addEventListener('dragleave', dragleave)
            containerRef.value.addEventListener('drop', drop)
            currentComponent = component;
            events.emit('start')//发布start
        }
        const dragend = ()=>{
            containerRef.value.removeEventListener('dragenter', dragenter);
            containerRef.value.removeEventListener('dragover', dragover)
            containerRef.value.removeEventListener('dragleave', dragleave)
            containerRef.value.removeEventListener('drop', drop);
            events.emit('end')//发布end
        }
        return {
            dragstart,
            dragend,
            currentComponent
        }
}
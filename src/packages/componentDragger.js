import { events } from "./events";
import { reactive } from "vue";
import { insertAfter } from '../utils/domUtils';
import { repeatBlocks, exchangeBlock } from '../utils/componentsOperate'
const imgsrc = require('../assets/images/pikachu.png');
const elementClass = ['DSelect','DButton', 'DText', 'DInput', 'el-input__inner'];
const containerClass = ['DBlock','editor-container-canvas__content']
export const componentDragger = (containerRef, data)=>{
    let currentComponent = reactive();
        const dragenter = (e)=>{
            e.dataTransfer.dropEffect = 'move';
            setTimeout(() => {
                if (containerClass.indexOf(e.target.className) > -1) {
                    const positionDomArr = document.getElementsByClassName('positionLine-stickyTop')
                    if(positionDomArr.length){
                        for (let index = 0; index < positionDomArr.length; index++) {
                            positionDomArr[index].remove();
                        }
                    }
                    const positionDiv = document.createElement('div');
                    positionDiv.classList.add('positionLine-stickyTop');
                    if(e.target.className === 'editor-container-canvas__content'){
                        positionDiv.setAttribute('positionLineId',e.target.id);
                    }else{
                        positionDiv.setAttribute('positionLineId',e.target.parentNode.id);
                    }
                    const positionDomPre = e.target.getElementsByClassName('positionLine-stickyTop');
                    if(!positionDomPre.length){
                        e.target.appendChild(positionDiv);
                    }
                }
            }, 50);
        };
        const dragover = (e)=>{
            // console.log('dragover.classList: ', e.target.classList);
            setTimeout(() => {
                if(elementClass.indexOf(e.target.classList[e.target.classList.length -1]) > -1){
                    const positionDiv = document.createElement('div');
                    positionDiv.classList.add('positionLine-stickyTop');
                    const positionDomPre = e.target.parentNode.parentNode.getElementsByClassName('positionLine-stickyTop');
                    const offsetY =  e.offsetY;
                    // console.log('dragover: ', e.target.classList);
                    if(positionDomPre.length){
                        positionDomPre[0].remove();
                    }
                    const elementOffset = offsetY - (e.target.parentNode.offsetHeight/2);
                    positionDiv.classList.add('positionLine-stickyTop-offset');
                    positionDiv.setAttribute('offset',elementOffset);
                    positionDiv.setAttribute('positionLineId',e.target.parentNode.id);
                    if(elementOffset > 0){
                        insertAfter(positionDiv, e.target.parentNode);
                    }else{
                        e.target.parentNode.parentNode.insertBefore(positionDiv, e.target.parentNode);
                    }
                }
            }, 50);

            e.preventDefault();
            // e.Effect = DragDropEffects.Copy
        };
        const dragleave = (e)=>{
            e.dataTransfer.dropEffect = 'none';
            if ((containerClass.indexOf(e.target.className)> -1 && !e.relatedTarget.classList.contains('positionLine-stickyTop')) || e.relatedTarget.className === 'editor-container-canvas') {
                setTimeout(() => {
                    const positionDom = document.getElementsByClassName('positionLine-stickyTop')
                    if(positionDom.length){
                        positionDom[0].remove();
                    }
                }, 100);
              }
        };
        const drop = (e)=>{
            // console.log('拖拽画布内的组件drop-e: ', e.target.className);
            // 阻止默认动作（如打开一些元素的链接）
            e.preventDefault();
            setTimeout(() => {
                // const positionDomOffsetArr = document.getElementsByClassName('positionLine-stickyTop-offset');
                const positionDomArr = document.getElementsByClassName('positionLine-stickyTop')
                const positionDom = positionDomArr[positionDomArr.length - 1];
                // 排序
                if(positionDom.getAttribute('offset')){
                    repeatBlocks(data.value, positionDom.getAttribute('positionLineId'), e, positionDom.getAttribute('offset'), currentComponent);
                }else {
                    const blockId = positionDom.getAttribute('positionLineId');
                    exchangeBlock({...data.value,id:'container'}, blockId, currentComponent.parentId, currentComponent);
                }
                positionDom.remove();
                const focusDiv = document.getElementById('editor-block-focus');
                focusDiv.style.display = 'none';
            }, 60);
        };
        const focusDragstart = (e, component)=>{
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
        const focusDragend = ()=>{
            containerRef.value.removeEventListener('dragenter', dragenter);
            containerRef.value.removeEventListener('dragover', dragover)
            containerRef.value.removeEventListener('dragleave', dragleave)
            containerRef.value.removeEventListener('drop', drop);
            events.emit('end')//发布end
        }
        return {
            focusDragstart,
            focusDragend
        }
    }

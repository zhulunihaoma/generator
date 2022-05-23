import { computed } from 'vue'
export const useSetAttr = (props, emits)=>{
    // let emits = defineEmits(['UpdateAttr']);
    const focusComponent = computed({
        get(){
           return props.focusComponent
        },
        set(val){
            emits('UpdateAttr',val.attr)
        }
    })
    return focusComponent;
}
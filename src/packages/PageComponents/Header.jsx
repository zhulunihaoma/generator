import { defineComponent, ref, onMounted } from "vue";
import { useCommand } from "../../packages/useCommand.js";
import { events } from '../events'
export default defineComponent({
  name: "Header",
  props:{
        data:{
            type:Object
        }
    },
  setup(props, ctx) {
    // const count = ref<number>(0);

    // const refCounter = ref<any>(null);

    // const handleInc = (v: number) => {
    //   console.log("parent method", v);
    //   count.value = v;
    //   // 通过组件实例组件获取组件自己内部通过 defineExpose 暴露的信息
    //   console.log(refCounter.value.a);
    //   refCounter.value.someFn();
    // };
    const { commands } = useCommand(props.data);
    const buttons = [
        {
            label:'发布',
            icon:'cipan',
            handle:()=> commands.redo()
        },
        {
            label:'预览',
            icon:'qiyezhuye',
            handle:()=> commands.redo()
        },
        {
            label:'保存模板',
            icon:'baocun',
            handle:()=> commands.redo()
        },
        {
            label:'保存',
            icon:'baocun',
            handle:()=> commands.redo()
        },
        {
            label:'帮助',
            icon:'bangzhu',
            handle:()=> commands.redo()
        },
        {
            label:'检查',
            icon:'jiance',
            handle:()=> commands.redo()
        },
        {
            label:'全局样式',
            icon:'quanjuyangshi',
            handle:()=> commands.redo()
        },
        {
            label:'清空',
            icon:'qingkong',
            handle:()=> {
                events.emit('start')//发布start
                ctx.emit('updateBlocks', [])
                events.emit('end')//发布end
            }
        },
        {
            label:'下一步',
            icon:'xiayibu',
            handle:()=> commands.redo()
        },
        {
            label:'上一步',
            icon:'shangyibu',
            handle:()=> commands.undo()
        }
    ]
    return () => (
                <div class="editor-top">
                     <div class="editor-top-leftInfo">
                     <i class={`designer shejiqi-call`}></i>
                     <span class="editor-top-leftInfo-appName">岗位扩展信息应用</span>
                    </div>
                    <div class="editor-top-rightTools">
                    {
                        buttons.map(button=>{
                            return  <div onClick={button.handle} class={`editor-top-rightTools-button ${button.icon === "cipan" ? "editor-top-rightTools-buttonPublish" : null}`}>
                                <i class={`designer shejiqi-${button.icon}`}></i>
                                <span class="editor-top-rightTools-button-title">{button.label}</span>
                            </div>
                        })
                    }
                    </div>
                </div>
    );
  },
});

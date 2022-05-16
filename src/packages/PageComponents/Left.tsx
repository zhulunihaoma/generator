import { defineComponent, ref, inject } from "vue";
import { TabsPaneContext, ElTabs, ElTabPane, ElCollapse, ElCollapseItem, ElInput } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import { registerLayoutConfig, registerBasicConfig, registerFieldConfig } from '../../utils/editor-config'
export default defineComponent({
    name: "Left",
    components: {
        ElTabs,
        ElTabPane,
        ElCollapse,
        ElCollapseItem
    },
    setup(props, ctx){
        const elTabsType = ref<string | number>("component");
        const activeNames = ref(['1'])
        const handleChange = (val: string[]) => {
        }
        const input2 = ref('')
        return ()=>
            <div class="editor-left">
                <ElTabs stretch={true} modelValue={elTabsType} class="demo-tabs">
                    <ElTabPane label="组件" name="component">
                        <div class="editor-left-componentArea">
                            <ElCollapse modelValue={activeNames} onChange={handleChange}>
                                <ElCollapseItem title="布局组件" name="1">
                                    <div class="editor-left-componentArea-layout">
                                        {
                                            registerLayoutConfig.componentList.map(component=>{
                                                return component.key !== "col" && <div draggable onDragstart={e=> ctx.emit('componentDragstart', {e, component})} onDragend={e=> ctx.emit('componentDragend')} class="editor-left-componentArea-item">
                                                        <div>
                                                            {component.preview()}
                                                        </div>
                                                        <div>
                                                            {component.label}
                                                        </div>
                                                    </div>
                                                })
                                        }
                                    </div>
                                </ElCollapseItem>
                                <ElCollapseItem title="基础组件" name="2">
                                    <div class="editor-left-componentArea-layout">
                                        {
                                            registerBasicConfig.componentList.map(component=>{
                                                return <div draggable onDragstart={e=> ctx.emit('componentDragstart', {e, component})} onDragend={e=> ctx.emit('componentDragend')} class="editor-left-componentArea-item">
                                                        <div>
                                                            {component.preview()}
                                                        </div>
                                                        <div>
                                                            {component.label}
                                                        </div>
                                                    </div>
                                                })
                                        }
                                    </div>

                                </ElCollapseItem>
                            </ElCollapse>
                        </div>
                        <div class="editor-left-fieldArea">
                            <div className="editor-left-fieldArea-header">字段组件</div>
                            <div className="editor-left-fieldArea-search">
                                <ElInput
                                    value={input2}
                                    class="w-50 m-2"
                                    placeholder="请输入组件名称"
                                    prefix-icon={Search}
                                />
                            </div>
                            <div className="editor-left-fieldArea-content">
                            {registerFieldConfig.componentList.map(component=>{
                                return <div draggable onDragstart={e=> ctx.emit('componentDragstart', {e, component})} onDragend={e=> ctx.emit('componentDragend')} class="editor-left-item">
                                        <span>
                                            {component.label}
                                        </span>
                                        {/* <div> */}
                                            {component.preview()}
                                        {/* </div> */}
                                    </div>
                                })}
                            </div>
                        </div>
                    </ElTabPane>
                    <ElTabPane label="模板" name="module"></ElTabPane>
                </ElTabs>
            </div>
    }
})
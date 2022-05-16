<template>
  <div id="app">
    <Editor v-model="state"></Editor>
    <!-- 上面的和下面的一样的，只是一个语法糖 -->
    <!-- <Editor modelValue="state" @update:modelValue="xxx"></Editor> -->
  </div>
</template>

<script>
import { provide, ref } from 'vue';
import Editor from './packages/editor'
import data from "./data.json";
import { registerConfig as config} from './utils/editor-config';
import { CanvasData } from './types/component'
// console.log('CanvasData: ', CanvasData);
export default {
  components:{
    Editor
  },
  setup(){
    const state = ref(data)
    console.log('state: ', state);
    provide('config', config);
    return {
      state
    }
  }
}
</script>

<style lang="scss">
#app{
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
}
</style>

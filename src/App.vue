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
import { registerConfig as config} from './utils/editor-config'
export default {
  components:{
    Editor
  },
  setup(){
    const state = ref(data);
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
  left: 20px;
  right: 20px;
  top: 20px;
  bottom: 20px;
}
</style>

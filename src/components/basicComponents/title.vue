<template>
    <div class="DTitle">
        <div class="DTitle-content">
            <span class="DTitle-content-title">标题</span>
        </div>
    </div>
</template>

<script setup>
import {
    ArrowDown
  } from '@element-plus/icons-vue'
</script>

<style lang="scss">
.DTitle{
    &-content-title{
        padding-left: 10px;
        border-left: 5px solid #4680ff;
        font-size: 18px;
        font-weight: bold;
    }
}
</style>
<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.min.mjs'
</script>
<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>
<style scoped></style>

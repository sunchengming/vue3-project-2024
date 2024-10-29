<script setup>
// import { useRoute, useRouter } from 'vue-router';
import { userUserStore, userCountStore } from '@/stores/index';
// const router = useRouter();
// const route = useRoute();

const userStore = userUserStore();
const countStore = userCountStore();
</script>
<template>
    <div>
        <router-view></router-view>
        <test-demo></test-demo>
        我是app
        <p>{{ userStore.token }}</p>
        <el-button @click="userStore.setToken('1234564')">登录</el-button>
        <el-button @click="userStore.removeToken()">退出</el-button>
        <hr />
        {{ countStore.count }}
        <el-button @click="countStore.addCount(22)">添加</el-button>
    </div>
</template>

<style scoped></style>

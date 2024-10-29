<script setup></script>
<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <el-form>
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.login-page {
    height: 100vh;
    background-color: #fff;
    .bg {
        background:
            url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }
    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
            margin: 0 auto;
        }
    }
}
</style>

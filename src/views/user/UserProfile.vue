<script setup>
import { ref } from 'vue';
import { userUserStore } from '@/stores';
import { userUpdateInfoServer } from '@/api/user';
const {
    user: { username, id, nickname, email },
    getUser
} = userUserStore();
const formRef = ref();
const ruleForm = ref({
    email,
    id,
    nickname,
    username
});
const rules = ref({
    nickname: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        {
            pattern: /^\S{1,10}$/,
            message: '昵称必须是1-10位非空字符',
            trigger: 'blur'
        }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9])+$/,
            message: '请输入正确的邮箱',
            trigger: 'blur'
        }
    ]
});
const onSubmit = async () => {
    await formRef.value.validate();
    await userUpdateInfoServer(ruleForm.value);
    getUser();
    ElMessage.success('修改成功');
};
</script>
<template>
    <page-container title="基本资料">
        <el-form
            ref="formRef"
            style="max-width: 600px"
            :model="ruleForm"
            :rules="rules"
            label-width="auto"
            size="default"
            class="contianer"
            require-asterisk-position="right"
        >
            <el-form-item label="登录名称" prop="username">
                <el-input disabled v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="nickname" label="用户昵称">
                <el-input v-model="ruleForm.nickname"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="用户邮箱">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交修改</el-button>
            </el-form-item>
        </el-form>
    </page-container>
</template>
<style lang="scss" scoped>
.contianer {
    padding: 20px;
    .el-form-item {
        margin-bottom: 25px;
    }
}
</style>

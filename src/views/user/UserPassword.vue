<script setup>
import { ref } from 'vue';
import { userPwdChangeServer } from '@/api/user';
import { useRouter } from 'vue-router';
import { userUserStore } from '@/stores';
const router = useRouter();
const formModel = ref({
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
});
const rules = {
    old_pwd: [
        { required: true, message: '请输入正确的密码', tigger: 'blur' },
        {
            pattern: /^\S{1,10}/,
            message: '请输入1-10位非空字符',
            tigger: 'blur'
        }
    ],
    new_pwd: [
        { required: true, message: '请输入正确的密码', tigger: 'blur' },
        {
            pattern: /^\S{1,10}/,
            message: '请输入1-10位非空字符',
            tigger: 'blur'
        },
        {
            validator: (rule, value, callback) => {
                if (value == formModel.value.old_pwd) {
                    callback(new Error('新密码和原密码不能一样'));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ],
    re_pwd: [
        { required: true, message: '请输入正确的密码', tigger: 'blur' },
        {
            pattern: /^\S{1,10}/,
            message: '请输入1-10位非空字符',
            tigger: 'blur'
        },
        {
            validator: (rule, value, callback) => {
                if (value !== formModel.value.new_pwd) {
                    callback(new Error("Two inputs don't match!"));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ]
};
const formRef = ref();
const userStore = userUserStore();
const subChange = async () => {
    await formRef.value.validate();
    await userPwdChangeServer(formModel.value);
    ElMessage.success('修改成功');
    userStore.setToken('');
    userStore.setUser({});
    // 密码修改完须退出登录
    router.push('/login');
};
</script>
<template>
    <page-container title="重置密码">
        <el-col :span="12">
            <el-form
                ref="formRef"
                :rules="rules"
                :model="formModel"
                label-width="100px"
                label-position="left"
            >
                <el-form-item label="原密码" prop="old_pwd">
                    <el-input
                        v-model="formModel.old_pwd"
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="new_pwd">
                    <el-input
                        v-model="formModel.new_pwd"
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="re_pwd">
                    <el-input
                        v-model="formModel.re_pwd"
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item style="margin-top: 30px">
                    <el-button type="primary" @click="subChange">
                        确认修改
                    </el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </page-container>
</template>

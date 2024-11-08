<script setup>
import { ref, watch } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import { userRegisterServer, userLoginServer } from '@/api/user.js';
import { userUserStore } from '@/stores';
import { useRouter } from 'vue-router';
const rememberChecked = ref(false);
const isRegister = ref(true);
// 校验相关
// 1.el-form => :model='ruleForm' 绑定整个form的数据对象{}
// 2.el-form => :rules= 'rules'   绑定整个form的规则对象{}
// 3.表单元素 => v-model='ruleForm.xxx' 给表单元素，绑定form属性
// 4.el-form-item => prop配置生效的校验规则（和rules的字段要对应）
const formModel = ref({
    username: '',
    password: '',
    repassword: ''
});
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 10, message: '用户名必须是5-10位字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
            pattern: /^\S{6,15}$/,
            message: '密码必须是5-10非空字符',
            trigger: 'blur'
        }
    ],
    repassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
            pattern: /^\S{6,15}$/,
            message: '密码必须是5-10位字符',
            trigger: 'blur'
        },
        {
            validator: (rule, value, callback) => {
                if (value !== formModel.value.password) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback(); //校验成功也要callback
                }
            },
            trigger: 'blur'
        }
    ]
};
const form = ref(null);
const checkRegister = async () => {
    await form.value.validate();
    await userRegisterServer(formModel.value);
    ElMessage({
        message: 'Congrats, this is a success message.',
        type: 'success'
    });
    isRegister.value = true;
    console.log('注册成功');
};
const useStore = userUserStore();
const router = useRouter();
const checkLogin = async () => {
    await form.value.validate();
    const res = await userLoginServer(formModel.value);
    useStore.setToken(res.data.token);
    ElMessage.success('登录成功');
    router.push('/');
};
watch(isRegister, () => {
    console.log(isRegister);
    formModel.value = {
        username: '',
        password: '',
        repassword: ''
    };
});
</script>
<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 登录     -->
            <el-form
                ref="form"
                size="large"
                autocomplete="off"
                v-if="isRegister"
                :model="formModel"
                :rules="rules"
            >
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input
                        v-model="formModel.username"
                        :prefix-icon="User"
                        placeholder="请输入用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="formModel.password"
                        :prefix-icon="Lock"
                        placeholder="请输入密码"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="flex">
                        <el-checkbox
                            v-model="rememberChecked"
                            label="记住我"
                        ></el-checkbox>
                        <el-link type="primary" :underline="false">
                            忘记密码？
                        </el-link>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        class="button"
                        @click="checkLogin()"
                    >
                        登录
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-link
                        type="info"
                        :underline="false"
                        @click="isRegister = !isRegister"
                    >
                        注册➡
                    </el-link>
                </el-form-item>
                <el-form-item>
                    仅用于IT培训教学使用，为保障您的个人信息安全，请勿向平台录入任何个人敏感信息（如手机号、身份证号等）！
                </el-form-item>
            </el-form>
            <!-- 注册 -->
            <el-form
                ref="form"
                :model="formModel"
                size="large"
                autocomplete="off"
                :rules="rules"
                v-else
            >
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input
                        v-model="formModel.username"
                        :prefix-icon="User"
                        placeholder="请输入用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="formModel.password"
                        :prefix-icon="Lock"
                        placeholder="请输入密码"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="repassword">
                    <el-input
                        v-model="formModel.repassword"
                        :prefix-icon="Lock"
                        placeholder="请再次输入密码"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        class="button"
                        @click="checkRegister()"
                    >
                        提交
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-link
                        type="info"
                        :underline="false"
                        @click="isRegister = !isRegister"
                    >
                        ⬅返回
                    </el-link>
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
        user-select: none;
        .title {
            margin: 0 auto;
        }
        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        .button {
            width: 100%;
        }
    }
}
</style>

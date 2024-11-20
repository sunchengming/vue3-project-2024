<script setup>
import { onMounted, ref } from 'vue';
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    ArrowDown,
    SwitchButton,
    CaretBottom
} from '@element-plus/icons-vue';
import { userUserStore } from '@/stores';
// 获取路由做业面跳转
import { useRouter } from 'vue-router';
const router = useRouter();

// 开关启动，点击完下拉展示
const showDrop = ref(false);
const dropdown1 = ref();

const showClick = () => {
    if (!dropdown1.value) return;
    dropdown1.value.handleOpen();
};
const userStore = userUserStore();
const username = ref('');

onMounted(async () => {
    await userStore.getUser();
    username.value = userStore.user.username;
});

const handleCommand = async command => {
    if (command == 'logout') {
        // 退出操作
        await ElMessageBox.confirm('您确认要进行退出么', '温馨提示', {
            type: 'warning',
            confirmButtonText: '确认',
            cancelButtonText: '取消'
        });
        userStore.removeToken();
        userStore.setUser({});
        router.push('/login');
    } else {
        router.push(`/user/${command}`);
    }
};
</script>
<template>
    <el-container class="layout-container">
        <el-aside width="200px">
            <div class="el-aside_logo"></div>
            <el-menu
                active-text-color="#ffd04b"
                background-color="#232323"
                :default-active="$route.path"
                text-color="#fff"
                router
            >
                <el-menu-item index="/article/channel">
                    <el-icon><Management /></el-icon>
                    文章分类
                </el-menu-item>
                <el-menu-item index="/article/manage">
                    <el-icon><Promotion /></el-icon>
                    文章管理
                </el-menu-item>
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon><UserFilled /></el-icon>
                        个人中心
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/user/profile">
                            <el-icon><User /></el-icon>
                            基本资料
                        </el-menu-item>
                        <el-menu-item index="/user/avatar">
                            <el-icon><Crop /></el-icon>
                            更换头像
                        </el-menu-item>
                        <el-menu-item index="/user/password">
                            <el-icon><EditPen /></el-icon>
                            修改密码
                        </el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <div class="titleShow">
                    黑马程序猿：
                    <strong>
                        {{ userStore.user.nickname || userStore.user.username }}
                    </strong>
                    <el-button @click="showClick" v-if="showDrop">
                        showDrop
                    </el-button>
                </div>
                <el-dropdown
                    :hide-on-click="false"
                    ref="dropdown1"
                    @command="handleCommand"
                >
                    <span class="el-dropdown-link">
                        <el-avatar
                            :src="userStore.user.user_pic || avatar"
                        ></el-avatar>
                        <el-icon><CaretBottom /></el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu aria-expanded="true">
                            <el-dropdown-item :icon="User" command="profile">
                                基本资料
                            </el-dropdown-item>
                            <el-dropdown-item :icon="Crop" command="avatar">
                                更换头像
                            </el-dropdown-item>
                            <el-dropdown-item
                                :icon="EditPen"
                                command="password"
                            >
                                重置密码
                            </el-dropdown-item>
                            <el-dropdown-item
                                :icon="SwitchButton"
                                command="logout"
                            >
                                退出登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>大事件 ©2024 Created by 孙成名</el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container .el-dropdown + .el-dropdown {
    margin-left: 15px;
}
.layout-container .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}
.layout-container {
    height: 100vh;
    .el-header {
        position: relative;
        background-color: #fff;
        color: var(--el-text-color-primary);
        display: flex;
        flex: wrap;
        justify-content: space-between;
        align-items: center;
        .el-dropdown {
            display: flex;
            align-items: center;
            img {
                width: 40px;
                height: 40px;
            }
            .el-icon {
                color: #999;
                margin-left: 10px;
            }
        }
    }
    .el-aside {
        background-color: #232323;
        .el-aside_logo {
            height: 120px;
            background: url('@/assets/logo.png') no-repeat center / 120px auto;
        }
    }
    .el-menu {
        border-right: none;
    }
    .el-main {
        padding: 20px;
    }
    .toolbar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        right: 20px;
    }
    .el-footer {
        display: flex;
        background-color: #fff;
        justify-content: center;
        align-items: center;
        color: #666;
        font-size: 14px;
    }
}
</style>

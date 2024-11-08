<script setup>
import { ref } from 'vue';
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen
} from '@element-plus/icons-vue';

const item = {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
};
const tableData = ref(Array.from({ length: 20 }).fill(item));
</script>
<template>
    <el-container class="layout-container-demo" style="height: 100vh">
        <el-aside width="200px">
            <el-menu>
                <el-menu-item index="1">
                    <el-icon><Management /></el-icon>
                    Option 1
                </el-menu-item>
                <el-menu-item index="2">
                    <el-icon><Promotion /></el-icon>
                    Option 2
                </el-menu-item>
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon><UserFilled /></el-icon>
                        Navigator Three
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="4">
                            <el-icon><User /></el-icon>
                            Option 3-1
                        </el-menu-item>
                        <el-menu-item index="5">
                            <el-icon><Crop /></el-icon>
                            Option 3-2
                        </el-menu-item>
                        <el-menu-item index="6">
                            <el-icon><EditPen /></el-icon>
                            Option 3-3
                        </el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <div class="toolbar">
                    <el-dropdown>
                        <el-icon style="margin-right: 8px; margin-top: 1px">
                            <setting />
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>View</el-dropdown-item>
                                <el-dropdown-item>Add</el-dropdown-item>
                                <el-dropdown-item>Delete</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <span>Tom</span>
                </div>
            </el-header>

            <el-main>
                <el-table :data="tableData">
                    <el-table-column prop="date" label="Date" width="140" />
                    <el-table-column prop="name" label="Name" width="120" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
    border-right: none;
}
.layout-container-demo .el-main {
    padding: 0;
}
.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
</style>

<script setup>
import { Edit, Delete } from '@element-plus/icons-vue';
import { onMounted, provide, ref } from 'vue';
import { artGetListServer, artDelChannelServer } from '@/api/article';
import pageDialog from './components/PageDialog.vue';
const tableData = ref([]);
const loading = ref(false);
const dialog = ref();
const getListUpdate = async () => {
    loading.value = true;
    const tableList = await artGetListServer();
    tableData.value = tableList.data.data;
    loading.value = false;
};
getListUpdate();
const handleEdit = row => {
    dialog.value.openDialog(row);
};
const handleDelete = async row => {
    await artDelChannelServer(row.id);
    ElMessage.success('删除成功');
    getListUpdate();
};
const handleAdd = () => {
    dialog.value.openDialog({});
};
const onSuccess = () => {
    getListUpdate();
};
</script>
<template>
    <page-container title="文章分类" class="container">
        <template #extra>
            <el-button type="primary" @click="handleAdd">添加分类</el-button>
        </template>
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column
                type="index"
                width="100"
                label="序号"
            ></el-table-column>
            <el-table-column
                prop="cate_name"
                label="分类名称"
            ></el-table-column>
            <el-table-column
                prop="cate_alias"
                label="分类别名"
            ></el-table-column>
            <el-table-column label="操作" width="150">
                <template #default="scope">
                    <el-button
                        type="primary"
                        plain
                        circle
                        :icon="Edit"
                        @click="handleEdit(scope.row, scope.$index)"
                    />
                    <el-button
                        type="warning"
                        plain
                        circle
                        :icon="Delete"
                        @click="handleDelete(scope.row, scope.$index)"
                    />
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据"></el-empty>
            </template>
        </el-table>
        <pageDialog ref="dialog" @success="onSuccess"></pageDialog>
    </page-container>
</template>
<style lang="scss" scoped>
.container {
    ::v-deep(.el-table__cell) {
        padding: 20px 0;
    }
}
</style>

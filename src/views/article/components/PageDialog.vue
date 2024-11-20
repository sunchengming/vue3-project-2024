<script setup>
import { inject, nextTick, ref } from 'vue';
import { artAddChannelServer, artEditChannelServer } from '@/api/article';

const dialogVisible = ref(false);
const form = ref(null);
const formModel = ref({
    cate_name: '',
    cate_alias: ''
});
const rules = {
    cate_name: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
        {
            pattern: /^\S{1,10}$/,
            message: '分类名称必须是1-10位非空字符',
            trigger: 'blur'
        }
    ],
    cate_alias: [
        { required: true, message: '请输入分类别名', trigger: 'blur' },
        {
            pattern: /^[1-9a-zA-Z]{1,15}$/,
            message: '分类别名必须是1-15位字母或数字',
            trigger: 'blur'
        }
    ]
};
const formRef = ref();
const openDialog = row => {
    formModel.value = { ...row };
    dialogVisible.value = true;
};
const emit = defineEmits(['success']);
const onSubmit = async () => {
    await formRef.value.validate();
    const isDdit = formModel.value.id;
    if (isDdit) {
        await artEditChannelServer(formModel.value);
        ElMessage.success('编辑成功');
    } else {
        await artAddChannelServer(formModel.value);
        ElMessage.success('添加成功');
    }
    dialogVisible.value = false;
    emit('success');
};

const closeDialog = () => {
    formRef.value.clearValidate();
};
defineExpose({
    openDialog
});
</script>
<template>
    <el-dialog
        v-model="dialogVisible"
        :title="formModel.id ? '编辑弹层' : '添加弹层'"
        width="30%"
        @close="closeDialog"
    >
        <el-form
            ref="formRef"
            :model="formModel"
            autocomplete="off"
            :rules="rules"
        >
            <el-form-item
                prop="cate_name"
                label="分类名称"
                label-width="100px"
                style="padding-right: 30px"
            >
                <el-input
                    v-model="formModel.cate_name"
                    placeholder="请输入分类名称"
                ></el-input>
            </el-form-item>
            <el-form-item
                prop="cate_alias"
                label="分类别名"
                label-width="100px"
                style="padding-right: 30px"
            >
                <el-input
                    v-model="formModel.cate_alias"
                    placeholder="请输入分类别名"
                ></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer" @close="closeDialog">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onSubmit">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<style lang="scss" scoped></style>

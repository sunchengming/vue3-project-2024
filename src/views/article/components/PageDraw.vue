<script setup>
import { ref } from 'vue';
const drawVisible = ref(false);
import channelSelect from './ChannelSelect.vue';
import { Plus } from '@element-plus/icons-vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {
    artPublishServer,
    artGetDetailServer,
    artEditServer
} from '@/api/article';
import { baseURL } from '@/utils/request';
import axios from 'axios';
const open = async row => {
    drawVisible.value = true;
    // 编辑
    if (row.id) {
        const res = await artGetDetailServer(row.id);
        formModel.value = res.data.data;
        imageUrl.value = baseURL + formModel.value.cover_img;
        // 网络图片是file文件，需要将图片转换成file格式
        const file = await imageUrlToFile(imageUrl.value, 'girl');
        formModel.value.cover_img = file;
    } else {
        imageUrl.value = '';
        editorRef.value.setHTML('');
        formModel.value = { ...defaultForm };
    }
};
const defaultForm = {
    title: '',
    cate_id: '',
    cover_img: '',
    content: '',
    state: ''
};
const formModel = ref({ ...defaultForm });
const imageUrl = ref('');
const editorRef = ref();
const onEditImg = unloadFile => {
    imageUrl.value = URL.createObjectURL(unloadFile.raw);
    formModel.value.cover_img = unloadFile.raw;
};
const emit = defineEmits(['success']);
const onPublish = async state => {
    // 将已发布还是草稿状态存入formModel
    formModel.value.state = state;
    // 注意：当前接口需要的是formData对象
    // 将普通对象转换成formData对象
    const fd = new FormData();
    for (let key in formModel.value) {
        fd.append(key, formModel.value[key]);
    }
    // 发请求
    // 判断是编辑还是添加
    if (formModel.value.id) {
        // 编辑
        await artEditServer(fd);
        ElMessage.success('修改成功');
        drawVisible.value = false;
        emit('success', 'edit');
    } else {
        // 添加操作
        await artPublishServer(fd);
        ElMessage.success('添加成功');
        drawVisible.value = false;
        emit('success', 'add');
    }
};

const imageUrlToFile = async (url, fileName) => {
    try {
        // 第一步：使用axios获取网络图片数据
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const imageData = response.data;

        // 第二步：将图片数据转换为Blob对象
        const blob = new Blob([imageData], {
            type: response.headers['content-type']
        });

        // 第三步：创建一个新的File对象
        const file = new File([blob], fileName, { type: blob.type });

        return file;
    } catch (error) {
        console.error('将图片转换为File对象时发生错误:', error);
        throw error;
    }
};
defineExpose({
    open
});
</script>
<template>
    <el-drawer
        v-model="drawVisible"
        title="添加文章"
        direction="rtl"
        :show-close="false"
        size="50%"
    >
        <el-form label-width="100px">
            <el-form-item label="文章标题">
                <el-input
                    placeholder="请输入文章标题"
                    v-model="formModel.title"
                ></el-input>
            </el-form-item>
            <el-form-item label="文章分类">
                <channel-select
                    style="width: 100%"
                    v-model="formModel.cate_id"
                ></channel-select>
            </el-form-item>
            <el-form-item label="文章封面">
                <el-upload
                    class="avatar-uploader"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="onEditImg"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="文章内容">
                <div class="editor">
                    <quill-editor
                        ref="editorRef"
                        theme="snow"
                        v-model:content="formModel.content"
                        content-type="html"
                    ></quill-editor>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onPublish('已发布')">
                    发布
                </el-button>
                <el-button type="info" @click="onPublish('草稿')">
                    草稿
                </el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }
        .el-upload:hover {
            border-color: var(--el-color-primary);
        }
        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}
.editor {
    width: 100%;
    :deep(.ql-editor) {
        min-height: 400px;
    }
}
</style>

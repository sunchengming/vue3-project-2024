<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { userUserStore } from '@/stores'
import { userAvatarUploadServer } from '@/api/user'
const userStore = userUserStore()
const {
  user: { user_pic },
  getUser,
} = userStore
const imageUrl = ref(user_pic)

const handleChange = (file) => {
  //这里图片预览是file格式的文件
  // imageUrl.value = URL.createObjectURL(file.raw);
  // 这里图片预览是转换成base64文件
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
  }
  console.log(imageUrl.value)
}
const UploadRef = ref()
const selectImg = () => {
  // console.log(UploadRef.value.$el);
  // console.log(UploadRef.value.$el.querySelector('input'));
  UploadRef.value.$el.querySelector('input').click()
}
const upLoadAvatar = async () => {
  await userAvatarUploadServer({ avatar: imageUrl.value })
  await getUser()
  ElMessage.success('编辑成功')
}
</script>
<template>
  <page-container title="更换头像">
    <el-upload
      ref="UploadRef"
      class="avatar-uploader"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <div class="buttonContainer">
      <el-button type="primary" :icon="Plus" @click="selectImg">
        选择图片
      </el-button>
      <el-button type="success" :icon="Upload" @click="upLoadAvatar">
        上传头像
      </el-button>
    </div>
  </page-container>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
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
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
.buttonContainer {
  padding-top: 20px;
}
</style>

<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetArtlistServer, artDelServe } from '@/api/article'
import { formatTime } from '@/utils/format'
import channelSelect from './components/ChannelSelect.vue'
import PageDraw from './components/PageDraw.vue'
// import moment from 'moment';
const tableData = ref([])
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: '',
})
const total = ref(0) //总条数
const getArtList = async () => {
  const result = await artGetArtlistServer(params.value)
  tableData.value = result.data.data
  total.value = result.data.total
}
getArtList()
const handleSizeChange = (size) => {
  params.value.pagesize = size
  params.value.pagenum = 1
  getArtList()
}
const handleCurrentChange = (page) => {
  params.value.pagenum = page
  getArtList()
}
const onSearch = () => {
  params.value.pagenum = 1
  getArtList()
}

const reset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArtList()
}
const handleEdit = (row) => {
  articleEditRef.value.open(row)
}
// 时间切换格式方法：
// 1.moment组件
// const dataFromat = row => {
//     const data = row.pub_date;
//     return moment(data).format('YYYY-MM-DD');
// };
// 2.封装在utils中的format.js里  -建议
// element-plus中自带的dayjs 方法

// 文章发布
const articleEditRef = ref()
const onAddArticle = () => {
  articleEditRef.value.open({})
}

const handleDelete = async (row) => {
  await ElMessageBox.confirm('您确认要删除么', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  })
  ElMessage.success('删除成功')
  await artDelServe(row.id)
  getArtList()
}

const onsuccess = (type) => {
  if (type === 'add') {
    const editPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = editPage
  }
  getArtList()
}
</script>
<template>
  <page-container title="文章管理" class="contianer">
    <template #extra>
      <el-button type="primary" @click="onAddArticle"> 添加文章</el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类：">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state" style="width: 240px">
          <el-option label="已发布" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button type="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="文章">
        <!-- 利用作用域插槽row可以获取当前行的数据 -->
        <template #default="{ row }">
          <el-link type="primary" :underline="false">
            {{ row.title }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="pub_date" label="发布时间">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button
            type="primary"
            plain
            circle
            :icon="Edit"
            @click="handleEdit(row)"
          ></el-button>
          <el-button
            type="warning"
            plain
            circle
            :icon="Delete"
            @click="handleDelete(row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5]"
      :background="true"
      layout="jumper,total, sizes, prev, pager, next"
      :total="total"
      style="margin-top: 20px; justify-content: flex-end"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <page-draw ref="articleEditRef" @success="onsuccess"></page-draw>
  </page-container>
</template>
<style lang="scss" scoped>
:deep(.el-table__cell) {
  padding: 20px 0;
}
</style>

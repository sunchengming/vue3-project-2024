<script setup>
import { artGetListServer } from '@/api/article.js'
import { ref, watch } from 'vue'
const options = [
  {
    value: 'Option11',
    label: 'Option11',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
]
const channelList = ref([])
const getArtList = async () => {
  const result = await artGetListServer()
  channelList.value = result.data.data
}
getArtList()

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: [String, Number],
  },
})
watch(
  () => props.modelValue,
  (oldValue, newValue) => {
    console.log(oldValue, newValue)
  },
)
</script>
<template>
  <el-select
    style="width: 240px"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    />
  </el-select>
</template>

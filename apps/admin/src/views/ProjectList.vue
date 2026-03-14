<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">作品管理</h1>
      <el-button type="primary" @click="$router.push('/projects/edit')">新建作品</el-button>
    </div>
    <el-table v-loading="loading" :data="projects" stripe>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="slug" label="Slug" width="180" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 'published' ? 'success' : 'info'">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="$router.push(`/projects/edit/${row._id}`)">编辑</el-button>
          <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { projectApi } from '@/utils/api';
import type { ProjectListItem } from '@/utils/api';
import { ElMessage, ElMessageBox } from 'element-plus';

const projects = ref<ProjectListItem[]>([]);
const loading = ref(true);

async function fetchList() {
  loading.value = true;
  try {
    const { data } = await projectApi.getList({ limit: 100, status: 'all' } as Record<string, unknown>);
    projects.value = data.items || [];
  } catch {
    projects.value = [];
  } finally {
    loading.value = false;
  }
}

async function handleDelete(row: ProjectListItem) {
  await ElMessageBox.confirm(`确定删除「${row.title}」？`, '确认');
  try {
    await projectApi.delete(row._id);
    ElMessage.success('已删除');
    fetchList();
  } catch {
    ElMessage.error('删除失败');
  }
}

onMounted(fetchList);
</script>

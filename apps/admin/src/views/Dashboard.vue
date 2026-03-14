<template>
  <div>
    <h1 class="mb-6 text-2xl font-bold">仪表盘</h1>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary">{{ stats.projectCount }}</div>
            <div class="mt-2 text-gray-500">作品总数</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary">{{ stats.categoryCount }}</div>
            <div class="mt-2 text-gray-500">分类总数</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { projectApi, categoryApi } from '@/utils/api';

const stats = ref({ projectCount: 0, categoryCount: 0 });

onMounted(async () => {
  try {
    const [proj, cat] = await Promise.all([
      projectApi.getList({ status: 'all', limit: 1 }),
      categoryApi.getAll(),
    ]);
    stats.value = {
      projectCount: proj.data?.total ?? proj.data.items?.length ?? 0,
      categoryCount: cat.data?.length ?? 0,
    };
  } catch {
    stats.value = { projectCount: 0, categoryCount: 0 };
  }
});
</script>

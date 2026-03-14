<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">分类管理</h1>
      <el-button type="primary" @click="showDialog()">新建分类</el-button>
    </div>
    <el-table v-loading="loading" :data="categories" stripe>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="slug" label="Slug" />
      <el-table-column prop="sortOrder" label="排序" width="80" />
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="showDialog(row)">编辑</el-button>
          <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" :title="editing ? '编辑分类' : '新建分类'" width="400px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Slug">
          <el-input v-model="form.slug" placeholder="留空自动生成" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sortOrder" :min="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { categoryApi } from '@/utils/api';
import type { Category } from '@/utils/api';
import { ElMessage, ElMessageBox } from 'element-plus';

const categories = ref<Category[]>([]);
const loading = ref(true);
const dialogVisible = ref(false);
const saving = ref(false);
const editing = ref<Category | null>(null);

const form = ref({ name: '', slug: '', sortOrder: 0 });

async function fetchList() {
  loading.value = true;
  try {
    const { data } = await categoryApi.getAll();
    categories.value = data || [];
  } catch {
    categories.value = [];
  } finally {
    loading.value = false;
  }
}

function showDialog(row?: Category) {
  editing.value = row || null;
  form.value = row
    ? { name: row.name, slug: row.slug, sortOrder: row.sortOrder }
    : { name: '', slug: '', sortOrder: categories.value.length };
  dialogVisible.value = true;
}

async function handleSave() {
  if (!form.value.name) {
    ElMessage.warning('请输入名称');
    return;
  }
  saving.value = true;
  try {
    if (editing.value) {
      await categoryApi.update(editing.value._id, form.value);
      ElMessage.success('已保存');
    } else {
      await categoryApi.create(form.value);
      ElMessage.success('已创建');
    }
    dialogVisible.value = false;
    fetchList();
  } catch {
    ElMessage.error('保存失败');
  } finally {
    saving.value = false;
  }
}

async function handleDelete(row: Category) {
  await ElMessageBox.confirm(`确定删除「${row.name}」？`, '确认');
  try {
    await categoryApi.delete(row._id);
    ElMessage.success('已删除');
    fetchList();
  } catch {
    ElMessage.error('删除失败');
  }
}

onMounted(fetchList);
</script>

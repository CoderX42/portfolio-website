<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">{{ id ? '编辑作品' : '新建作品' }}</h1>
      <el-button @click="$router.back()">返回</el-button>
    </div>
    <el-form v-loading="loading" :model="form" label-width="100px" class="max-w-2xl">
      <el-form-item label="标题" required>
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="Slug">
        <el-input v-model="form.slug" placeholder="留空自动生成" />
      </el-form-item>
      <el-form-item label="简介" required>
        <el-input v-model="form.description" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="form.content" type="textarea" :rows="12" placeholder="Markdown 格式" />
      </el-form-item>
      <el-form-item label="封面图">
        <el-input v-model="form.coverImage" placeholder="图片 URL" />
      </el-form-item>
      <el-form-item label="标签">
        <el-input v-model="tagsStr" placeholder="逗号分隔，如: Vue, NestJS" />
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.categoryIds" multiple placeholder="选择分类">
          <el-option v-for="c in categories" :key="c._id" :label="c.name" :value="c._id" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status">
          <el-option label="草稿" value="draft" />
          <el-option label="已发布" value="published" />
          <el-option label="已归档" value="archived" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="saving" @click="handleSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { projectApi, categoryApi } from '@/utils/api';
import type { Category } from '@/utils/api';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.id as string | undefined);

const form = ref({
  title: '',
  slug: '',
  description: '',
  content: '',
  coverImage: '',
  categoryIds: [] as string[],
  tags: [] as string[],
  status: 'draft',
});

const tagsStr = computed({
  get: () => form.value.tags.join(', '),
  set: (v: string) => {
    form.value.tags = v.split(',').map((t) => t.trim()).filter(Boolean);
  },
});

const categories = ref<Category[]>([]);
const loading = ref(false);
const saving = ref(false);

async function fetchCategories() {
  const { data } = await categoryApi.getAll();
  categories.value = data;
}

async function fetchProject() {
  if (!id.value) return;
  loading.value = true;
  try {
    const { data } = await projectApi.getById(id.value);
    form.value = {
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content || '',
      coverImage: data.coverImage || '',
      categoryIds: data.categoryIds || [],
      tags: data.tags || [],
      status: data.status || 'draft',
    };
  } catch {
    ElMessage.error('加载失败');
  } finally {
    loading.value = false;
  }
}

async function handleSave() {
  if (!form.value.title || !form.value.description) {
    ElMessage.warning('请填写标题和简介');
    return;
  }
  saving.value = true;
  try {
    if (id.value) {
      await projectApi.update(id.value, form.value);
      ElMessage.success('已保存');
    } else {
      const { data } = await projectApi.create(form.value);
      ElMessage.success('已创建');
      router.replace(`/projects/edit/${data._id}`);
    }
  } catch {
    ElMessage.error('保存失败');
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  fetchCategories();
  if (id.value) fetchProject();
});

watch(id, (v) => {
  if (v) fetchProject();
  else form.value = { title: '', slug: '', description: '', content: '', coverImage: '', categoryIds: [], tags: [], status: 'draft' };
});
</script>

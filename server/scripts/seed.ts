import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_db';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  if (!db) throw new Error('No database');

  const users = db.collection('users');
  const existing = await users.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log('Admin user already exists');
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await users.insertOne({
    email: ADMIN_EMAIL,
    passwordHash,
    role: 'admin',
  });
  console.log('Admin user created:', ADMIN_EMAIL);

  const categories = db.collection('categories');
  const catCount = await categories.countDocuments();
  if (catCount === 0) {
    await categories.insertMany([
      { name: 'Vibe Coding', slug: 'vibe-coding', icon: 'code', sortOrder: 0 },
      { name: 'AI 工具', slug: 'ai-tools', icon: 'robot', sortOrder: 1 },
      { name: '全栈开发', slug: 'fullstack', icon: 'layers', sortOrder: 2 },
    ]);
    console.log('Categories seeded');
  }

  const projects = db.collection('projects');
  const projCount = await projects.countDocuments();
  if (projCount === 0) {
    const catIds = (await categories.find({}).toArray()).map((c) => c._id.toString());
    await projects.insertOne({
      title: '示例项目',
      slug: 'demo-project',
      description: '这是一个示例作品，展示 Vibe Coding 的创意与实践。',
      content: '## 简介\n\n这是通过 AI 辅助完成的示例项目。\n\n### 技术栈\n- Vue 3\n- NestJS\n- MongoDB',
      coverImage: '',
      media: [],
      codeSnippets: [
        { language: 'typescript', code: 'const greet = (name: string) => `Hello, ${name}!`;', filename: 'example.ts' },
      ],
      categoryIds: catIds.slice(0, 1),
      tags: ['Vibe Coding', 'Demo'],
      status: 'published',
      sortOrder: 0,
    });
    console.log('Sample project seeded');
  }

  await mongoose.disconnect();
  console.log('Seed complete');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});

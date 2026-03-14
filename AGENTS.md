# AGENTS.md

> 本文件专为 AI 编程助手设计，包含项目架构、开发规范和常用操作指南。

---

## 项目概述

本项目是一个 Vibe Coding 作品集网站，采用前后端分离架构，包含：

- **前台展示端** (`apps/web`): Vue 3 + Vite + Tailwind CSS，用于展示作品集
- **后台管理端** (`apps/admin`): Vue 3 + Vite + Element Plus，用于管理作品和内容
- **后端服务** (`server`): NestJS + MongoDB，提供 RESTful API
- **共享包** (`packages/shared`): 前后端共享的 TypeScript 类型和常量

---

## 技术栈

### 前端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | ^3.4 | 渐进式 JavaScript 框架 |
| TypeScript | ^5.0 | 类型安全的 JavaScript 超集 |
| Vite | ^5.0 | 下一代前端构建工具 |
| Vue Router 4 | ^4.2 | 官方路由管理 |
| Pinia | ^2.1 | 状态管理方案 |
| Tailwind CSS | ^3.4 | 原子化 CSS 框架 |
| Element Plus | ^2.5 | 后台 UI 组件库 |
| Axios | ^1.6 | HTTP 客户端 |
| GSAP | ^3.12 | 专业动画库 |
| @unhead/vue | ^1.0 | SEO 头部管理 |

### 后端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| NestJS | ^10.0 | Node.js 企业级框架 |
| Mongoose | ^8.0 | MongoDB ODM |
| MongoDB | ^7.0 | 文档型数据库 |
| JWT | ^9.0 | 身份认证 |
| Swagger | ^7.0 | API 文档 |
| Class Validator | ^0.14 | DTO 验证 |
| @nestjs/throttler | ^5.0 | 接口限流 |

---

## 项目结构

```
portfolio-website/
├── apps/
│   ├── web/                    # 前台展示端
│   │   ├── src/
│   │   │   ├── components/     # 公共组件
│   │   │   ├── views/          # 页面视图 (Home, ProjectList, ProjectDetail, About, Contact)
│   │   │   ├── router/         # 路由配置
│   │   │   ├── utils/          # 工具函数
│   │   │   └── styles/         # 全局样式
│   │   ├── public/             # 静态资源
│   │   ├── vite.config.ts      # Vite 配置 (端口 5173)
│   │   └── tailwind.config.js  # Tailwind 配置
│   │
│   └── admin/                  # 后台管理端
│       ├── src/
│       │   ├── components/     # 业务组件 (AdminLayout)
│       │   ├── views/          # 管理页面 (Dashboard, Login, ProjectEdit, ProjectList, CategoryList)
│       │   ├── router/         # 路由配置（带权限守卫）
│       │   ├── stores/         # Pinia 状态管理 (auth)
│       │   └── utils/          # 工具函数
│       └── vite.config.ts      # Vite 配置 (端口 5174)
│
├── server/                     # 后端服务 (NestJS)
│   ├── src/
│   │   ├── modules/            # 业务模块
│   │   │   ├── auth/           # 认证模块 (JWT)
│   │   │   ├── project/        # 作品模块 (CRUD)
│   │   │   ├── category/       # 分类模块
│   │   │   ├── upload/         # 文件上传模块
│   │   │   └── contact/        # 联系表单模块
│   │   ├── schemas/            # Mongoose 数据模型
│   │   ├── database/           # 数据库配置（支持内存数据库）
│   │   ├── app.module.ts       # 根模块
│   │   └── main.ts             # 入口文件
│   └── scripts/seed.ts         # 数据库初始化脚本
│
├── packages/
│   └── shared/                 # 共享包
│       └── src/
│           ├── types/          # TypeScript 类型 (Project, Category, User)
│           └── constants/      # 常量定义 (API_ROUTES, PROJECT_STATUS)
│
├── docker/
│   └── Dockerfile.server       # 后端 Docker 镜像
├── docker-compose.yml          # Docker Compose 配置
└── docs/
    └── DEPLOYMENT.md           # 部署指南
```

---

## 开发环境要求

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0 (项目使用 pnpm workspaces 管理 monorepo)
- **MongoDB**: >= 6.0 (可选，支持内存数据库开发)
- **Redis**: >= 7 (可选，开发期可不使用)

---

## 快速开始

### 1. 安装依赖

```bash
npm install -g pnpm
pnpm install
```

### 2. 配置环境变量

```bash
# 后端环境配置
cp server/.env.example server/.env

# 前台环境配置
cp apps/web/.env.example apps/web/.env

# 后台环境配置
cp apps/admin/.env.example apps/admin/.env
```

编辑各 `.env` 文件，设置 `JWT_SECRET`、`ADMIN_EMAIL`、`ADMIN_PASSWORD` 等必要配置。

### 3. 启动开发服务器

```bash
# 启动所有服务（并行运行）
pnpm dev

# 或分别启动
pnpm dev:server    # 后端: http://localhost:3000
pnpm dev:web       # 前台: http://localhost:5173
pnpm dev:admin     # 后台: http://localhost:5174
```

开发服务器默认端口：
- 后端 API: http://localhost:3000
- API 文档: http://localhost:3000/api-docs
- 前台: http://localhost:5173
- 后台: http://localhost:5174

### 4. 初始化数据（可选）

```bash
# 使用本地 MongoDB 时导入示例数据
pnpm db:seed
```

默认管理员账号：`admin@example.com` / `admin123`

---

## 常用命令

### 开发命令

```bash
pnpm dev              # 同时启动 server, web, admin
pnpm dev:server       # 只启动后端（使用内存数据库）
pnpm dev:mongo        # 只启动后端（使用配置的 MongoDB）
pnpm dev:web          # 只启动前台
pnpm dev:admin        # 只启动后台
```

### 构建命令

```bash
pnpm build            # 构建所有包
pnpm build:server     # 只构建后端
pnpm build:web        # 只构建前台
pnpm build:admin      # 只构建后台
```

### 代码质量

```bash
pnpm lint             # 运行 ESLint 检查
pnpm lint:fix         # 自动修复 ESLint 问题
pnpm format           # 使用 Prettier 格式化代码
pnpm typecheck        # 运行 TypeScript 类型检查
```

### 数据库

```bash
pnpm db:seed          # 导入示例数据（需在 server 目录下配置好 MongoDB）
```

---

## 代码风格规范

### ESLint 配置

- 使用 `@typescript-eslint` 插件
- 继承 `eslint:recommended` 和 `@typescript-eslint/recommended`
- 与 Prettier 集成，避免格式冲突
- 忽略 `node_modules`, `dist`, `*.cjs`

### Prettier 配置

```json
{
  "semi": true,           // 使用分号
  "singleQuote": true,    // 使用单引号
  "tabWidth": 2,          // 缩进 2 空格
  "trailingComma": "es5", // ES5 风格的尾随逗号
  "printWidth": 100       // 每行最大 100 字符
}
```

### TypeScript 规范

- 所有代码使用 TypeScript 编写
- 启用严格模式 (`strict: true`)
- 使用 ES2020 目标
- 模块系统使用 ESNext

---

## 环境变量配置

### 后端 (server/.env)

```env
# 应用配置
NODE_ENV=development
PORT=3000
API_PREFIX=/api/v1

# 数据库
MONGODB_URI=mongodb://localhost:27017/portfolio_db
USE_MEMORY_MONGO=true  # 开发时使用内存数据库

# Redis (可选)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT 认证
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# 阿里云 OSS (可选)
OSS_ACCESS_KEY_ID=
OSS_ACCESS_KEY_SECRET=
OSS_BUCKET=
OSS_REGION=oss-cn-hangzhou
OSS_ENDPOINT=oss-cn-hangzhou.aliyuncs.com

# 管理员账号
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
```

### 前台 (apps/web/.env)

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_OSS_BASE_URL=
VITE_SITE_NAME=我的作品集
VITE_SITE_DESCRIPTION=Vibe Coding 作品集展示
```

### 后台 (apps/admin/.env)

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

---

## 部署指南

### Docker Compose 部署

```bash
# 启动所有服务（MongoDB + Redis + Server）
docker-compose up -d
```

### 分离部署

**前端构建：**
```bash
pnpm build:web
pnpm build:admin
# 将 dist 目录部署到 Nginx 或 OSS
```

**后端部署：**
```bash
cd server
pnpm build
NODE_ENV=production node dist/main.js
# 或使用 PM2: pm2 start dist/main.js --name portfolio-api
```

---

## 关键开发约定

### 模块组织

- 后端采用 NestJS 模块化架构，每个模块包含 controller, service, dto, module
- 前端按功能划分视图和组件
- 共享类型定义在 `packages/shared` 中，前后端共用

### 路由约定

**前台路由：**
- `/` - 首页
- `/projects` - 作品列表
- `/projects/:slug` - 作品详情
- `/about` - 关于我
- `/contact` - 联系方式

**后台路由：**
- `/login` - 登录页
- `/` - 仪表盘
- `/projects` - 作品管理
- `/projects/edit/:id?` - 编辑作品
- `/categories` - 分类管理

### API 约定

- 前缀: `/api/v1`
- 认证: JWT Bearer Token
- 限流: 每分钟 100 请求
- 文档: Swagger UI 在 `/api-docs`

### 数据库模型

主要集合：
- `projects` - 作品数据
- `categories` - 分类数据
- `users` - 用户数据

---

## 安全注意事项

1. **JWT 密钥**：生产环境务必更换 `JWT_SECRET`，使用强随机字符串
2. **管理员密码**：首次部署后应立即修改默认管理员密码
3. **环境变量**：不要将 `.env` 文件提交到版本控制
4. **CORS**：生产环境应配置具体的允许域名，而非 `origin: true`
5. **文件上传**：限制上传文件类型和大小，防止恶意文件上传

---

## 故障排查

### 常见问题

**无法连接 MongoDB**
- 检查 `MONGODB_URI` 配置
- 或使用 `USE_MEMORY_MONGO=true` 启用内存数据库

**前端无法连接后端 API**
- 检查 Vite 配置的 proxy 设置
- 确认后端服务已启动

**JWT 认证失败**
- 检查 `JWT_SECRET` 是否一致
- 确认 Token 未过期

---

## 文件引用关系

```
apps/web/        引用  packages/shared
apps/admin/      引用  packages/shared
server/          引用  packages/shared (通过 tsconfig paths)

apps/web/vite.config.ts    proxy -> localhost:3000
apps/admin/vite.config.ts  proxy -> localhost:3000
```

---

> 🚀 使用 Trae + Claude 辅助开发

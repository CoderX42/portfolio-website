# 项目作品集网站

> 一个 Vibe Coding 作品集展示平台，包含前台展示和后台管理功能。

[Tech Stack](https://vuejs.org/)
[License](LICENSE)

---

## 📋 项目简介

本项目是一个专为 Vibe Coding 领域设计的作品集网站，用于展示个人在 AI 辅助编程方面的各类作品。网站采用前后端分离架构，具备：

- 🎨 **响应式设计**：适配桌面、平板、移动设备
- ⚡ **高性能**：图片懒加载、CDN 加速、Redis 缓存
- 🔍 **SEO 优化**：服务端渲染支持、结构化数据
- 🛡️ **安全可靠**：JWT 认证、接口限流、SQL 注入防护
- 📱 **后台管理**：作品 CRUD、富文本编辑、数据统计

---

## 🛠️ 技术栈

### 前端技术栈


| 技术                                            | 版本    | 用途                  |
| --------------------------------------------- | ----- | ------------------- |
| [Vue 3](https://vuejs.org/)                   | ^3.4  | 渐进式 JavaScript 框架   |
| [TypeScript](https://www.typescriptlang.org/) | ^5.0  | 类型安全的 JavaScript 超集 |
| [Vite](https://vitejs.dev/)                   | ^5.0  | 下一代前端构建工具           |
| [Vue Router 4](https://router.vuejs.org/)     | ^4.2  | 官方路由管理              |
| [Pinia](https://pinia.vuejs.org/)             | ^2.1  | 状态管理方案              |
| [Tailwind CSS](https://tailwindcss.com/)      | ^3.4  | 原子化 CSS 框架          |
| [Element Plus](https://element-plus.org/)     | ^2.5  | 后台 UI 组件库           |
| [Axios](https://axios-http.com/)              | ^1.6  | HTTP 客户端            |
| [GSAP](https://greensock.com/gsap/)           | ^3.12 | 专业动画库               |


### 后端技术栈


| 技术                                                              | 版本    | 用途            |
| --------------------------------------------------------------- | ----- | ------------- |
| [NestJS](https://nestjs.com/)                                   | ^10.0 | Node.js 企业级框架 |
| [TypeScript](https://www.typescriptlang.org/)                   | ^5.0  | 后端类型支持        |
| [Mongoose](https://mongoosejs.com/)                             | ^8.0  | MongoDB ODM   |
| [MongoDB](https://www.mongodb.com/)                             | ^7.0  | 文档型数据库        |
| [Redis](https://redis.io/)                                      | ^7.0  | 缓存与会话存储       |
| [JWT](https://jwt.io/)                                          | ^9.0  | 身份认证          |
| [Swagger](https://swagger.io/)                                  | ^7.0  | API 文档        |
| [Class Validator](https://github.com/typestack/class-validator) | ^0.14 | DTO 验证        |


### 部署与运维


| 服务                          | 用途              |
| --------------------------- | --------------- |
| 阿里云 OSS                     | 静态资源托管与 CDN 加速  |
| 阿里云函数计算 FC                  | Serverless 后端部署 |
| 阿里云 MongoDB / MongoDB Atlas | 云数据库服务          |
| 阿里云 Redis                   | 云缓存服务           |


---

## 📁 项目结构

```
portfolio-website/
├── apps/
│   ├── web/                    # 前台展示端 (Vue3 + Vite)
│   │   ├── src/
│   │   │   ├── components/     # 公共组件
│   │   │   ├── views/          # 页面视图
│   │   │   ├── composables/    # 组合式函数
│   │   │   ├── stores/         # Pinia 状态管理
│   │   │   ├── utils/          # 工具函数
│   │   │   └── styles/         # 全局样式
│   │   ├── public/             # 静态资源
│   │   └── index.html
│   │
│   └── admin/                  # 后台管理端 (Vue3 + Element Plus)
│       ├── src/
│       │   ├── components/     # 业务组件
│       │   ├── views/          # 管理页面
│       │   ├── stores/         # 状态管理
│       │   ├── api/            # API 接口
│       │   └── utils/          # 工具函数
│       └── index.html
│
├── server/                     # 后端服务 (NestJS)
│   ├── src/
│   │   ├── modules/            # 业务模块
│   │   │   ├── auth/           # 认证模块
│   │   │   ├── project/        # 作品模块
│   │   │   ├── category/       # 分类模块
│   │   │   ├── upload/         # 文件上传模块
│   │   │   └── user/           # 用户模块
│   │   ├── common/             # 公共代码
│   │   ├── database/           # 数据库配置
│   │   └── main.ts             # 入口文件
│   ├── schemas/                # Mongoose 数据模型
│   │   ├── project.schema.ts
│   │   ├── category.schema.ts
│   │   ├── user.schema.ts
│   │   └── index.ts
│   └── test/                   # 测试文件
│
├── packages/                   # 共享包
│   └── shared/                 # 前后端共享类型和常量
│
├── docker/                     # Docker 配置
├── docs/                       # 项目文档
└── scripts/                    # 自动化脚本
```

---

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0 (推荐使用 pnpm 管理 monorepo)
- **MongoDB**: >= 6.0
- **Redis**: >= 7

### 1. 克隆项目

```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

### 2. 安装依赖

```bash
# 安装 pnpm (如果未安装)
npm install -g pnpm

# 安装所有依赖
pnpm install
```

### 3. 配置环境变量

```bash
# 后端环境配置
cp server/.env.example server/.env

# 前台环境配置
cp apps/web/.env.example apps/web/.env

# 后台环境配置
cp apps/admin/.env.example apps/admin/.env
```

编辑各 `.env` 文件，填写数据库连接、JWT 密钥、OSS 配置等信息。

### 4. 初始化数据库

```bash
# 确保 MongoDB 服务已启动
# 本地开发可使用 Docker: docker run -d -p 27017:27017 --name mongo mongo:7

# 启动后端服务时会自动创建集合和索引
cd server
pnpm dev

# 可选：导入示例数据
pnpm db:seed
```

### 5. 启动开发服务器

```bash
# 启动所有服务 (并行)
pnpm dev

# 或分别启动
pnpm dev:server    # 后端服务: http://localhost:3000
pnpm dev:web       # 前台端: http://localhost:5173
pnpm dev:admin     # 后台端: http://localhost:5174
```

---

## 📦 常用命令

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev
pnpm dev:server
pnpm dev:web
pnpm dev:admin

# 构建生产版本
pnpm build
pnpm build:server
pnpm build:web
pnpm build:admin

# 代码检查与格式化
pnpm lint
pnpm lint:fix
pnpm format

# 类型检查
pnpm typecheck

# 测试
pnpm test
pnpm test:e2e
```

---

## 🔧 环境变量配置

### 后端环境变量 (server/.env)

```env
# 应用配置
NODE_ENV=development
PORT=3000
API_PREFIX=/api/v1

# 数据库
MONGODB_URI="mongodb://localhost:27017/portfolio_db"
# 生产环境使用 MongoDB Atlas 或阿里云 MongoDB
# MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net/portfolio_db"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT 认证
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# 阿里云 OSS
OSS_ACCESS_KEY_ID=your_access_key
OSS_ACCESS_KEY_SECRET=your_secret_key
OSS_BUCKET=your-bucket-name
OSS_REGION=oss-cn-hangzhou
OSS_ENDPOINT=oss-cn-hangzhou.aliyuncs.com

# 管理员账号 (初始化使用)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
```

### 前台环境变量 (apps/web/.env)

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_OSS_BASE_URL=https://your-bucket.oss-cn-hangzhou.aliyuncs.com
VITE_SITE_NAME=你的名字 - 作品集
VITE_SITE_DESCRIPTION=Vibe Coding 作品集展示
```

---

## 🚀 部署指南

### 方案一：阿里云全栈部署（推荐）

#### 1. 前端部署

```bash
# 构建前台
pnpm build:web

# 构建后台
pnpm build:admin

# 上传 dist 到 OSS
# 配置 CDN 加速域名
```

#### 2. 后端部署

使用阿里云函数计算 FC：

```bash
# 安装 Serverless Devs 工具
npm install @serverless-devs/s -g

# 部署到函数计算
cd server
s deploy
```

或使用阿里云 ECS：

```bash
# 构建 Docker 镜像
docker build -t portfolio-server .

# 运行容器
docker run -d -p 3000:3000 --env-file .env portfolio-server
```

#### 3. 数据库部署

使用阿里云 MongoDB：

- 创建云数据库 MongoDB 版实例
- 配置白名单允许函数计算/ECS 访问
- 创建数据库用户并设置密码
- 更新环境变量中的 `MONGODB_URI`

或使用 MongoDB Atlas（海外访问更快）：

- 创建免费集群（M0）
- 配置网络访问白名单
- 创建数据库用户
- 获取连接字符串更新到环境变量

### 方案二：Docker Compose 本地部署

```bash
# 使用 Docker Compose 一键启动
docker-compose up -d

# 包含服务：
# - MongoDB 数据库
# - Redis 缓存
# - 后端 API 服务
# - 前端 Nginx 静态服务
```

---

## 📝 功能模块

### 前台功能

- 首页 Hero 区域展示
- 作品列表页（分页 + 筛选）
- 作品详情页（富媒体展示）
- 分类/标签浏览
- 关于我页面
- 联系方式表单
- 响应式布局
- 深色/浅色主题切换

### 后台功能

- 仪表盘数据统计
- 作品管理（CRUD）
- 富文本编辑器（Markdown + 图片上传）
- 分类/标签管理
- 文件资源管理器
- 管理员账号管理
- 网站配置（SEO、社交链接）
- 访问日志统计

---

## 🎨 设计规范

### 颜色系统

```css
/* 主色调 */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-500: #3b82f6;
--primary-600: #2563eb;
--primary-700: #1d4ed8;

/* 中性色 */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-500: #6b7280;
--gray-900: #111827;
```

### 断点设计

```css
/* 移动端优先 */
sm: 640px   /* 小平板 */
md: 768px   /* 平板 */
lg: 1024px  /* 笔记本 */
xl: 1280px  /* 桌面 */
2xl: 1536px /* 大屏 */
```

---

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

---

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证开源。

---

## 📞 联系方式

- 作者: [CoderX](https://github.com/CoderX42)
- 邮箱: [supanpan199919@163.com](mailto:supanpan199919@163.com)

---

> 🚀 使用 [Trae](https://www.trae.ai/) + [Claude](https://claude.ai/) 辅助开发


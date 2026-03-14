# 部署指南

## 本地开发

### 1. 启动数据库（Docker）

```bash
docker-compose up -d mongo redis
```

### 2. 配置环境变量

```bash
cp server/.env.example server/.env
cp apps/web/.env.example apps/web/.env
cp apps/admin/.env.example apps/admin/.env
```

编辑 `server/.env`，设置 `JWT_SECRET`、`ADMIN_EMAIL`、`ADMIN_PASSWORD` 等。

### 3. 初始化数据

```bash
cd server && pnpm db:seed
```

默认管理员：`admin@example.com` / `admin123`（可在 .env 中修改）

### 4. 启动服务

```bash
pnpm dev
```

- 前台: http://localhost:5173
- 后台: http://localhost:5174
- API: http://localhost:3000
- API 文档: http://localhost:3000/api-docs

## 生产部署

### 方案一：Docker Compose

```bash
# 构建并启动所有服务
docker-compose up -d

# 首次部署需执行 seed
docker-compose exec server node -e "
  require('dotenv').config({ path: '.env' });
  // 或进入容器手动执行
"
```

### 方案二：分离部署

**前端（Nginx + OSS）**

```bash
pnpm build:web
pnpm build:admin
# 将 apps/web/dist 和 apps/admin/dist 上传至 OSS 或 Nginx 静态目录
```

**后端（Node / PM2）**

```bash
cd server
pnpm build
NODE_ENV=production node dist/main.js
# 或使用 PM2: pm2 start dist/main.js --name portfolio-api
```

**数据库**

- MongoDB: 阿里云 MongoDB / MongoDB Atlas
- Redis: 阿里云 Redis（可选）

### 环境变量（生产）

| 变量 | 说明 |
|------|------|
| MONGODB_URI | MongoDB 连接串 |
| JWT_SECRET | JWT 密钥（务必更换） |
| JWT_EXPIRES_IN | Token 过期时间，如 7d |
| ADMIN_EMAIL | 管理员邮箱 |
| ADMIN_PASSWORD | 管理员密码 |

云部署时可将 OSS 配置填入，用于真实文件上传。

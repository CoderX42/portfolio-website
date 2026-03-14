---
name: vibe-portfolio-fullstack
description: Implements a full-stack Vibe Coding portfolio website with pnpm monorepo (Vue3 frontend, NestJS backend, admin panel). Includes development setup without local MongoDB, and Apple-style UI/UX design. Use when building portfolio sites, full-stack monorepos, or applying Apple.com design patterns to Vue/Tailwind projects.
---

# Vibe Coding 作品集全栈实现

## 架构概览

```
portfolio-website/
├── apps/web      # 前台 (Vue3 + Vite + Tailwind)
├── apps/admin    # 后台 (Vue3 + Element Plus)
├── server        # API (NestJS + Mongoose)
└── packages/shared  # 共享类型
```

## 后端 (server)

- NestJS + Mongoose + JWT + Swagger
- 模块：auth, project, category, upload, contact
- 开发无 MongoDB：`USE_MEMORY_MONGO=true` 使用 mongodb-memory-server
- 首次启动自动创建管理员 (InitService onModuleInit)
- 启动：`pnpm dev:server`，API 在 3000 端口

## 前台 (apps/web)

- Vue 3 + Vite + Tailwind + Pinia + Vue Router
- 路由：Home, ProjectList, ProjectDetail, About, Contact
- 组件：Layout, Header, Footer, ProjectCard, ThemeToggle

## 后台 (apps/admin)

- Vue 3 + Element Plus，端口 5174
- 登录后 JWT 存储 localStorage
- 页面：Dashboard, ProjectList, ProjectEdit, CategoryList

## Apple 风格 UI 规范

参考 https://www.apple.com/ 的设计：

**色彩**
- 主色：蓝 #0071e3 (亮) / #2997ff (暗)
- 背景：#ffffff, #f5f5f7
- 文字：#1d1d1f, #86868b

**排版**
- 字体：-apple-system, BlinkMacSystemFont, SF Pro
- 标题：letter-spacing -0.02em ~ -0.03em
- 响应式：text-hero (2.5rem) → text-hero-xl (4.5rem)

**布局**
- 容器 max-width: 980px
- section-container: max-w-[980px] mx-auto px-6

**按钮**
- 主按钮：rounded-full, bg-apple-blue
- 次要：text-apple-blue, hover:bg-apple-blue/5

**交互**
- 动画：cubic-bezier(0.16, 1, 0.3, 1)
- 卡片 hover：scale-[1.02], shadow-apple

## 常见问题

**服务无法访问**
- 确保 `pnpm dev:server` / `pnpm dev:web` / `pnpm dev:admin` 已启动
- 无 MongoDB 时默认用内存 DB

**管理员账号**
- 内存 DB：首次启动自动创建 admin@example.com / admin123
- 本地 MongoDB：需执行 `pnpm db:seed`

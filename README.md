## 开始使用

**Run**

```shell
npm run dev
```

**Build**
```shell
# 开发环境
npm run build:dev

# 测试环境
npm run build:test

# 生产环境
npm run build:pro
```

## 目录结构

```
.
├── docs                  # 文档内容
├── mock
│    └── api.mock.ts      # 开发环境的 Mock 数据定义
├── public                # 静态资源文件目录 
├── src
│    ├── apis             # API 定义目录
│    ├── assets           # 资源文件
│    ├── components       # 通用组件定义
│    ├── context          # React Context
│    ├── hooks            # React 自定义 Hook
│    ├── layout           # 布局文件以及布局涉及的组件
│    ├── locales          # 国际化语言定义
│    ├── pages            # 页面文件夹
│    ├── routers          # 路由和菜单的定义
│    ├── store            # redux store 定义
│    ├── App.tsx          # React 运行入口文件
│    ├── main.tsx         # 入口文件
│    └── vite-env.d.ts    # Vite 声明文件
├── index.html            # 应用运行入口文件
├── LICENSE               # 授权文件（MIT）
├── package-lock.json     # 依赖包版本锁定文件
├── package.json          # NPM 管理
├── readme.md            
├── tsconfig.json         # TypeScript 配置文件
├── tsconfig.node.json
├── vite.config.ts        # Vite 配置文件
```

## 常见问题

**问题1：新建的页面显示没有权限？**

> 答：原因是整个系统添加了权限管理，用户只能访问有权限的页面，新添加的页面没有给当前用户分配权限，需要在
> `mock/api.mock.ts` 文件中的 `/api/account/permissions` 里，添加新创建的页面对应的 URL（路由）地址。




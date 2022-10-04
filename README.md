## 运行

- pnpm add || make install
- pnpm run dev || yarn dev

如果报 electron 未安装的报错 请进入 node_modules 文件夹下的 electron 下执行 pnpm install

pnpm 如果速度慢，请挂代理或者换源

- [x] 统一包管理器(pnpm)
- [x] 静态资源目录
- [x] 统一 commit 规范
- [ ] 302 登录验证 方案无效 因浏览器不会对 Ajax 的响应状态码做处理
- [x] 可拖拉侧边栏，已完成，但没处理对角拉伸，没处理多个 hook 导致的冲突，拖拽也没
- [x] 极简版树形组件

# 一个简陋版的热更新

### 使用方法

- pnpm i
- ts-node serve.ts [html 模板] || yarn dev

### 目前只做了 html、 js、json 文件的响应，如果需要响应其他，那就自己处理

### 主要是用了 websocket 来保持链接，以及 nodeJs 的 watch 函数来监听文件

# 一个简陋版的热更新

### 使用方法
yarn
ts-node serve.ts [html模板]
然后访问locahost:3000

### 目前只做了html和js文件的响应，如果需要响应其他，那就自己处理吧
### 主要是用了websocket来保持链接，以及nodeJs的watch函数来监听文件

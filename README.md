# 公考面试答题框架速查

## 项目结构

```
gongkao-app/
├── public/
│   └── index.html        # 主页面（所有功能都在这一个文件）
├── api/
│   └── analyze.js        # Vercel serverless 函数（AI 关键词拆解）
├── vercel.json           # Vercel 配置
└── README.md
```

## 功能
- 审题训练：审题四步法 + 关键词标注 + 发散思路
- 学习模式：五种题型答题框架 + 真题参考
- 自测模式：只看题目，逐步揭示框架对照
- 自己出题：粘贴任意题目，AI 自动拆解关键词

## 部署到 Vercel（3 步）

### 第一步：上传到 GitHub
1. 登录 github.com，点右上角 "+" → "New repository"
2. 仓库名随意，比如 `gongkao-app`，选 Public，点 Create
3. 把这个文件夹的所有文件上传（拖拽到页面即可）

### 第二步：部署到 Vercel
1. 打开 vercel.com，用 GitHub 账号登录
2. 点 "Add New Project"，选刚才的仓库
3. 不用改任何设置，直接点 "Deploy"
4. 等 1 分钟，部署完成

### 第三步：添加 API Key
1. 在 Vercel 项目页面，点 "Settings" → "Environment Variables"
2. 添加一个变量：
   - Name: `ANTHROPIC_API_KEY`
   - Value: 你的 Anthropic API Key（sk-ant-...）
3. 点 Save，然后回到 "Deployments"，点最新一次部署右边的 "..." → "Redeploy"

完成！你会得到一个 `xxx.vercel.app` 的链接，直接分享给朋友即可。

## 注意
- AI 拆解关键词功能需要 Anthropic API Key 才能使用
- 其他功能（审题训练、学习模式、自测模式）完全免费，不需要 API Key
- Vercel 免费套餐每月有 100GB 流量，个人使用完全够用

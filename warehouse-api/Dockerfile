# 使用官方 Node.js 运行时
FROM node:14-alpine

# 设置工作目录
WORKDIR /app

# 拷贝依赖清单并安装
COPY package.json package-lock.json* ./
RUN npm install --production

# 拷贝源码
COPY . .

# 暴露端口
EXPOSE 3000

# 运行命令
CMD ["npm", "start"]

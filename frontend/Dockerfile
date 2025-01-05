# Dockerfile cho ứng dụng React
# Sử dụng image Node.js
FROM node:20
# Đặt thư mục làm việc
WORKDIR /app
# Sao chép package.json và package-lock.json
COPY package*.json ./
# Cài đặt các phụ thuộc
RUN npm install
# Sao chép mã nguồn
COPY . .
# Chạy ứng dụng
CMD ["npm", "start"]
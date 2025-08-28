#!/bin/bash

echo "🐳 Bắt đầu build và chạy ứng dụng bằng Docker..."

# Kiểm tra xem có cài đặt Docker không
if ! command -v docker &> /dev/null; then
    echo "❌ Docker chưa được cài đặt. Vui lòng cài đặt Docker trước."
    exit 1
fi

# Kiểm tra xem Docker daemon có đang chạy không
if ! docker info &> /dev/null; then
    echo "❌ Docker daemon không chạy. Vui lòng khởi động Docker."
    exit 1
fi

echo "🔨 Building Docker image..."
docker build -t tvtl-fe .

if [ $? -eq 0 ]; then
    echo "✅ Docker build thành công!"

    echo "🔄 Dừng container cũ nếu có..."
    docker stop tvtl-fe-container 2>/dev/null || true
    docker rm tvtl-fe-container 2>/dev/null || true

    echo "🌐 Khởi động container mới trên cổng 3030..."
    echo "📱 Truy cập: http://localhost:3030"

    docker run -d \
        --name tvtl-fe-container \
        -p 3030:3030 \
        tvtl-fe

    echo "✅ Ứng dụng đã được khởi động thành công!"
    echo "📊 Xem logs: docker logs tvtl-fe-container"
    echo "🛑 Dừng ứng dụng: docker stop tvtl-fe-container"
else
    echo "❌ Docker build thất bại!"
    exit 1
fi

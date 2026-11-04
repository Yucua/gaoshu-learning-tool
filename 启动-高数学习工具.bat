@echo off
chcp 65001 >nul
title 高数学习工具 · 本地服务
echo ============================================
echo   同济高数 · 学习工具
echo   服务地址: http://127.0.0.1:8300/index.html
echo   浏览器里打开上面这个地址即可
echo   （关掉本窗口服务就停；再双击本文件重新启动）
echo ============================================
start "" http://127.0.0.1:8300/index.html
python -m http.server 8300 --bind 127.0.0.1

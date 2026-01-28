const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 基础路由
app.get('/', (req, res) => {
    res.json({
        message: 'API',
    });
});

app.post('/v1/api', (req, res) => {
    const data = req.body;

    console.log("data", data);

    res.status(200).json({
        success: true,
        message: '请求成功',
        data: data
    });
});


// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: '服务器内部错误',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 处理
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: '路由不存在',
        requestedUrl: req.originalUrl
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
});
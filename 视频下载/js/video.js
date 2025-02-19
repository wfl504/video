const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 使用第三方解析API（示例，需替换为真实API）
async function parseVideo(url) {
    // 这里需要替换为实际的视频解析API
    const apiUrl = `https://aikan-tv.com/tong.php?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    return response.json();
}

app.post('/api/download', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: '缺少视频链接' });
        
        // 调用解析服务
        const result = await parseVideo(url);
        
        if (result.url) {
            res.json({ downloadUrl: result.url });
        } else {
            res.status(500).json({ error: result.error || '解析失败' });
        }
    } catch (error) {
        res.status(500).json({ error: '服务器错误' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/convert', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'You must provide a YouTube URL.' });
    }

    try {
        const info = await ytdl.getInfo(url);
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

        // Select the first audio format (you can customize this logic)
        const audioUrl = audioFormats[0].url;

        return res.json({ mp3Url: audioUrl });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch video information.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

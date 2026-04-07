import express from 'express';
import { createShortLink } from '../services/tinyurl.js';
import Url from '../models/Url.js';
import { connectDB } from '../db.js';

const router = express.Router();

router.post('/shorten', async (req, res) => {
    try {
        await connectDB(); // Pastikan DB tersambung di serverless
        const { url } = req.body;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // 1. Validasi URL (Anti-Spam & Security)
        try {
            new URL(url);
        } catch (e) {
            return res.status(400).json({ error: 'URL tidak valid. Pastikan pakai http:// atau https://' });
        }

        // 2. Anti-Bot (Rate Limiting): Maksimal 5 link per menit per IP
        const oneMinuteAgo = new Date(Date.now() - 60000);
        const requestCount = await Url.countDocuments({
            ipAddress: ip,
            createdAt: { $gte: oneMinuteAgo }
        });

        if (requestCount >= 5) {
            return res.status(429).json({ 
                error: 'Terlalu banyak permintaan. Silakan tunggu 1 menit lagi ya... 🙏' 
            });
        }

        // 3. Simpan dan Generate
        const host = req.headers['x-forwarded-host'] || req.get('host');
        const result = await createShortLink(url, `${req.protocol}://${host}`, ip);
        res.json(result);
    } catch (err) {
        console.error('Shorten error:', err.message);
        res.status(500).json({ error: `Server Error Detail: ${err.message}` });
    }
});

export default router;
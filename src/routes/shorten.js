import { Router } from 'express';
import { createShortLink } from '../services/tinyurl.js';

const router = Router();

// POST /api/shorten
router.post('/shorten', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const result = await createShortLink(url, `${req.protocol}://${req.get('host')}`);
        res.json(result);
    } catch (err) {
        console.error('Shorten error:', err.message);
        res.status(500).json({ error: 'Failed to shorten URL' });
    }
});

export default router;
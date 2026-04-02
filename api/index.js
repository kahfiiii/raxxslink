import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import shortenRoute from '../src/routes/shorten.js';
import { resolveShortCode } from '../src/services/tinyurl.js';
import { connectDB } from '../src/db.js';

dotenv.config();

const app = express();
app.set('trust proxy', true);
app.use(express.json());

// Jalankan Koneksi DB
connectDB().catch(err => {
    console.error('Initial DB Connection failed:', err.message);
});

app.get('/api/health', (req, res) => res.send('RAXXSLINK Server is OK'));
app.use('/api', shortenRoute);

// Redirect short code to original URL
app.get('/:code', async (req, res) => {
    try {
        let originalUrl = await resolveShortCode(req.params.code);
        if (!originalUrl) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        // Jika URL tidak diawali http:// atau https://, tambahkan http://
        if (!/^https?:\/\//i.test(originalUrl)) {
            originalUrl = 'http://' + originalUrl;
        }

        res.redirect(originalUrl);
    } catch (err) {
        console.error('Redirect error:', err.message);
        res.status(500).json({ error: 'Database connection issue. Please check Atlas IP Whitelist.' });
    }
});



const PORT = process.env.PORT || 3000;

// Hanya listen jika tidak di lingkungan Vercel (untuk Local Dev)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;

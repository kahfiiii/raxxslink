import express from 'express';
import dotenv from 'dotenv';
import shortenRoute from './src/routes/shorten.js';
import { resolveShortCode } from './src/services/tinyurl.js';
import { connectDB } from './src/db.js';

dotenv.config();
await connectDB();

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile('index.html', { root: 'public' }));
app.use('/api', shortenRoute);

// Redirect short code to original URL
app.get('/:code', async (req, res) => {
    const originalUrl = await resolveShortCode(req.params.code);
    if (!originalUrl) {
        return res.status(404).json({ error: 'Short URL not found' });
    }
    res.redirect(originalUrl);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
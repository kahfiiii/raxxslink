import crypto from 'crypto';
import Url from '../models/Url.js';

export async function createShortLink(originalUrl, baseUrl = 'http://localhost:3000') {
  const shortCode = crypto.randomBytes(4).toString('base64url').slice(0, 6);

  await Url.create({ shortCode, originalUrl });

  return {
    shortUrl: `${baseUrl}/${shortCode}`,
    shortCode,
    originalUrl
  };
}

export async function resolveShortCode(shortCode) {
  const entry = await Url.findOne({ shortCode });
  return entry ? entry.originalUrl : null;
}


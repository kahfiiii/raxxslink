import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  shortCode: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
  ipAddress: { type: String }, // Simpan IP pembuat
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Url', urlSchema);

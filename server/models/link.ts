// server/models/Link.js

import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    unique: true,
    required: true
  },
  redirect: {
    type: String
  }
});

export default mongoose.models.Link || mongoose.model('Link', linkSchema);

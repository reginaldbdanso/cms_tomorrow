import mongoose from 'mongoose';
import { isStringTextContainingNode } from 'typescript';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
postSchema.add({
  excerpt: { type: String },
  category: { type: String },
  readTime: { type: String},
  coverImage: { type: String },
  authorImage: { type: String },
});

export default mongoose.model('Post', postSchema);
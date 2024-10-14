import express from 'express';
import {
  createBlog,
  getBlogs,
  getBlog,
  deleteBlog,
  updateBlog
} from '../controllers/blogController.js';

const router = express.Router();

// GET all Blogs
router.get('/', getBlogs);

// GET a single Blog
router.get('/:id', getBlog);

// POST a new Blog
router.post('/', createBlog);

// DELETE a Blog
router.delete('/:id', deleteBlog);

// UPDATE a Blog
router.patch('/:id', updateBlog);

export default router;
import Blog from '../models/blogSchema.js';
import mongoose from 'mongoose';

// GET all Blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({createdAt: -1});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// GET a single Blog
export const getBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Blog not found'});
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({error: 'Blog not found'});
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// POST a new Blog
export const createBlog = async (req, res) => {
  const {title, content, author} = req.body;

  let emptyFields = [];
  if (!title) emptyFields.push('title');
  if (!content) emptyFields.push('content');
  if (!author) emptyFields.push('author');

  if (emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill in all the fields', emptyFields});
  }

  try {
    const blog = await Blog.create({title, content, author});
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// DELETE a Blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Blog not found'});
  }

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({error: 'Blog not found'});
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// UPDATE a Blog
export const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Blog not found'});
  }

  try {
    const blog = await Blog.findByIdAndUpdate(id, {...req.body}, {new: true});
    if (!blog) {
      return res.status(404).json({error: 'Blog not found'});
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

export default {
  createBlog,
  getBlogs,
  getBlog,
  deleteBlog,
  updateBlog
}
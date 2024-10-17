import express from 'express';
// import requireAuth from '../middleware/requireAuth';
import {
    createBlog,
    getBlogs,
    // getUserBlogs,
    getBlog,
    deleteBlog,
    updateBlog
} from '../controllers/blogController.js';

const router = express.Router();


// GET all Blogs
router.get('/', getBlogs)

// GET all Blogs by a user
// router.get('/user', getUserBlogs)

//GET a single Blog
router.get('/:id', getBlog)

//require authentication for all routes below
// router.use(requireAuth);

//POST a new Blog
router.post('/', createBlog)

//DELETE a Blog
router.delete('/:id', deleteBlog)

// UPDATE a Blog
router.patch('/:id', updateBlog)

export default router;
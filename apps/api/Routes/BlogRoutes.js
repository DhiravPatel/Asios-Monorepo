const express = require('express')
const router = express.Router()
const { blog_upload } = require('../Middleware/multerConfig')
const { createBlogPost, getAllBlogs, deleteBlog, updateBlog, getBlogById, generateBlogFromQuestion } = require('../Controller/Blog')

router.post('/add-blog', blog_upload.single('imageFile'), createBlogPost)
router.get('/get-blog', getAllBlogs)
router.delete('/delete-blog/:id', deleteBlog)
router.put('/update-blog/:id', blog_upload.single('imageFile'), updateBlog)
router.get('/get-blog/:id',getBlogById)
router.post('/generate-blog',generateBlogFromQuestion)

module.exports = router

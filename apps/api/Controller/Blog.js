const { databases, storage } = require('../Connection/appwriteClient') 
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { ID } = require('node-appwrite')

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID
const COLLECTION_ID = process.env.APPWRITE_COLLECTION_ID
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID

exports.createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body
    const imageFile = req.file

    if (!title || !content || !imageFile) {
      return res.status(400).json({ error: 'Title, content, and image are required.' })
    }

    const file = new File([imageFile.buffer], imageFile.originalname, {
      type: imageFile.mimetype,
    })

    const uploadedImage = await storage.createFile(BUCKET_ID, ID.unique(), file)
    const imageId = uploadedImage.$id

    const newBlog = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      title,
      content,
      image:imageId,
    })

    res.status(201).json({
      message: 'Blog post created successfully',
      data: newBlog,
    })
  } catch (error) {
    console.error('Error creating blog post:', error)
    res.status(500).json({ error: error.message })
  }
}

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await databases.listDocuments(DATABASE_ID, COLLECTION_ID)
    
    const blogsWithImages = await Promise.all(
      blogs.documents.map(async (blog) => {
        try {
          // Get the file details to construct the URL
          const fileDetails = await storage.getFile(BUCKET_ID, blog.image)
          const imageUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${blog.image}/view?project=${process.env.APPWRITE_PROJECT_ID}`
          
          return {
            ...blog,
            imageUrl: imageUrl
          }
        } catch (imageError) {
          console.error('Error fetching image for blog:', blog.$id, imageError)
          return {
            ...blog,
            imageUrl: null
          }
        }
      })
    )

    res.status(200).json({
      message: 'Blogs fetched successfully',
      data: blogsWithImages,
    })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    res.status(500).json({ error: error.message })
  }
}

exports.deleteBlog = async (req, res) => {
  try {
    const { id:blogId } = req.params

    if (!blogId) {
      return res.status(400).json({ error: 'Blog ID is required.' })
    }

    const blog = await databases.getDocument(DATABASE_ID, COLLECTION_ID, blogId)
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found.' })
    }

    if (blog.image) {
      try {
        await storage.deleteFile(BUCKET_ID, blog.image)
      } catch (imageError) {
        console.error('Error deleting image:', imageError)
        // Continue with blog deletion even if image deletion fails
      }
    }

    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, blogId)

    res.status(200).json({
      message: 'Blog and associated image deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting blog:', error)
    res.status(500).json({ error: error.message })
  }
}

exports.updateBlog = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const { title, content } = req.body;
    const imageFile = req.file;

    if (!blogId || !title || !content) {
      return res.status(400).json({ error: 'Required fields missing.' });
    }

    const existingBlog = await databases.getDocument(DATABASE_ID, COLLECTION_ID, blogId);
    if (!existingBlog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }

    let imageId = existingBlog.image;

    if (imageFile) {
      // New image uploaded: delete old one, upload new
      if (existingBlog.image) {
        try {
          await storage.deleteFile(BUCKET_ID, existingBlog.image);
        } catch (imageError) {
          console.error('Error deleting old image:', imageError);
        }
      }

      const file = new File([imageFile.buffer], imageFile.originalname, {
        type: imageFile.mimetype,
      });

      const uploadedImage = await storage.createFile(BUCKET_ID, ID.unique(), file);
      imageId = uploadedImage.$id;
    }

    // No new image uploaded, imageId stays unchanged

    const updatedBlog = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, blogId, {
      title,
      content,
      image: imageId,
    });

    res.status(200).json({
      message: 'Blog updated successfully',
      data: updatedBlog,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ error: error.message });
  }
};


exports.getBlogById = async (req, res) => {
  try {
    const { id: blogId } = req.params

    if (!blogId) {
      return res.status(400).json({ error: 'Blog ID is required.' })
    }

    // Get the blog document
    const blog = await databases.getDocument(DATABASE_ID, COLLECTION_ID, blogId)
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found.' })
    }

    // Get the image URL if image exists
    let imageUrl = null
    if (blog.image) {
      try {
        const fileDetails = await storage.getFile(BUCKET_ID, blog.image)
        imageUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${blog.image}/view?project=${process.env.APPWRITE_PROJECT_ID}`
      } catch (imageError) {
        console.error('Error fetching image for blog:', blogId, imageError)
      }
    }

    const blogWithImage = {
      ...blog,
      imageUrl: imageUrl
    }

    res.status(200).json({
      message: 'Blog fetched successfully',
      data: blogWithImage,
    })
  } catch (error) {
    console.error('Error fetching blog:', error)
    res.status(500).json({ error: error.message })
  }
}

exports.generateBlogFromQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required to generate blog.' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
    Generate a blog post based on the user's question below.

    Question: "${question}"

    Output Format:
    Title: <Catchy blog title as plain text>
    Content:
    <Blog content as valid HTML, using <p>, <ul>, <li>, <a>, <strong>, etc. as appropriate. Do not wrap the title in HTML tags.>
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const titleMatch = text.match(/Title:\s*(.+)/i);
    const contentMatch = text.match(/Content:\s*([\s\S]*)/i);

    const title = titleMatch ? titleMatch[1].trim() : "Untitled Blog";
    const content = contentMatch ? contentMatch[1].trim() : "No content generated.";

    res.status(200).json({
      message: 'Blog generated successfully',
      data: { title, content }, // content is HTML string
    });
  } catch (error) {
    console.error('Error generating blog with Gemini:', error.message);
    res.status(500).json({ error: 'Failed to generate blog from question.' });
  }
};
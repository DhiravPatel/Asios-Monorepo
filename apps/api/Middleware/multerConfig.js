const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig.js');
const multer = require('multer');

const product_storage = new CloudinaryStorage({
cloudinary: cloudinary,
params: {
    folder: 'product-image', 
    allowed_formats: ['jpeg', 'jpg', 'png'],
    // transformation: [{ width: 500, height: 500, crop: 'limit' }]
}
});

const product_upload = multer({
storage: product_storage,
limits: { fileSize: 5 * 1024 * 1024 }, 
});

const category_storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'category-image', 
        allowed_formats: ['jpeg', 'jpg', 'png'],
        // transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
    });
    
const category_upload = multer({
    storage: category_storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
});

const subcategory_storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'sub-category-image', 
        allowed_formats: ['jpeg', 'jpg', 'png'],
        // transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
    });
    
const subcategory_upload = multer({
    storage: subcategory_storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
});

const catalogue_storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'catalogue-image', 
        allowed_formats: ['jpeg', 'jpg', 'png'],
        // transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
    });
    
const catalogue_upload = multer({
    storage: catalogue_storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
});

const blog_upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  })
  

module.exports = {product_upload, category_upload, subcategory_upload, catalogue_upload, blog_upload};
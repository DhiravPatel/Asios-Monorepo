const { Product} = require('../Model/Product.js')
const cloudinary = require('cloudinary').v2;


async function AddProduct(req, res) {
  try {
    const { productName, category,subcategory,details } = req.body
    const image = req.file.path;
    const newProduct = new Product({
      productName,
      category,
      subcategory,
      image,
      details
    });
    const result = await newProduct.save()
    res.status(201).json({
      message: `${category} Added`,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating product',
      error: error.message
    });
  }
}

async function GetAllProducts(req, res) {
  try { 
    const products = await Product.find()
    res.status(200).json({
      message: 'Products fetched successfully',
      data: products
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching categories',
      error: error.message
    })
  }
}

async function GetProductsBySubCategory(req, res) {
  const { subcategory } = req.params; 

  try {
    const products = await Product.find({ subcategory: subcategory });

    if (products.length === 0) {
      return res.status(404).json({
        message: 'No products found for this subcategory'
      });
    }

    res.status(200).json({
      message: 'Products fetched successfully',
      data: products
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching products',
      error: error.message
    });
  }
}

async function GetProductById(req, res) {
  const { id } = req.params;

  try {
    const product = await Product.findById(id); 

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.status(200).json({
      message: 'Product fetched successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching product',
      error: error.message
    });
  }
}


async function DeleteProduct(req, res) {
  try {

    const productId = req.params.id

    const product1 = await Product.findById(productId);
    if (!product1) {
      return res.status(404).json({
        message: 'product not found',
      });
    }

    if (product1.image) {
      const urlParts = product1.image.split('/');
      const versionedPart = urlParts[urlParts.length - 1]; 
      const publicId = versionedPart.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`product-image/${publicId}`, (error, result) => {
        if (error) {
          console.error("Error deleting image from Cloudinary:", error);
        } else {
        }
      });
    }  

    const deletedProduct = await Product.findByIdAndDelete(productId)

    res.status(200).json({
      message: 'Product deleted successfully',
      data: deletedProduct
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting product',
      error: error.message
    });
  }
}

async function EditProduct(req, res) {
  try {
    const productId = req.params.id;
    const { productName, category, subcategory, details } = req.body;
    // const image = req.file.path

    let image
    if (req.file) {
      image = req.file.path; 
    } 
    else if (req.body.image) {
      image = req.body.image; 
    } 
    else {
      return res.status(400).json({ message: 'Image is required' });
    }

    if (!productId) {
      return res.status(400).json({
        message: 'Product ID is required for editing',
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    if(req.file){
      if (product.image) {
        const urlParts = product.image.split('/');
        const versionedPart = urlParts[urlParts.length - 1]; 
        const publicId = versionedPart.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`product-image/${publicId}`, (error, result) => {
          if (error) {
            console.error("Error deleting image from Cloudinary:", error);
          } else {
          }
        });
      }
    }
    
    let newImageUrl;
    newImageUrl = image;
    product.productName = productName || product.productName;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;
    product.image = newImageUrl
    product.details = details || product.details;

    const result = await product.save();
    res.status(200).json({
      message: `${category} updated`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating product',
      error: error.message,
    });
  }
}



module.exports = { AddProduct, GetAllProducts, DeleteProduct, EditProduct, GetProductsBySubCategory,GetProductById}

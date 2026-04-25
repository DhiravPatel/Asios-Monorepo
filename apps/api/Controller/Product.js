const { Product } = require('../Model/Product.js')
const cloudinary = require('cloudinary').v2;

function extractPublicId(imageUrl, folder) {
  if (!imageUrl) return null
  const parts = imageUrl.split('/')
  const last = parts[parts.length - 1]
  const idPart = last.split('.').shift()
  return `${folder}/${idPart}`
}

const POPULATE = [
  { path: 'category', select: 'category image' },
  { path: 'subcategory', select: 'subcategory image' },
]

async function AddProduct(req, res) {
  try {
    const { productName, category, subcategory, details } = req.body
    const image = req.file?.path
    const newProduct = new Product({ productName, category, subcategory, image, details })
    const saved = await newProduct.save()
    const result = await Product.findById(saved._id).populate(POPULATE)
    res.status(201).json({ message: 'Product added', data: result })
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message })
  }
}

async function GetAllProducts(req, res) {
  try {
    const { category, subcategory } = req.query
    const filter = {}
    if (category) filter.category = category
    if (subcategory) filter.subcategory = subcategory

    const products = await Product.find(filter).populate(POPULATE).sort({ createdAt: -1 })
    res.status(200).json({ message: 'Products fetched successfully', data: products })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message })
  }
}

async function GetProductById(req, res) {
  try {
    const { id } = req.params
    const product = await Product.findById(id).populate(POPULATE)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.status(200).json({ message: 'Product fetched successfully', data: product })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message })
  }
}

async function DeleteProduct(req, res) {
  try {
    const productId = req.params.id
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: 'product not found' })

    if (product.image) {
      const publicId = extractPublicId(product.image, 'product-image')
      if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => {})
    }

    const deletedProduct = await Product.findByIdAndDelete(productId)
    res.status(200).json({ message: 'Product deleted successfully', data: deletedProduct })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message })
  }
}

async function EditProduct(req, res) {
  try {
    const productId = req.params.id
    const { productName, category, subcategory, details } = req.body

    if (!productId) return res.status(400).json({ message: 'Product ID is required' })

    const existing = await Product.findById(productId)
    if (!existing) return res.status(404).json({ message: 'Product not found' })

    const update = {}
    if (productName) update.productName = productName
    if (category) update.category = category
    if (subcategory) update.subcategory = subcategory
    if (details !== undefined) update.details = details

    if (req.file) {
      if (existing.image) {
        const publicId = extractPublicId(existing.image, 'product-image')
        if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => {})
      }
      update.image = req.file.path
    }

    const result = await Product.findByIdAndUpdate(productId, update, {
      new: true,
      runValidators: true,
    }).populate(POPULATE)

    res.status(200).json({ message: 'Product updated', data: result })
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message })
  }
}

module.exports = { AddProduct, GetAllProducts, DeleteProduct, EditProduct, GetProductById }

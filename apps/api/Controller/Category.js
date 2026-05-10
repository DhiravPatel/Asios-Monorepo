const Category = require('../Model/Category')
const cloudinary = require('cloudinary').v2;
const { Product } = require('../Model/Product.js')
const SubCategory = require('../Model/SubCategory')

function extractPublicId(imageUrl, folder) {
  if (!imageUrl) return null
  const parts = imageUrl.split('/')
  const last = parts[parts.length - 1]
  const idPart = last.split('.').shift()
  return `${folder}/${idPart}`
}

async function AddCategory(req, res) {
  try {
    const { category } = req.body
    const image = req.file?.path
    const newCategory = new Category({ category, image })
    const result = await newCategory.save()
    res.status(201).json({ message: 'Category Created', data: result })
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: error.message })
  }
}

async function GetAllCategories(req, res) {
  try {
    const { page, limit, q } = req.query

    const filter = {}
    if (q && q.trim()) filter.category = { $regex: q.trim(), $options: 'i' }

    // If page/limit is supplied → return paginated envelope.
    // Otherwise → return the full list (legacy callers, web AppContext).
    if (page !== undefined || limit !== undefined) {
      const pageNum = Math.max(1, parseInt(page, 10) || 1)
      const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 8))
      const skip = (pageNum - 1) * limitNum

      const [items, total] = await Promise.all([
        Category.find(filter)
          .select('category image createdAt')
          .sort({ createdAt: 1 })
          .skip(skip)
          .limit(limitNum)
          .lean(),
        Category.countDocuments(filter),
      ])

      return res.status(200).json({
        message: 'Categories fetched successfully',
        data: items,
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      })
    }

    const categories = await Category.find(filter)
      .select('category image createdAt')
      .sort({ createdAt: 1 })
      .lean()
    res.status(200).json({ message: 'Categories fetched successfully', data: categories })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message })
  }
}

async function EditCategory(req, res) {
  try {
    const { id } = req.params
    const { category } = req.body

    if (!id || !category) {
      return res.status(400).json({ message: 'Category ID and new category name are required' })
    }

    const existing = await Category.findById(id)
    if (!existing) return res.status(404).json({ message: 'Category not found' })

    const update = { category }

    if (req.file) {
      if (existing.image) {
        const publicId = extractPublicId(existing.image, 'category-image')
        if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => {})
      }
      update.image = req.file.path
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({ message: 'Category updated successfully', data: updatedCategory })
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error.message })
  }
}

async function DeleteCategory(req, res) {
  try {
    const categoryId = req.params.id
    const category = await Category.findById(categoryId)
    if (!category) return res.status(404).json({ message: 'Category not found' })

    const subcategories = await SubCategory.find({ category: categoryId })
    for (const sub of subcategories) {
      if (sub.image) {
        const publicId = extractPublicId(sub.image, 'sub-category-image')
        if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => {})
      }
    }
    await SubCategory.deleteMany({ category: categoryId })

    const products = await Product.find({ category: categoryId })
    for (const product of products) {
      if (product.image) {
        const publicId = extractPublicId(product.image, 'product-image')
        if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => {})
      }
    }
    await Product.deleteMany({ category: categoryId })

    if (category.image) {
      const publicId = extractPublicId(category.image, 'category-image')
      if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => {})
    }
    const deletedCategory = await Category.findByIdAndDelete(categoryId)

    res.status(200).json({
      message: 'Category and associated items deleted successfully',
      data: deletedCategory,
    })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Category', error: error.message })
  }
}

module.exports = { AddCategory, GetAllCategories, DeleteCategory, EditCategory }

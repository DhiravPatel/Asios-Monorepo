const SubCategory = require('../Model/SubCategory')
const { Product } = require('../Model/Product.js')
const cloudinary = require('cloudinary').v2;

function extractPublicId(imageUrl, folder) {
  if (!imageUrl) return null
  const parts = imageUrl.split('/')
  const last = parts[parts.length - 1]
  const idPart = last.split('.').shift()
  return `${folder}/${idPart}`
}

async function AddSubCategory(req, res) {
  try {
    const { category, subcategory } = req.body
    const image = req.file?.path
    const newSubCategory = new SubCategory({ category, subcategory, image })
    const result = await newSubCategory.save()
    res.status(201).json({ message: 'newSubCategory Created', data: result })
  } catch (error) {
    res.status(500).json({ message: 'Error creating newSubCategory', error: error.message })
  }
}

async function GetAllSubCategories(req, res) {
  try {
    const { category } = req.query
    const filter = {}
    if (category) filter.category = category

    const subcategories = await SubCategory.find(filter)
      .populate('category', 'category image')
      .sort({ createdAt: 1 })
    res.status(200).json({
      message: 'subcategories fetched successfully',
      data: subcategories,
    })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategories', error: error.message })
  }
}

async function EditSubCategory(req, res) {
  try {
    const { id } = req.params
    const { category, subcategory } = req.body

    if (!id || !subcategory) {
      return res.status(400).json({ message: 'SubCategory ID and subcategory name are required' })
    }

    const existing = await SubCategory.findById(id)
    if (!existing) return res.status(404).json({ message: 'subcategory not found' })

    const update = { subcategory }
    if (category) update.category = category

    if (req.file) {
      if (existing.image) {
        const publicId = extractPublicId(existing.image, 'sub-category-image')
        if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => {})
      }
      update.image = req.file.path
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({ message: 'SubCategory updated successfully', data: updatedSubCategory })
  } catch (error) {
    res.status(500).json({ message: 'Error updating subcategory', error: error.message })
  }
}

async function DeleteSubCategory(req, res) {
  try {
    const subcategoryId = req.params.id
    const subcategory = await SubCategory.findById(subcategoryId)
    if (!subcategory) return res.status(404).json({ message: 'Sub-Category not found' })

    const products = await Product.find({ subcategory: subcategoryId })
    for (const product of products) {
      if (product.image) {
        const publicId = extractPublicId(product.image, 'product-image')
        if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => {})
      }
    }
    await Product.deleteMany({ subcategory: subcategoryId })

    if (subcategory.image) {
      const publicId = extractPublicId(subcategory.image, 'sub-category-image')
      if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => {})
    }

    const deletedSubCategory = await SubCategory.findByIdAndDelete(subcategoryId)

    res.status(200).json({
      message: 'Sub-Category and associated products deleted successfully',
      data: deletedSubCategory,
    })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Sub-Category', error: error.message })
  }
}

module.exports = { AddSubCategory, GetAllSubCategories, DeleteSubCategory, EditSubCategory }

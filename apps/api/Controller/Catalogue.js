const Catalogue = require('../Model/Catalogue.js')
const cloudinary = require('cloudinary').v2;

function extractPublicId(imageUrl, folder) {
  if (!imageUrl) return null
  const parts = imageUrl.split('/')
  const last = parts[parts.length - 1]
  const idPart = last.split('.').shift()
  return `${folder}/${idPart}`
}

const POPULATE = [
  { path: 'cataloguecategory', select: 'cataloguecategory' },
  { path: 'cataloguesubcategory', select: 'cataloguesubcategory' },
]

async function AddCatalogue(req, res) {
  try {
    const { cataloguecategory, cataloguesubcategory, name, link } = req.body
    const image = req.file?.path
    const newCatalogue = new Catalogue({
      cataloguecategory,
      cataloguesubcategory,
      name,
      link,
      image,
    })
    const saved = await newCatalogue.save()
    const result = await Catalogue.findById(saved._id).populate(POPULATE)
    res.status(201).json({ message: 'Catalogue Added', data: result })
  } catch (error) {
    res.status(500).json({ message: 'Error adding catalogue', error: error.message })
  }
}

async function GetAllCatalogue(req, res) {
  try {
    const { cataloguecategory, cataloguesubcategory } = req.query
    const filter = {}
    if (cataloguecategory) filter.cataloguecategory = cataloguecategory
    if (cataloguesubcategory) filter.cataloguesubcategory = cataloguesubcategory

    const catalogue = await Catalogue.find(filter)
      .select('name image link cataloguecategory cataloguesubcategory createdAt')
      .populate(POPULATE)
      .sort({ createdAt: -1 })
      .lean()
    res.status(200).json({ message: 'catalogue fetched successfully', data: catalogue })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catalogue', error: error.message })
  }
}

async function DeleteCatalogue(req, res) {
  try {
    const catalogueId = req.params.id
    const catalogue = await Catalogue.findById(catalogueId)
    if (!catalogue) return res.status(404).json({ message: 'catalogue not found' })

    if (catalogue.image) {
      const publicId = extractPublicId(catalogue.image, 'catalogue-image')
      if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => {})
    }

    const deletedCatalogue = await Catalogue.findByIdAndDelete(catalogueId)
    res.status(200).json({ message: 'Catalogue deleted successfully', data: deletedCatalogue })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Catalogue', error: error.message })
  }
}

async function EditCatalogue(req, res) {
  try {
    const catalogueId = req.params.id
    const { cataloguecategory, cataloguesubcategory, name, link } = req.body

    if (!catalogueId) return res.status(400).json({ message: 'Catalogue ID is required' })

    const existing = await Catalogue.findById(catalogueId)
    if (!existing) return res.status(404).json({ message: 'Catalogue not found' })

    const update = {}
    if (cataloguecategory) update.cataloguecategory = cataloguecategory
    if (cataloguesubcategory) update.cataloguesubcategory = cataloguesubcategory
    if (name) update.name = name
    if (link) update.link = link

    if (req.file) {
      if (existing.image) {
        const publicId = extractPublicId(existing.image, 'catalogue-image')
        if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => {})
      }
      update.image = req.file.path
    }

    const result = await Catalogue.findByIdAndUpdate(catalogueId, update, {
      new: true,
      runValidators: true,
    }).populate(POPULATE)

    res.status(200).json({ message: 'Catalogue updated successfully', data: result })
  } catch (error) {
    res.status(500).json({ message: 'Error updating catalogue', error: error.message })
  }
}

// Single-call endpoint for the admin Catalogue page.
// Returns ONLY the paginated catalogue list. Catalogue-category and
// catalogue-subcategory lists are fetched lazily — see
// /cataloguecategory/getAllCatalogueCategory and
// /cataloguesubcategory/getAllCatalogueSubCategory.
async function GetCataloguePageData(req, res) {
  try {
    const { cataloguecategory, cataloguesubcategory, q, page, limit } = req.query

    const filter = {}
    if (cataloguecategory) filter.cataloguecategory = cataloguecategory
    if (cataloguesubcategory) filter.cataloguesubcategory = cataloguesubcategory
    if (q && q.trim()) filter.name = { $regex: q.trim(), $options: 'i' }

    const pageNum = Math.max(1, parseInt(page, 10) || 1)
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 8))
    const skip = (pageNum - 1) * limitNum

    const [items, total] = await Promise.all([
      Catalogue.find(filter)
        .select('name image link cataloguecategory cataloguesubcategory createdAt')
        .populate(POPULATE)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Catalogue.countDocuments(filter),
    ])

    res.status(200).json({
      message: 'Catalogue page data fetched successfully',
      data: items,
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catalogue page data', error: error.message })
  }
}

module.exports = {
  AddCatalogue,
  GetAllCatalogue,
  GetCataloguePageData,
  DeleteCatalogue,
  EditCatalogue,
}

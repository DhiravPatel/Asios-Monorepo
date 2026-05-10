// Single endpoint that aggregates everything the admin Dashboard needs:
//   - counts across every collection (using countDocuments — index-only, very fast)
//   - the most recent inquiries (general + product) for the activity feed
//
// One round trip + N parallel queries server-side, instead of N round trips
// from the client.

const { Product } = require('../Model/Product.js')
const Category = require('../Model/Category.js')
const SubCategory = require('../Model/SubCategory.js')
const Catalogue = require('../Model/Catalogue.js')
const Inquiry = require('../Model/Inquiry.js')
const ProductInquiry = require('../Model/ProductInquiry.js')

const RECENT_LIMIT = 6

async function GetDashboardStats(req, res) {
  try {
    const [
      productCount,
      categoryCount,
      subCategoryCount,
      catalogueCount,
      inquiryCount,
      productInquiryCount,
      recentGeneral,
      recentProduct,
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      SubCategory.countDocuments(),
      Catalogue.countDocuments(),
      Inquiry.countDocuments(),
      ProductInquiry.countDocuments(),
      Inquiry.find()
        .select('name email message phone createdAt')
        .sort({ createdAt: -1 })
        .limit(RECENT_LIMIT)
        .lean(),
      ProductInquiry.find()
        .select('product_name name email message phone createdAt')
        .sort({ createdAt: -1 })
        .limit(RECENT_LIMIT)
        .lean(),
    ])

    // Merge + tag + sort + slice — single recent feed
    const recentInquiries = [
      ...recentGeneral.map((i) => ({ ...i, type: 'general' })),
      ...recentProduct.map((i) => ({ ...i, type: 'product' })),
    ]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, RECENT_LIMIT)

    res.status(200).json({
      message: 'Dashboard stats fetched successfully',
      data: {
        counts: {
          products: productCount,
          categories: categoryCount,
          subcategories: subCategoryCount,
          catalogues: catalogueCount,
          inquiries: inquiryCount,
          productInquiries: productInquiryCount,
        },
        recentInquiries,
      },
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching dashboard stats', error: error.message })
  }
}

module.exports = { GetDashboardStats }

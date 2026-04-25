const CatalogueCategory = require('../Model/CatalogueCategory.js')

async function AddCatalogueCategory(req,res) {
    try {
        const { cataloguecategory} = req.body;
        // const image = req.file.path
        const newCatalogueCategory = new CatalogueCategory({
          cataloguecategory,
        })
      const result = await newCatalogueCategory.save();
      res.status(201).json({
        message: 'Catalogue category Added',
        data: result
      })
    } catch (error) {
        res.status(500).json({
            message: 'Error adding catalogue category',
            error: error.message
          })
    }
}

async function GetAllCatalogueCategory(req, res) {
    try {
      const catalogueCategory = await CatalogueCategory.find()
      res.status(200).json({
        message: 'catalogue category fetched successfully',
        data: catalogueCategory
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching catalogue category',
        error: error.message
      })
    }
}

module.exports = {AddCatalogueCategory, GetAllCatalogueCategory}
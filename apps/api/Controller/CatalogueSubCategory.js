const CatalogueSubCategory = require('../Model/CatalogueSubCategory')

async function AddCatalogueSubCategory(req,res) {
    try {
        const { cataloguecategory,cataloguesubcategory} = req.body;
        // const image = req.file.path
        const newCatalogueSubCategory = new CatalogueSubCategory({
          cataloguecategory,
          cataloguesubcategory
        })
      const result = await newCatalogueSubCategory.save();
      res.status(201).json({
        message: 'Catalogue sub-category Added',
        data: result
      })
    } catch (error) {
        res.status(500).json({
            message: 'Error adding catalogue sub-category',
            error: error.message
          })
    }
}

async function GetAllCatalogueSubCategory(req, res) {
    try {
      const catalogueSubCategory = await CatalogueSubCategory.find()
      res.status(200).json({
        message: 'catalogue sub-category fetched successfully',
        data: catalogueSubCategory
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching catalogue category',
        error: error.message
      })
    }
}

module.exports = {AddCatalogueSubCategory, GetAllCatalogueSubCategory}
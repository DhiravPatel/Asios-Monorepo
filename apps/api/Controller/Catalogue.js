const Catalogue = require('../Model/Catalogue.js')
const cloudinary = require('cloudinary').v2;

async function AddCatalogue(req,res) {
    try {
        const { cataloguecategory,cataloguesubcategory,name,link} = req.body;
        const image = req.file.path
        const newCatalogue = new Catalogue({
          cataloguecategory,
          cataloguesubcategory,
          name,
          link,
          image
        })
      const result = await newCatalogue.save();
      res.status(201).json({
        message: 'Catalogue Added',
        data: result
      })
    } catch (error) {
        res.status(500).json({
            message: 'Error adding catalogue',
            error: error.message
          })
    }
}

async function GetAllCatalogue(req, res) {
    try {
      const catalogue = await Catalogue.find()
      res.status(200).json({
        message: 'catalogue fetched successfully',
        data: catalogue
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching catalogue',
        error: error.message
      })
    }
}

async function DeleteCatalogue(req, res) {
  try {

    const catalogueId = req.params.id

    const catalogue1 = await Catalogue.findById(catalogueId);
    if (!catalogue1) {
      return res.status(404).json({
        message: 'catalogue not found',
      });
    }

    if (catalogue1.image) {
      const urlParts = catalogue1.image.split('/');
      const versionedPart = urlParts[urlParts.length - 1]; 
      const publicId = versionedPart.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`catalogue-image/${publicId}`, (error, result) => {
        if (error) {
          console.error("Error deleting image from Cloudinary:", error);
        } else {
        }
      });
    }  

    const deletedCatalogue = await Catalogue.findByIdAndDelete(catalogueId)

    res.status(200).json({
      message: 'Catalogue deleted successfully',
      data: deletedCatalogue
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting Catalogue',
      error: error.message
    });
  }
}

async function EditCatalogue(req, res) {
  try {
    const catalogueId = req.params.id;
    const { cataloguecategory, cataloguesubcategory, name, link } = req.body;
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

    if (!catalogueId) {
      return res.status(400).json({
        message: 'Catalogue ID is required for editing',
      });
    }

    const catalogue = await Catalogue.findById(catalogueId);
    if (!catalogue) {
      return res.status(404).json({
        message: 'Catalogue not found',
      });
    }
    if(req.file){
      if (catalogue.image) {
        const urlParts = catalogue.image.split('/');
        const versionedPart = urlParts[urlParts.length - 1];
        const publicId = versionedPart.split('.').slice(0, -1).join('.');
        await cloudinary.uploader.destroy(`catalogue-image/${publicId}`, (error, result) => {
          if (error) {
            console.error("Error deleting image from Cloudinary:", error);
          }
        });
      }
    }

    // Update catalogue fields
    catalogue.cataloguecategory = cataloguecategory
    catalogue.cataloguesubcategory = cataloguesubcategory
    catalogue.name = name || catalogue.name;
    catalogue.link = link || catalogue.link;
    catalogue.image = image;

    const result = await catalogue.save();
    res.status(200).json({
      message: 'Catalogue updated successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating catalogue',
      error: error.message,
    });
  }
}

async function GetCatalogueBySubcategory(req, res) {
  const { cataloguesubcategory } = req.params;

  try {
    
      const catalogues = await Catalogue.find({ cataloguesubcategory }); 

      if (catalogues.length === 0) {
          return res.status(404).json({
              message: 'No catalogues found for the selected catalogue subcategory',
              data: []
          });
      }

      res.status(200).json({
          message: 'Catalogues fetched successfully',
          data: catalogues
      });
  } catch (error) {
      res.status(500).json({
          message: 'Error fetching catalogues',
          error: error.message
      });
  }
}




module.exports = {AddCatalogue,GetAllCatalogue,DeleteCatalogue,EditCatalogue,GetCatalogueBySubcategory}
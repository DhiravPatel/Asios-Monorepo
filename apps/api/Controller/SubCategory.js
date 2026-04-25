const SubCategory = require('../Model/SubCategory') 
const { Product} = require('../Model/Product.js')
const cloudinary = require('cloudinary').v2;

async function AddSubCategory(req,res) {
    try {
        const { category, subcategory } = req.body
        const image = req.file.path
        const newSubCategory = new SubCategory({
            category,
            subcategory,
            image
        })
      const result = await newSubCategory.save()
      res.status(201).json({
        message: 'newSubCategory Created',
        data: result
      });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating newSubCategory',
            error: error.message
          })
    }
}

async function GetAllSubCategories(req, res) {
  try {
    const subcategories = await SubCategory.find()
    res.status(200).json({
      message: 'subcategories fetched successfully',
      data: subcategories
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching subcategories',
      error: error.message
    })
  }
}

async function GetSubCategoriesByCategoryName(req, res) {
  const { category } = req.params;
  try {
    const subcategories = await SubCategory.find({ category: category }); 

    if (subcategories.length === 0) {
      return res.status(404).json({
        message: 'No subcategories found for this category'
      });
    }

    res.status(200).json({
      message: 'Subcategories fetched successfully',
      data: subcategories
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching subcategories',
      error: error.message
    });
  }
}

async function EditSubCategory(req, res) {
  try {
    const { id } = req.params; 
    const { category, subcategory } = req.body;
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

    if (!id || !subcategory) {
      return res.status(400).json({
        message: 'SubCategory ID and new category name are required'
      });
    }

    const subcategory1 = await SubCategory.findById(id);
    if (!subcategory1) {
      return res.status(404).json({
        message: 'subcategory not found',
      });
    }

    const oldSubCategoryName = subcategory1.subcategory;
    if(req.file){
      if (subcategory1.image) {
        const urlParts = subcategory1.image.split('/');
        const versionedPart = urlParts[urlParts.length - 1]; 
        const publicId = versionedPart.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`sub-category-image/${publicId}`, (error, result) => {
          if (error) {
            console.error("Error deleting image from Cloudinary:", error);
          }
        });
      }  
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      id, 
      { category, subcategory, image }, 
      { new: true, runValidators: true } 
    );

    if (!updatedSubCategory) {
      return res.status(404).json({
        message: 'SubCategory not found'
      });
    }

    await Product.updateMany(
      { subcategory: oldSubCategoryName },
      { subcategory: subcategory }
    );
    res.status(200).json({
      message: 'SubCategory updated successfully',
      data: updatedSubCategory
    });
  } catch (error) {
   
    res.status(500).json({
      message: 'Error updating subcategory',
      error: error.message
    });
  }
}

async function DeleteSubCategory(req, res) {
  try {
    const subcategoryId = req.params.id;

    // Find the subcategory by ID
    const subcategory = await SubCategory.findById(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({
        message: 'Sub-Category not found',
      });
    }

    const subcategoryName = subcategory.subcategory; // Assuming the field name is `subcategory`

    // Delete associated products by subcategory name
    const products = await Product.find({ subcategory: subcategoryName });
    for (const product of products) {
      if (product.image) {
        const urlParts = product.image.split('/');
        const versionedPart = urlParts[urlParts.length - 1];
        const publicId = versionedPart.split('.').shift();
        await cloudinary.uploader.destroy(`product-image/${publicId}`);
      }
      await Product.findByIdAndDelete(product._id);
    }

    // Delete the subcategory image if it exists
    if (subcategory.image) {
      const urlParts = subcategory.image.split('/');
      const versionedPart = urlParts[urlParts.length - 1];
      const publicId = versionedPart.split('.').shift();
      await cloudinary.uploader.destroy(`sub-category-image/${publicId}`);
    }

    // Delete the subcategory
    const deletedSubCategory = await SubCategory.findByIdAndDelete(subcategoryId);
    if (!deletedSubCategory) {
      return res.status(404).json({
        message: 'Sub-Category not found',
      });
    }

    res.status(200).json({
      message: 'Sub-Category and associated products deleted successfully',
      data: deletedSubCategory
    });
  } catch (error) {
    console.error("Error deleting Sub-Category:", error);
    res.status(500).json({
      message: 'Error deleting Sub-Category',
      error: error.message
    });
  }
}

module.exports = {AddSubCategory, GetAllSubCategories, DeleteSubCategory, EditSubCategory, GetSubCategoriesByCategoryName}
const Category = require('../Model/Category')
const cloudinary = require('cloudinary').v2;
const { Product} = require('../Model/Product.js')
const SubCategory = require('../Model/SubCategory') 

async function AddCategory(req,res) {
    try {
        const { category} = req.body;
        const image = req.file.path
        const newCategory = new Category({
          category,
          image
        })
      const result = await newCategory.save();
      res.status(201).json({
        message: 'Category Created',
        data: result
      })
    } catch (error) {
        res.status(500).json({
            message: 'Error creating category',
            error: error.message
          })
    }
}

async function GetAllCategories(req, res) {
  try {
    const categories = await Category.find()
    res.status(200).json({
      message: 'Categories fetched successfully',
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching categories',
      error: error.message
    })
  }
}

async function EditCategory(req, res) {
  try {
    const { id } = req.params
    const { category } = req.body
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

    if (!id || !category) {
      return res.status(400).json({
        message: 'Category ID and new category name are required'
      });
    }

    const category1 = await Category.findById(id);
    if (!category1) {
      return res.status(404).json({
        message: 'category not found',
      });
    }

    const oldCategoryName = category1.category;
    if(req.file){
    if (category1.image) {
      const urlParts = category1.image.split('/');
      const versionedPart = urlParts[urlParts.length - 1]; 
      const publicId = versionedPart.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`category-image/${publicId}`, (error, result) => {
        if (error) {
          console.error("Error deleting image from Cloudinary:", error);
        } else {
        }
      });
    }
  }  
    const updatedCategory = await Category.findByIdAndUpdate(
      id, 
      { category, image }, 
      { new: true, runValidators: true } 
    );

    await SubCategory.updateMany(
      { category: oldCategoryName },
      { category: category } 
    );

    await Product.updateMany(
      { category: oldCategoryName },
      { category: category }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        message: 'Category not found'
      });
    }

    res.status(200).json({
      message: 'Category updated successfully',
      data: updatedCategory
    });
  } catch (error) {
   
    res.status(500).json({
      message: 'Error updating category',
      error: error.message
    });
  }
}

async function DeleteCategory(req, res) {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }
    const categoryName = category.category; 
    const subcategories = await SubCategory.find({ category: categoryName });
    for (const subcategory of subcategories) {
      if (subcategory.image) {
        const urlParts = subcategory.image.split('/');
        const versionedPart = urlParts[urlParts.length - 1];
        const publicId = versionedPart.split('.').shift();
        await cloudinary.uploader.destroy(`sub-category-image/${publicId}`);
      }
      await SubCategory.findByIdAndDelete(subcategory._id);
    }
    const products = await Product.find({ category: categoryName });
    for (const product of products) {
      if (product.image) {
        const urlParts = product.image.split('/');
        const versionedPart = urlParts[urlParts.length - 1];
        const publicId = versionedPart.split('.').shift();
        await cloudinary.uploader.destroy(`product-image/${publicId}`);
      }
      await Product.findByIdAndDelete(product._id);
    }

    if (category.image) {
      const urlParts = category.image.split('/');
      const versionedPart = urlParts[urlParts.length - 1];
      const publicId = versionedPart.split('.').shift();
      await cloudinary.uploader.destroy(`category-image/${publicId}`);
    }
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }
    res.status(200).json({
      message: 'Category and associated items deleted successfully',
      data: deletedCategory,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({
      message: 'Error deleting Category',
      error: error.message,
    });
  }
}


// async function EditCategory(req, res) {
//   try {
//     const { id } = req.params;
//     const { category } = req.body;
//     const image = req.image

//     if (!id || !category) {
//       return res.status(400).json({
//         message: 'Category ID and new category name are required'
//       });
//     }

//     const categoryToUpdate = await Category.findById(id);
//     if (!categoryToUpdate) {
//       return res.status(404).json({
//         message: 'Category not found',
//       });
//     }
//     if (categoryToUpdate.image) {
//       const urlParts = categoryToUpdate.image.split('/');
//       const versionedPart = urlParts[urlParts.length - 1];
//       const publicId = versionedPart.split('.')[0];
//       await cloudinary.uploader.destroy(`category-image/${publicId}`);
//     }
//     const updatedCategory = await Category.findByIdAndUpdate(
//       id,
//       { category, image },
//       { new: true, runValidators: true }
//     );

//     if (!updatedCategory) {
//       return res.status(404).json({
//         message: 'Category not found'
//       });
//     }

//     await SubCategory.updateMany(
//       { category: updatedCategory.category } 
//     );

//     await Product.updateMany(
//       { category: updatedCategory.category } 
//     );

//     res.status(200).json({
//       message: 'Category updated successfully',
//       data: updatedCategory
//     });
//   } catch (error) {
//     console.error("Error updating category:", error);
//     res.status(500).json({
//       message: 'Error updating category',
//       error: error.message
//     });
//   }
// }


// async function EditCategory(req, res) {
//   try {
//     const { id } = req.params;
//     const { category } = req.body;
//     const image = req.file.path

//     if (!id || !category) {
//       return res.status(400).json({
//         message: 'Category ID and new category name are required',
//       });
//     }

//     const categoryToUpdate = await Category.findById(id);
//     if (!categoryToUpdate) {
//       return res.status(404).json({
//         message: 'Category not found',
//       });
//     }

//     const oldCategoryName = categoryToUpdate.category; // Store the old category name

//     // Handle image update logic
//     if (categoryToUpdate.image) {
//       const urlParts = categoryToUpdate.image.split('/');
//       const versionedPart = urlParts[urlParts.length - 1];
//       const publicId = versionedPart.split('.')[0];
//       await cloudinary.uploader.destroy(`category-image/${publicId}`);
//     }

//     // Update the category
//     const updatedCategory = await Category.findByIdAndUpdate(
//       id,
//       { category: category },
//       { new: true, runValidators: true }
//     );

//     if (!updatedCategory) {
//       return res.status(404).json({
//         message: 'Category not found',
//       });
//     }

//     // Update only the subcategories and products that have the old category name
//     await SubCategory.updateMany(
//       { category: oldCategoryName },
//       { category: category } // Update to the new category name
//     );

//     await Product.updateMany(
//       { category: oldCategoryName },
//       { category: category } // Update to the new category name
//     );

//     res.status(200).json({
//       message: 'Category updated successfully',
//       data: updatedCategory,
//     });
//   } catch (error) {
//     console.error("Error updating category:", error);
//     res.status(500).json({
//       message: 'Error updating category',
//       error: error.message,
//     });
//   }
// }



module.exports={AddCategory, GetAllCategories, DeleteCategory, EditCategory}
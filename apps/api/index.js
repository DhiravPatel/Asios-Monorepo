const express = require('express')
const connectToDatabase = require('./Connection/Connection.js')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const PORT = process.env.PORT || 3000

const {authGuard} = require('./Middleware/authGuard.js')
const ProductRoutes = require('./Routes/ProductRoutes.js')
const UserRoutes = require('./Routes/UserRoutes.js')
const CategoryRoutes = require('./Routes/CategoryRoutes.js')
const SubCategoryRoutes = require('./Routes/SubCategoryRoutes.js')
const InquiryRoutes = require('./Routes/InquiryRoutes.js')
const ProductInquiryRoutes = require('./Routes/ProductInquiryRoutes.js')
const CatalogueRoutes = require('./Routes/CatalogueRoutes.js')
const CatalogueCategoryRoutes = require('./Routes/CatalogueCategoryRoutes.js')
const CatalogueSubCategoryRoutes = require('./Routes/CatalogueSubCategoryRoutes.js')
const BlogRoutes = require('./Routes/BlogRoutes.js')


app.use(cors());
app.use(express.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

connectToDatabase()

app.get('/api/protected', authGuard, (req, res) => {
    res.json({ message: 'Token is valid', sucess:true, user: req.user });
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to asios server !!' });
});

app.use('/api/product', ProductRoutes)
app.use('/api/user', UserRoutes)
app.use('/api/category', CategoryRoutes)
app.use('/api/subcategory', SubCategoryRoutes)
app.use('/api/inquiry', InquiryRoutes)
app.use('/api/product-inquiry', ProductInquiryRoutes)
app.use('/api/catalogue', CatalogueRoutes)
app.use('/api/catalogue-category', CatalogueCategoryRoutes)
app.use('/api/catalogue-subcategory', CatalogueSubCategoryRoutes)
app.use('/api/blog', BlogRoutes)

app.listen(PORT,()=>{
    console.log(`Server is listening on http://localhost:${PORT}/`)
});

module.exports=app
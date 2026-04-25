const ProductInquiry = require('../Model/ProductInquiry.js')
const nodemailer = require('nodemailer')

const AddProductInquiry = async(req,res)=> {
    try {
        const { product_name, name, email, phone, message } = req.body;
        const newProductInquiry = new ProductInquiry({
            product_name,
            name,
            email,
            phone,
            message
        })
      const result = await newProductInquiry.save();
      res.status(201).json({
        message: 'Your message sent successfully',
        data: result
      })
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            error: error.message
          })
    }
}

const GetProductInquiry = async(req, res)=> {
    try {
      const product_inquiry = await ProductInquiry.find()
      res.status(200).json({
        message: 'Product_Inquiry fetched successfully',
        data: product_inquiry
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching Product_Inquiry',
        error: error.message
      })
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

const sendEmail = async (req, res) => {
    const {product_name, name, email, phone, message } = req.body;
  
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New Inquiry from ${name} for the product "${product_name}"`,
        html: `
          <html>
            <body style="font-family: Arial, sans-serif; color: #333;">
              <h2 style="color: #007bff;">You have received a new inquiry!</h2>
              <p><strong>Product Name:</strong> <span style="color: #007bff;">${product_name}</span></p>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff;">${email}</a></p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Message:</strong></p>
              <blockquote style="background-color: #f9f9f9; padding: 10px; border-left: 3px solid #007bff;">
                ${message}
              </blockquote>
              <hr />
            </body>
          </html>
        `,
      };
      
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send({ success: 'Email sent successfully!' });
    } catch (error) {
      res.status(500).send({ error: 'Failed to send email.' });
    }
  };
  
  module.exports = {
    sendEmail,
  };

module.exports = {AddProductInquiry, GetProductInquiry, sendEmail}
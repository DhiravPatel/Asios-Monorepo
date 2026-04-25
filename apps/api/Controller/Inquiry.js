const Inquiry = require('../Model/Inquiry.js')
const nodemailer = require('nodemailer')

const AddInquiry = async(req,res)=> {
    try {
        const { name, email, message, phone } = req.body;
        const newInquiry = new Inquiry({
          name,
          email,
          message,
          phone
        })
      const result = await newInquiry.save();
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

const GetInquiry = async(req, res)=> {
    try {
      const inquiry = await Inquiry.find()
      res.status(200).json({
        message: 'Inquiry fetched successfully',
        data: inquiry
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching Inquiry',
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
  const { name, email, message, phone } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: 'New Inquiry from ' + name,
    text: `You have received a new inquiry:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `
          <html>
            <body style="font-family: Arial, sans-serif; color: #333;">
              <h2 style="color: #007bff;">You have received a new inquiry!</h2>
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


module.exports = {AddInquiry,GetInquiry,sendEmail}
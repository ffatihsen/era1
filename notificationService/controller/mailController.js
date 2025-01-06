const nodemailer = require('nodemailer');

const sendEmail = async (req,res) => {
  try {
    
    const {toMail, subject, content } = req.body


    // SMTP yapılandırması
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, 
      port: 587, 
      secure: false,
      auth: {
        user: process.env.MAIL_MAIL, 
        pass: process.env.MAIL_PASS, 
      },
    });

    // Gönderilecek mail içeriği
    let mailOptions = {
        from: process.env.MAIL_MAIL , 
        to: toMail, 
        subject: subject, 
        text: content,
      };


    let info = await transporter.sendMail(mailOptions);


    return res.status(200).json({ message:"mail succees" })
    
  } catch (error) {
    console.error('Mail gönderilirken hata oluştu:', error);
    return false 
  }
};


module.exports = {
    sendEmail,
}
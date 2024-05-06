const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

exports.sendEmail = async  (req, res) => {
    const { email, bodyHtml } = req.body;
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: "Fine Report (E-Challan)",
            html: bodyHtml
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error" + error)
            } else {
                console.log("Email sent:" + info.response);
                res.status(201).json({status:201,info})
            }
        })

    } catch (error) {
        console.log("Error" + error);
        res.status(401).json({status:401,error})
    }
};


const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../models/users');

router.post('/', async (req, res) => {
    const userEmail = req.body.email
    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).send('No user Exist with this email');
        }

        // Function to generate a random temporary password
        function generateTemporaryPassword() {
            const length = 6;
            const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let temporaryPassword = '';

            for (let i = 0; i < length; i++) {
                temporaryPassword += chars.charAt(Math.floor(Math.random() * chars.length));
            }

            return temporaryPassword;
        }

        // Function to send the temporary password via email
        function sendTemporaryPassword(userEmail, temporaryPassword) {
            const transporter = nodemailer.createTransport({
                service: 'Gmail', // Use the email service you are using, in this case, Gmail
                auth: {
                  user: 'ameer692hamza@gmail.com', // Your email address
                  pass: 'wrpapmioxmvsoyvb' // Your email password or an App Password if you have 2-factor authentication enabled
                }
            });

            const mailOptions = {
                from: 'ameer692hamza@gmail.com',
                to: userEmail,
                subject: 'Temporary Password for Login',
                text: `Your temporary password is: ${temporaryPassword}. Please use this to log in and reset your password.`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                    return res.status(500).send('Failed to send temporary password');
                } else {
                    console.log('Email sent:', info.response);
                    res.status(200).send('Temporary password sent successfully');
                }
            });
        }

        // Generate a temporary password and send it via email
        const temporaryPassword = generateTemporaryPassword(); // Generate a temporary password
        const hashedPassword = bcrypt.hashSync(temporaryPassword, 10); // Hash the temporary password

        // Store or update the hashed temporary password in your database for the user
        // Example:
       await User.findOneAndUpdate({ email: userEmail }, { $set: { password: hashedPassword} });

        // For demonstration purposes, sending a response without database operations
        sendTemporaryPassword(userEmail, temporaryPassword);

    }
    catch (error) {
        console.log(error)
        res.status(500).json(error);
    }

});

module.exports=router;
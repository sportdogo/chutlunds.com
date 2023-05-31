import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const accessTokenExpiry = '300s'
const CLIENT_URL = 'http://localhost:3000/'
import nodemailer from 'nodemailer';
import { checkUserExists_DB, matchOTP_DB, saveOTP_DB, saveUser_DB, updateOTP_DB, updateUser_DB, deleteOTP_DB, update_refreshToken_DB } from "../db_query/userQuery";
import dbConnect from './../lib/db'


export default async function handler(req, res) {
    await dbConnect(); // Establish database connection

    const { email } = req.body


    const sendOTPforVerification = async (email) => {

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: true,
            service: 'Gmail',

            auth: {
                user: 'ukdevelopers007@gmail.com',
                pass: 'mgwazngquiafczws',
            }

        });

        var otp = Math.floor(1000 + Math.random() * 9000);
        otp = parseInt(otp);

        var mailOptions = {
            to: email,
            subject: "Otp for registration is: ",
            html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                return res.status(200).send({ sucess: false, message: error })
            }

            await updateOTP_DB(email, otp)
            return res.status(200).send({ sucess: true, message: 'OTP Sent Again!' })

        });


    }

    //User not found
    const userExist = await checkUserExists_DB(email)
    if (!userExist) {
        return res.status(401).send({ sucess: false, message: 'User not found' })
    }
    
    await sendOTPforVerification(email)


}

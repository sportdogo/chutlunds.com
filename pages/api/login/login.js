import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const accessTokenExpiry = '300s'
const CLIENT_URL = 'http://localhost:3000/'
import nodemailer from 'nodemailer';
import { checkUserExists_DB, matchOTP_DB, saveOTP_DB, saveUser_DB, updateOTP_DB, updateUser_DB, deleteOTP_DB, update_refreshToken_DB } from "../db_query/userQuery";
import dbConnect from './../lib/db'


export default async function handler(req, res) {
    await dbConnect(); // Establish database connection


    const { email, password } = req.body

    try {
        //User not found
        const userExist = await checkUserExists_DB(email)
        if (!userExist) {
            return res.status(401).send({ sucess: false, message: 'User not found' })
        }


        //Incorrect passowrd
        const passwordMatched = await bcrypt.compare(password, userExist.password);
        if (!passwordMatched) {
            return res.status(401).send({ sucess: false, message: 'Password Incorrect' })
        }

        //Not Verfied , Maybe user closed the browser in OTP enter page during first signUp

        if (!userExist.verified) {
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
                    subject: "Chutlunds account activation",
                    html: "<h3>OTP for account verification of Chutlunds.com is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
                };


                transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        return res.status(200).send({ sucess: false, message: error })
                    }

                    await updateOTP_DB(email, otp)

                });
            }
            sendOTPforVerification(email)
            return res.status(200).send({ sucess: true, data: { email: email }, message: 'OTP Sent' })
        }


        return res.status(200).send({ sucess: true, data: { membership: userExist.membership, email: email, DB_id: userExist._id }, message: 'Logged In' })


    } catch (error) {
        console.log(error);
    }
}

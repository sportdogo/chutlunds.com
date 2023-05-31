import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const accessTokenExpiry = '300s'
const CLIENT_URL = 'http://localhost:3000/'
import nodemailer from 'nodemailer';

import { checkUserExists_DB, matchOTP_DB, saveOTP_DB, saveUser_DB, updateOTP_DB, updateUser_DB, deleteOTP_DB, update_refreshToken_DB } from "../db_query/userQuery";


export default async function handler(req, res) {

    const { email, otp } = req.body;

    console.log(email, "verifyOTP");

    const matched = await matchOTP_DB(otp)
    if (!matched) {
        return res.status(200).send({ sucess: false, message: 'OTP Incorrect' })
    }

    //After verified delete the otp from DB
    await deleteOTP_DB(otp)

    var query = { 'email': email };
    var update = { $set: { verified: true } };
    await updateUser_DB(query, update)

    return res.status(200).send({ sucess: true, data: { email: email }, message: 'OTP Verified' })
}

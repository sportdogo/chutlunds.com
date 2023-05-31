import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const accessTokenExpiry = '300s'
const CLIENT_URL = 'http://localhost:3000/'
import nodemailer from 'nodemailer';
import { checkUserExists_DB, matchOTP_DB, saveOTP_DB, saveUser_DB, updateOTP_DB, updateUser_DB, deleteOTP_DB, update_refreshToken_DB } from "../db_query/userQuery";


export default async function handler(req, res) {

    const { email, password } = req.body


    if (await checkUserExists_DB(email) === null) {
        res.status(400).send({ sucess: false, message: 'User not found' })
        return
    }

    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password, salt)

    var query = { 'email': email };
    var update = { $set: { password: hashpass } };
    await updateUser_DB(query, update)

    return res.status(200).send({ sucess: true, data: { email: email }, message: 'Password Updated' })
}

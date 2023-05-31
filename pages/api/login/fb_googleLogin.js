import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const accessTokenExpiry = '300s'
const CLIENT_URL = 'http://localhost:3000/'
import nodemailer from 'nodemailer';
import { checkUserExists_DB, matchOTP_DB, saveOTP_DB, saveUser_DB, updateOTP_DB, updateUser_DB, deleteOTP_DB, update_refreshToken_DB } from "../db_query/userQuery";
import dbConnect from './../lib/db'


export default async function handler(req, res) {
    await dbConnect(); // Establish database connection


    const { firstName, lastName, email, password,country } = req.body


    try {
        //User not found
        const userExist = await checkUserExists_DB(email)
        if (!userExist) {

            const salt = await bcrypt.genSalt(10);
            const hashpass = await bcrypt.hash(password, salt)
            await saveUser_DB(firstName, lastName, email, hashpass, true,country,true)
        }
       
        return res.status(200).send({ success: true, data: { membership: false, email: email }, message: 'Logged In' })


    } catch (error) {
        console.log(error);
    }
}

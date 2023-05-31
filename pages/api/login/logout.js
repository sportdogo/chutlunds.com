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

    //User not found
    const userExist = await checkUserExists_DB(email)
    if (!userExist) {
        return res.status(401).send({ sucess: false,email:email, message: 'User not found' })
    }

    var query = { 'email': email };
    var update = { $set: { loggedIn: false } };
    await updateUser_DB(query, update)


    return res.status(200).send({ sucess: true, message: 'Logged Out' })
}



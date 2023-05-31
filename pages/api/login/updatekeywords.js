import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const accessTokenExpiry = '300s'
const CLIENT_URL = 'http://localhost:3000/'
import nodemailer from 'nodemailer';
import { checkUserExists_DB, matchOTP_DB, saveOTP_DB, saveUser_DB, updateOTP_DB, updateUser_DB, deleteOTP_DB, update_refreshToken_DB } from "../db_query/userQuery";
import dbConnect from './../lib/db'


export default async function handler(req, res) {
   
    await dbConnect(); // Establish database connection

    const { searchKey, email } = req.body

    const userExists = await checkUserExists_DB(email)

    if (userExists === null) {
        res.status(400).send({ sucess: false, message: 'User not found' })
        return
    }

    let newArray = []
    const previousKeywords = userExists.keywords

    if (previousKeywords.length === 0) {
        newArray.push(searchKey)
    } else {
        newArray.push(searchKey)
        previousKeywords.forEach(key => {
            if (key !== searchKey) {
                newArray.push(key)
            }
        })
    }


    var query = { 'email': email };
    var update = { $set: { keywords: newArray } };
    await updateUser_DB(query, update)

    return res.status(200).send({ sucess: true, data: { keywords: newArray }, message: 'Keywords Update' })
}

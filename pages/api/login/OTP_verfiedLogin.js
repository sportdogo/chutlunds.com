import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const accessTokenExpiry = '300s'
const CLIENT_URL = 'http://localhost:3000/'
import nodemailer from 'nodemailer';
import {  checkUserExists_DB, matchOTP_DB, saveOTP_DB, saveUser_DB, updateOTP_DB, updateUser_DB, deleteOTP_DB,  } from "../db_query/userQuery";


export default async function handler(req, res) {
    const { email } = req.body;

    const userID = await checkUserExists_DB(email)

    const payload = {
        email: email,
        id: userID._id
    }

    //After logged in a token is generated, which have to be saved in the  cookie  in browser
    const accessToken = jwt.sign(payload, process.env.ACCESSTOKEN_SECRET_CODE, { expiresIn: accessTokenExpiry })
    const refreshToken = jwt.sign(payload, process.env.REFRESHTOKEN_SECRET_CODE, { expiresIn: '100d' })

    //Saving Refresh token into Mongodb database
    var query = { 'email': email };
    var update = { $set: { refreshToken: refreshToken } };
    await (query, update)


    res.status(200).send({ sucess: true, accountType: "credentials", email: email, accessToken: "Bearer " + accessToken, refreshToken: refreshToken, message: 'Logged In' })


  }
  
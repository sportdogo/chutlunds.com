import bcrypt from "bcryptjs";
import { checkUserExists_Firestore, saveUserProfile } from '../../../config/firebase/lib';
import dbConnect from './../lib/db';
const accessTokenExpiry = '300s'
const CLIENT_URL = 'http://localhost:3000/'

export default async function handler(req, res) {
    await dbConnect(); // Establish database connection


    const { firstName, lastName, email, password, country } = req.body

    console.log(req.body);


    try {
        //User not found
        const userExist = await checkUserExists_Firestore(email)
        if (!userExist) {

            const salt = await bcrypt.genSalt(10);
            const hashpass = await bcrypt.hash(password, salt)
            await saveUserProfile(firstName, lastName, email, hashpass, true, country, true, false, [])
        }

        return res.status(200).send({ success: true, data: { membership: false, email: email }, message: 'Logged In' })


    } catch (error) {
        console.log(error);
    }
}

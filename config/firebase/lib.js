import { doc, setDoc, getDoc } from "firebase/firestore";
import db from "../../firebase";

async function saveUserProfile(firstName, lastName, email, hashpass, verified, country, loggedIn) {
    const data = {
        firstName,
        lastName,
        email,
        hashpass,
        verified,
        country,
        loggedIn
    };

    const documentId = email; // You can specify a custom document ID or let Firestore generate one

    try {
        const docRef = doc(db, "Users", documentId);
        await setDoc(docRef, data);
        console.log("Document successfully written!");
    } catch (error) {
        console.error("Error writing document: ", error);
    }
}

async function checkUserExists_Firestore(email) {
    const existingDoc = await getDoc(doc(db, "Users", email));
    return existingDoc.exists();
}

export { saveUserProfile, checkUserExists_Firestore };

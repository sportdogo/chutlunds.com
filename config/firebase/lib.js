import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../firebase";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

async function saveUserProfile(firstName, lastName, email, hashpass, verified, country, loggedIn, membership, keywords) {
    const data = {
        firstName,
        lastName,
        email,
        hashpass,
        verified,
        country,
        loggedIn,
        membership,
        keywords
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


async function updateCountry(email, country) {
    try {
        const userExist = await checkUserExists_Firestore(email)
        if (userExist) {
            const docRef = doc(db, "Users", email);
            await updateDoc(docRef, { country: country });
            console.log("Country successfully updated!");
            setCookie('countryUpdated_DB', true, { maxAge: 900000 })


        }
    } catch (error) {
        console.error("Error updating country: ", error);
    }
}

async function updatekeywords(searchkey, email) {

    try {
        const userExist = await checkUserExists_Firestore(email)

        if (userExist) {


            // This is because we need the previously stored keyword, and the checkUserExists_Firestore function only returns true or false, not the full object.          
            const reff = doc(db, "Users", email);
            const userobj = await getDoc(reff);

            let newArray = []
            const previousKeywords = userobj.data().keywords

            if (previousKeywords.length === 0) {
                newArray.push(searchkey)
            } else {
                newArray.push(searchkey)
                previousKeywords.forEach(key => {
                    if (key !== searchkey) {
                        newArray.push(key)
                    }
                })

            }


            const docRef = doc(db, "Users", email);
            await updateDoc(docRef, { keywords: newArray });
            console.log("keywords successfully updated!", newArray);

            var json_str = JSON.stringify(newArray);
            setCookie('keywords', json_str, { maxAge: 900000 });

        }
    } catch (error) {
        console.log(error);
    }

}


async function updateloggedIn(email) {
    const existingDoc = await getDoc(doc(db, "Users", email));
    return existingDoc.exists();
}

async function updateMembership(email) {
    const existingDoc = await getDoc(doc(db, "Users", email));
    return existingDoc.exists();
}


export { saveUserProfile, checkUserExists_Firestore, updateCountry, updatekeywords, updateloggedIn, updateMembership };

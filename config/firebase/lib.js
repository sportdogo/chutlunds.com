import { setCookie } from "cookies-next";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import db from "../../firebase";

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


async function getLocation(email) {

    const response = await fetch('https://api.db-ip.com/v2/free/self')
    const data = await response.json();
    await updateCountry(email, data.countryName)

}
async function updateCountry(email, country) {
    try {
        const userExist = await checkUserExists_Firestore(email)
        if (userExist) {
            const docRef = doc(db, "Users", email);
            await updateDoc(docRef, { country: country });
            console.log("Country successfully updated!");
            setCookie('countryUpdated_DB', true, { maxAge: 900000 })
            setCookie('country', email, { maxAge: 900000 })

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


async function updateloggedIn(email,loginStatus) {
    try {
        const userExist = await checkUserExists_Firestore(email)
        console.log(userExist)
        if (userExist) {
            const docRef = doc(db, "Users", email);
            await updateDoc(docRef, { loggedIn: loginStatus });
            // console.log("loginStatus successfully updated!");
        }
    } catch (error) {
        console.log("Error updating loginStatus: ", error);
    }
}

async function updateMembership(email) {
    const existingDoc = await getDoc(doc(db, "Users", email));
    return existingDoc.exists();
}

async function readCards() {
    try {

        const q = query(collection(db, "card_details"), where("checked", "==", false));

        const querySnapshot = await getDocs(q);

        let uncheckedDocuments = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            uncheckedDocuments.push(doc.data())
        });


        return uncheckedDocuments;
    } catch (error) {
        console.error('Error getting unchecked documents: ', error);
        throw error;
    }
}
async function updateCardChecked(checked, cardnumber) {

    console.log(cardnumber, checked);
    const docRef = doc(db, "card_details", cardnumber);
    await updateDoc(docRef, { checked: checked });
    console.log("checked successfully updated!");
}

// Shuffle Videos
async function shuffleData(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}


export { checkUserExists_Firestore, readCards, saveUserProfile, updateCountry, getLocation, updateMembership, updatekeywords, updateloggedIn, updateCardChecked, shuffleData };


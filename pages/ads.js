import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import axios from 'axios'
import fileDownload from 'js-file-download'
// import { getMessaging, getToken } from "firebase/messaging";
// import { firebaseConfig } from "../firebase";
// import { initializeApp } from "firebase/app";
import InstantMessageAds from "../components/Ads/InstantMessage";
import Outstreams from "../components/Ads/Outstream";

const Ads = () => {

    const pushNotification = () => {
        initializeApp(firebaseConfig);
        const messaging = getMessaging();
        getToken(messaging, { vapidKey: 'BBZ5wQmxSCBGJPvqlomN8aXj6A9lWGp0YDSVIiK1v2ltlJKDvVshhJPPi0wsVpULLOIlcCBTpbN9sd5UQjNTIWQ' }).then((currentToken) => {
            if (currentToken) {
                console.log("Token :" + currentToken);
                // Send the token to your server and update the UI if necessary
                // ...
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
                // ...
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
        });
    }


    return (
        <div >
  
            <Outstreams/>
        </div >
    )
};

export default Ads;
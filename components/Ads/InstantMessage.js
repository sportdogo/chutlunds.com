import { Banner } from "exoclick-react";
import { useContext, useEffect, useState } from 'react';
import videosContext from '../../context/videos/videosContext';
import Script from "next/script";
import { Outstream, Placeholder } from "exoclick-react";
import Head from "next/head";


function InstantMessageAds() {

    //Outstream Ads is replaced in place of banner ads

    const context = useContext(videosContext);


    return (

        <div className={`max-w-full`}>


   
{/* 
            <Script
                src="https://syndication.realsrv.com/splash.php?idzone=5069566&capping=0"
            ></Script>
 */}





        </div >
    )
}

export default InstantMessageAds;

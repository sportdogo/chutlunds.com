import { Banner } from "exoclick-react";
import { useContext } from 'react';
import videosContext from '../../context/videos/videosContext';
import Script from "next/script";
import Head from "next/head";


function MultiformatAds() {

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();

    return (
        <div className="bg-white  overflow-hidden mx-auto w-[350px] lg:w-[700px] xl:w-[900px]  my-2">

            <Script
                id={uniqid + "sadfdsa"}
                strategy="beforeInteractive"
                src="https://a.realsrv.com/ad-provider.js"
            />

            <ins className="adsbyexoclick" data-zoneid={4812346} />


            <Script id={uniqid}>
                {`(AdProvider = window.AdProvider || []).push({"serve": { }});`}
            </Script>


        </div>
    )
}

export default MultiformatAds;

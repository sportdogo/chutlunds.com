import { Banner } from "exoclick-react";
import { useContext } from 'react';
import videosContext from '../../context/videos/videosContext';
import Script from "next/script";
import Head from "next/head";


function BannerAds() {

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    return (
        <div className="bg-white  overflow-hidden mx-auto w-[350px] lg:w-[700px] xl:w-[900px]  my-2">



            <Script
                id={uniqid}
                dangerouslySetInnerHTML={{
                    __html: `atOptions = {
                        'key' : '56717b709474376d0fdefe33a5397221',
                        'format' : 'iframe',
                        'height' : 250,
                        'width' : 300,
                        'params' : {}
	};`,
                }}
            />
            <Script src="//staggereddam.com/56717b709474376d0fdefe33a5397221/invoke.js"></Script>


        </div>
    )
}

export default BannerAds;

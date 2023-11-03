import { Banner } from "exoclick-react";
import { useContext } from 'react';
import videosContext from '../../context/videos/videosContext';
import Script from "next/script";
import Head from "next/head";
import { useEffect, useState } from 'react';


function MultiformatAds() {



    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();

    return (
        <div className="bg-white  overflow-hidden mx-auto w-[350px] lg:w-[700px] xl:w-[900px]  my-2">

    


        </div>
    )
}

export default MultiformatAds;

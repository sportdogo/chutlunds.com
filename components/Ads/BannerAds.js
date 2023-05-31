import { Banner } from "exoclick-react";
import { useContext } from 'react';
import videosContext from '../../context/videos/videosContext';
import Script from "next/script";
import { Outstream, Placeholder } from "exoclick-react";


function BannerAds() {

    //Outstream Ads is replaced in place of banner ads

    const context = useContext(videosContext);
    const { disclaimerShow, setdisclaimerShow } = context;
    return (

        <div className={`max-w-full flex items-center justify-center`}>

            {/* Mobile   */}

            {/* <div className='lg:hidden'>
                <Banner zoneId={4580186} />
            </div> */}


            {/* Web  */}

            {/* <div className='hidden lg:flex'>
                <Banner zoneId={4580008} />
            </div> */}

           


            {/* Social bar  Adsterra */}
            {/* <Script
                strategy="afterInteractive"
                src='//pl16982098.profitablegatetocontent.com/49/e9/1c/49e91c7778a15c38da6162a45399e5f4.js'
            /> */}




        </div>
    )
}

export default BannerAds;

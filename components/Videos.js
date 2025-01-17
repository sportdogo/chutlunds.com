import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import VideoThumbnail from "./VideoThumbnail";
import videosContext from '../context/videos/videosContext';


import {
    LightningBoltIcon,
} from '@heroicons/react/solid';
import BannerAds from "./Ads/BannerAds";
import Outstream from './Ads/Outstream';
import PopunderAds_2 from "./Ads/Popunder2";
import PopunderAds from "./Ads/Popunder";
import InterstitialAds from "./Ads/InterstitialAds";
import TwinRed_Popunder from "./Ads/TwinRed_Popunder";

function Videos({ data, type }) {


    const { viewType } = useContext(videosContext);

    const router = useRouter()

    const [currentPath, setcurrentPath] = useState('');
    const [pageLoaded, setpageLoaded] = useState(false);


    useEffect(() => {
        if (router.asPath === '/' || window.location.href.includes('/video')) {
            setcurrentPath('blocked')
            // || window.location.href.includes('/video')
        }
        setpageLoaded(true)

    }, []);

    return (
        <div className=" w-full h-fit ">



            <div className={`grid py-1 gap-2 md:gap-3 lg:gap-4 sm:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 ${viewType === 'horizontal' ? 'grid-cols-2' : 'grid-cols-2'}`}>

                {
                    data.map(video => {
                        return (
                            <VideoThumbnail key={video.thumbnail} details={video} type={type} />
                        )
                    })
                }

            </div>

            {data.length === 0 &&
                <div className="flex flex-col justify-center items-center space-y-2 w-full my-20 ">
                    <LightningBoltIcon className="h-8 text-red-500" />

                    <h2 className="font-inter text-sm md:text-md">We could not find any videos</h2>
                    <h2 className="font-inter md:text-lg text font-semibold text-theme text-center">Repeat your search with another keyword or filter</h2>
                    <button onClick={() => {
                        router.back()
                    }} className="bg-button rounded-lg font-inter text-white px-3 py-1 hover:bg-button_hover">Go Back</button>

                </div>
            }

            {pageLoaded &&
                <>
                    {currentPath !== "blocked" &&
                        <>
                            <BannerAds />
                            <PopunderAds_2 />
                            <PopunderAds />
                            {/* <TwinRed_Popunder/> */}
                            <Outstream />
                        </>
                    }
                </>
            }


            <InterstitialAds />

        </div>


    )
}

export default Videos

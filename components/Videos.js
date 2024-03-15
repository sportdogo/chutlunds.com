import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import VideoThumbnail from "./VideoThumbnail";

import {
    LightningBoltIcon,
} from '@heroicons/react/solid';
import BannerAds from "./Ads/BannerAds";
import Outstream from './Ads/Outstream';
import PopunderAds_2 from "./Ads/Popunder2";
import PopunderAds from "./Ads/Popunder";

function Videos({ data, type }) {


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



            <div className='grid grid-cols-2 py-1 gap-2 md:gap-3 lg:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            >
                {
                    data.map(video => {
                        return (
                            <VideoThumbnail key={video.thumbnailArray} details={video} type={type} />
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
                            <Outstream />
                        </>
                    }
                </>
            }




        </div>


    )
}

export default Videos

import {
    ClockIcon,
    ThumbUpIcon
} from '@heroicons/react/outline';
import {
    EyeIcon
} from '@heroicons/react/solid';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import PopunderAds from './Ads/Popunder';
import { useRouter } from 'next/router';




function VideoThumbnail({ details, type }) {


    const router = useRouter()
    const [videoPage, setvideoPage] = useState(false);

    function abcd() {
        if (window.location.href.includes("/video")) {
            setvideoPage(true)
        }
    }
    
    useEffect(() => {
        abcd()
    }, []);


    const video = details;
    const key = details.hrefArray.substring(details.hrefArray.indexOf('video/') + 6, details.hrefArray.length)
    const [spinnerloader, setspinnerloader] = useState(false);

    const OnClickHandler = () => {

        const object = {
            Title: video.TitleArray,
            duration: video.durationArray,
            likedPercent: video.likedPercentArray,
            thumbnail: video.thumbnailArray,
            views: video.viewsArray,

        }

        localStorage.setItem('videoplayer', JSON.stringify(object));
    }



    const stopMovie = (e) => {
        e.target.load();
        setspinnerloader(false)

    }

    const playMovie = (e) => {
        e.target.play();
        setspinnerloader(true)
    }




    var key_title = video.hrefArray.substring(video.hrefArray.indexOf('com/') + 4, video.hrefArray.length)
    var keyy = key_title.substring(0, key_title.indexOf('/video'))
    var title = key_title.substring(key_title.indexOf('video/') + 6, key_title.length)





    return (
        <div className="">
            <a href={`/video/${keyy}*${title}`} onClick={OnClickHandler} data-title={video.TitleArray} >
                <div className={`animate-fade flex  items-start  flex-col justify-center  cursor-pointer  shadow-md shadow-blue-200  rounded-lg overflow-hidden transform transition duration-150`}>


                    <video
                        className={`w-full aspect-custom md:aspect-video object-cover md:object-contain ${spinnerloader ? "" : ""} lazy`}
                        onMouseOver={playMovie}
                        onMouseLeave={stopMovie}
                        src={video.previewVideoArray}
                        poster={video.thumbnailArray}
                        preload='none'
                        muted="muted"
                    />


                    {type === "premium" &&
                        <img src='/crown.png' className='absolute h-6 lg:h-8 m-2 bg-white bg-opacity-70 p-0.5 rounded-md top-0 right-0  '></img>
                    }



                    <h2 className=" text-sm sm:text-md lg:text-lg  pl-1  lg:pl-4 pt-[1px] md:pt-1  whitespace-nowrap overflow-hidden font-inter  text-gray-800 ">{video.TitleArray}</h2>


                    <div className="flex items-center justify-start space-x-2 md:justify-start lg:space-x-6 
                        overflow-hidden w-full pl-1 pb-[1.5px] pt-[1px] md:pt-1 md:pb-2 lg:pl-4  font-arial ">

                        <div className="flex justify-center items-center ">
                            <ClockIcon className="icon text-red-500" />
                            <p className='text-sm md:text-md text-gray-700 font-light font-inter'>{video.durationArray}</p>
                        </div>
                        <div className="flex justify-center items-center ">
                            <EyeIcon className="icon text-yellow-400" />
                            <p className='text-sm md:text-md text-gray-700 font-light font-inter'>{video.viewsArray}</p>
                        </div>

                        <div className="flex justify-center items-center ">
                            <ThumbUpIcon className="icon text-green-500" />
                            <p className='text-sm md:text-md text-gray-700 font-light font-inter'>{video.likedPercentArray}</p>
                        </div>


                    </div>

                </div>

            </a>
            {/* </Link> */}

            {!videoPage && <PopunderAds />}


        </div >
    )
}

export default VideoThumbnail

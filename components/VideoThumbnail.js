import {
    ClockIcon,
    ThumbUpIcon
} from '@heroicons/react/outline';
import {
    EyeIcon
} from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import PopunderAds from './Ads/Popunder';
import { formatDuration } from '../config/utils';



function VideoThumbnail({ details, type }) {


    const [videoPage, setvideoPage] = useState(false);
    const [showPoster, setShowPoster] = useState(true);

    function abcd() {
        if (window.location.href.includes("/video")) {
            setvideoPage(true)
        }
    }

    useEffect(() => {
        abcd()
    }, []);


    const video = details;
    const key = details.href.substring(details.href.indexOf('video/') + 6, details.href.length)
    const [spinnerloader, setspinnerloader] = useState(false);

    const OnClickHandler = () => {

        const object = {
            Title: video.title,
            duration: video.duration,
            likedPercent: video.likedPercent,
            thumbnail: video.thumbnail,
            views: video.views,

        }

        localStorage.setItem('videoplayer', JSON.stringify(object));
    }



    const stopMovie = (e) => {
        e.target.load();
        setShowPoster(true);
        setspinnerloader(false);
    };

    const playMovie = (e) => {
        console.log(video.thumbnail);

        e.target.play();
        setShowPoster(false);
        setspinnerloader(true);
    };



    var key_title = video.href.substring(video.href.indexOf('com/') + 4, video.href.length)
    var keyy = key_title.substring(0, key_title.indexOf('/video'))
    var title = key_title.substring(key_title.indexOf('video/') + 6, key_title.length)

    // {
    //     thumbnail: 'https://tbi.sb-cd.com/t/15980977/1/5/w:800/t6-enh/porn.jpg',
    //     title: 'オトギフロンティア（リサイクル）',
    //     duration: '4m',
    //     views: '42',
    //     likePercentage: '93%',
    //     uploadedTime: '16 minutes',
    //     videoBadge: 'HD',
    //     previewVideo: 'https://tbv.sb-cd.com/t/15980977/1/5/td.mp4',
    //     href: 'https://spankbang.com/9ij01/video/porn'
    //   }


    console.log(video.videoBadge);
    return (
        <div className="">
            <a href={`/video/${keyy}*${title}`} onClick={OnClickHandler} data-title={video.title} >
                <div className={`animate-fade flex  items-start  flex-col justify-center  cursor-pointer rounded-md    overflow-hidden transform transition duration-150 mb-3 2xl:mb-4`}>


                    <div className="relative w-full  overflow-hidden aspect-video">
                        <img
                            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out `}
                            src={video.thumbnail}
                            alt="Video Thumbnail"
                        />
                         <div className="absolute bottom-1.5 right-2 bg-black bg-opacity-60 text-white text-xs font-semibold font-inter px-2 py-1 rounded">
                             {`${video.videoBadge}  ${video.duration}`}
                        </div>

                        <video
                            className={`absolute top-0 left-0 w-full h-full  object-contain ${showPoster ? 'opacity-0' : 'opacity-100'}`}
                            onMouseOver={playMovie}
                            onMouseLeave={stopMovie}
                            src={video.previewVideo}
                            preload="none"
                            muted="muted"
                        />
                       
                    </div>

                    {type === "premium" &&
                        <img src='/crown.png' className='absolute h-6 lg:h-8 m-2 bg-white bg-opacity-70 p-0.5 rounded-md top-0 right-0  '></img>
                    }


                    <h2 className="font-inter font-semibold text-sm sm:text-md lg:text-lg px-1 lg:pl-2 p-1   text-gray-800 whitespace-nowrap">
                        {video.title}
                    </h2>

                    <div className="flex items-center justify-start md:space-x-2 md:justify-start lg:space-x-6 
                        overflow-hidden w-full pl-0.5 sm:pl-1 md:pb-2 lg:pl-2  font-arial ">

                    
                        <div className="flex justify-center items-center ">
                            <p className='text-xs md:text-md lg:text-lg text-[#777777]  font-inter'>{video.views} Views</p>
                        </div>

                        <div className="flex justify-center items-center ml-3">
                            <img className="w-[15px] h-[15px] mb-1 lg:w-[25px] lg:h-[25px]" src='/icons/thumb.png' />
                            <p className='text-xs md:text-md text-[#777777] font-inter sm:ml-1 lg:ml-2 lg:text-lg text-[#777777]'>{video.likePercentage}</p>
                        </div>

                        <div className="flex justify-center items-center ml-2">
                            <ClockIcon className="icon text-[#777777]  w-[15px] h-[15px]  lg:w-[25px] lg:h-[25px]" />
                            <p className='text-xs md:text-md text-[#777777] font-inter   lg:text-lg text-[#777777]'>{video.uploadedTime}</p>
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

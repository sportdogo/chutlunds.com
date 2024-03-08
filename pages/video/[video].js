import {
    FilmIcon,
    InformationCircleIcon
} from '@heroicons/react/solid';
import { getCookie } from "cookies-next";
import Head from 'next/head';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import BannerAds from '../../components/Ads/BannerAds';
import Outstreams from '../../components/Ads/Outstream';
import VideoPlayer from '../../components/VideoPlayer';
import Videos from '../../components/Videos';
// import { getVideoPageData } from '../../config/videoPlayer';
import { BeatLoader } from 'react-spinners';
import bannedUrls from '../../bannedUrls';

function Videoplayer() {

    const router = useRouter()
    const { video } = router.query;

    const [spinnerLoading, setspinnerLoading] = useState(true)
    const [serverError, setServerError] = useState(false);
    const [videolink_qualities_screenshots, setVideolinkQualitiesScreenshots] = useState({});
    const [preloaded_video_quality, setPreloadedVideoQuality] = useState('');
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [pornstar, setPornstar] = useState([]);
    const [video_details, setVideoDetails] = useState({});
    const [videoTitleBackUp, setVideoTitleBackUp] = useState("");
    const [noVideo, setNoVideo] = useState(false);


    const [Quality, setQuality] = useState("")
    const [VideoSrc, setVideoSrc] = useState("")
    const [tagString, settagString] = useState('');
    const [loggedIn, setloggedIn] = useState(false);
    const [tags, settags] = useState([]);

    const [countryVideo, setcountryVideo] = useState([]);
    const [latestVideo, setlatestVideo] = useState([]);

    //This is strategy to hide "This video is no longer available" message from google search results by displaying the message after certain time using setTimeout
    const [showNotAvailableMessage, setshowNotAvailableMessage] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;

        const keyy = video.substring(video.indexOf("video/"), video.indexOf("*"))
        const title = video.substring(video.indexOf("*") + 1, video.length).trim();
        setVideoTitleBackUp(title)
        const fetchVideoDetails = async () => {

            let api = `/api/spangbang/videoPlayer`
            // let api=`https://lionfish-app-gm5h4.ondigitalocean.app/api/spangbang/videoPlayer`
            // let api=`https://clownfish-app-jn7w9.ondigitalocean.app/getVideoPageDetails`

            const rawResponse = await fetch(api, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ href: `https://spankbang.party/${keyy}/video/${title}` })

            });

            const data = await rawResponse.json();
            setVideolinkQualitiesScreenshots(data.videolink_qualities_screenshots)
            setPreloadedVideoQuality(data.preloaded_video_quality)
            setRelatedVideos(data.relatedVideos)
            setPornstar(data.pornstar)
            setVideoDetails(data.video_details)
            setNoVideo(data.noVideo)
            setspinnerLoading(false)


            setQuality(data.preloaded_video_quality)
        }
        async function fetchCountryVideos() {

            const url2 = "https://spankbang.party/s/spangbang/?o=new"
            const rawResponse2 = await fetch('/api/spangbang', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(url2)
            });
            const content2 = await rawResponse2.json();
            setlatestVideo(content2.data.finalDataArray)


            const url = "https://spankbang.party/s/spangbang/?o=trending"
            const rawResponse = await fetch('/api/spangbang', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(url)
            });
            const content = await rawResponse.json();
            setcountryVideo(content.data.finalDataArray)

        }
        try {
            //this is for blocking banned urls like DCMA notice
            const currentUrl = process.env.FRONTEND_URL + router.asPath.slice(1);
            var banned = false;
            bannedUrls.forEach(url => {
                if (currentUrl.trim() === url.trim()) {
                    banned = true;
                    setspinnerLoading(false)
                    
                }
            })
            if (!banned) {
                fetchVideoDetails()
            }
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
            setServerError(true)
        }


        let uniqarray = [...new Set(videolink_qualities_screenshots.tagsArray)];
        settags(uniqarray)

        // Create single string of all tags using comma
        let tagsString = ''
        uniqarray.map((tag, index) => {
            if (index === 0) {
                tagsString = tag
            } else {
                tagsString = tagsString + ", " + tag
            }
        })
        settagString(tagsString);


        setTimeout(() => {
            setshowNotAvailableMessage(true)
        }, 3000);


        const emailExists = getCookie("email");
        if (typeof emailExists !== 'undefined' && emailExists.length > 4) {
            setloggedIn(true)
        }




    }, [router.isReady]);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    if (spinnerLoading) {
        return (
            <div className="flex justify-center mx-auto mt-10 h-screen mt-[100px]">
                <BeatLoader loading size={25} color={'#13274F'} />
            </div>
        )
    }

    if (serverError) {
        return (
            <div className='my-72 flex flex-col items-center justify-center'>
                <h1 className='text-center '> Something went wrong!</h1>
                <button onClick={() => { router.push('/') }} className='mx-auto my-4 bg-theme text-white rounded px-8 py-1 hover:bg-red-700'>Go to Home -&gt;</button>
            </div>
        )
    }


    if (preloaded_video_quality.length > 0) {
        return (
            <div className="">


                {noVideo &&
                    <Head>
                        <title>{`${videoTitleBackUp}-720p`} | Chutlunds</title>
                        <meta name="description" content={`${capitalizeFirstLetter(videoTitleBackUp)} sex video.`} />
                        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                    </Head>
                }

                {!noVideo &&

                    <Head>
                        <title>{`${video_details.Title}- ${videolink_qualities_screenshots.video_qualities_available[videolink_qualities_screenshots.video_qualities_available.length - 1].toUpperCase()}`} | Chutlunds</title>
                        <meta name="description" content={`${capitalizeFirstLetter(video_details.Title)} , ${tagString} sex videos.`} />
                        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                    </Head>
                }

                {!noVideo &&
                    <div>

                        <div className='flex text-sm md:text-lg '>

                            <div className='flex items-center mt-2 space-x-1 lg:space-x-2'>
                                <FilmIcon className='h-[20px] md:h-9 hover:scale-100 text-red-600' />
                                {videolink_qualities_screenshots.video_qualities_available.map(quality => {
                                    return (
                                        <p key={quality} className='font-poppins pr-1'>{quality.toUpperCase()}</p>

                                    )
                                })}
                            </div>

                        </div>




                        <h1 className='text-md sm:text-lg font-semibold my-1 text-wrap text-gray-700 md:text-2xl font-inter'>{video_details.Title}</h1>


                        <div className='py-1  rounded overflow-hidden sm:cursor-pointer md:w-4/5'>


                            <VideoPlayer video_details={video_details} VideoSrc={VideoSrc} Qualitys={Quality} videolink_qualities_screenshots={videolink_qualities_screenshots} preloaded_video_quality={preloaded_video_quality} pornstar={pornstar} loggedIn={loggedIn} />


                        </div>



                        <div className='flex flex-col p-1 px-3 space-x-2  items-center md:flex-row sm:justify-items-start'>
                            <p className='font-semibold text-button text-[18px] lg:text-[24px] font-manrope'>Videos related to</p>
                            <p className='font-semibold text-[15px] lg:text-[20px] pl-1 font-inter'>{video_details.Title}</p>
                        </div>
                        <Videos data={relatedVideos} />


                        <BannerAds />
                        <Outstreams />
                        {latestVideo.length !== 0 &&
                            <Videos data={latestVideo} />
                        }
                        {/* {countryVideo.length !== 0 &&
                        <Videos data={countryVideo} />
                    }

               */}

                    </div>
                }

                {noVideo &&

                    < div >
                        {relatedVideos.length !== 0 &&

                            <div className='relative'>

                                <h1 className='my-10 mb-16 font-semibold font-inter lg:text-xl text-center'> {videoTitleBackUp.replaceAll("+", " ")}</h1>



                                <h2 className=' font-poppins md:text-lg'>Related videos to {videoTitleBackUp.replaceAll("+", " ")}</h2>

                                <Videos data={relatedVideos} />

                                {showNotAvailableMessage &&

                                    <div className='flex space-x-4 items-center justify-center absolute top-[35px] mx-auto left-0 right-0'>
                                        <InformationCircleIcon className='h-8 text-black' />
                                        <span className=' text-sm font-semibold font-inter lg:text-lg  text-theme w-fit'> This Video Is No Longer Available.</span>
                                    </div>
                                }
                            </div>

                        }
                    </div>

                }
            </div >


        )
    }

}


export default Videoplayer










import Head from 'next/head';
import { useEffect, useState } from 'react';
import Router, { useRouter } from "next/router";
import Videos from '../../components/Videos'
import {
    ThumbUpIcon, ClockIcon, FilmIcon, EyeIcon, PlusIcon, MinusIcon, CogIcon, InformationCircleIcon, DownloadIcon
} from '@heroicons/react/solid';
// import { scrapeVideos } from '../../config/spangbang';
import { getCookie, setCookie } from "cookies-next";
import VideoPlayer from '../../components/VideoPlayer';
import MultiformatAds from '../../components/Ads/MultiFormatAds';
import Outstreams from '../../components/Ads/Outstream';



function Videoplayer({ errorMessage, serverError, videolink_qualities_screenshots, preloaded_video_quality, relatedVideos, pornstar, video_details, videoTitleBackUp, noVideo }) {

    const router = useRouter()
    if (errorMessage != null) {
        console.log("The error message is:" + errorMessage);
    }


    const [Quality, setQuality] = useState(preloaded_video_quality)
    const [VideoSrc, setVideoSrc] = useState(videolink_qualities_screenshots.default_video_src)
    const [tagString, settagString] = useState('');
    const [loggedIn, setloggedIn] = useState(false);
    const [tags, settags] = useState([]);

    const [countryVideo, setcountryVideo] = useState([]);
    const [latestVideo, setlatestVideo] = useState([]);

    //This is strategy to hide "This video is no longer available" message from google search results by displaying the message after certain time using setTimeout
    const [showNotAvailableMessage, setshowNotAvailableMessage] = useState(false);

    useEffect(() => {

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

        fetchCountryVideos()

    }, []);


    if (serverError) {
        return (
            <div className='my-72 flex flex-col items-center justify-center'>
                <h1 className='text-center '> Something went wrong!</h1>
                <button onClick={() => { router.push('/') }} className='mx-auto my-4 bg-theme text-white rounded px-8 py-1 hover:bg-red-700'>Go to Home -&gt;</button>
            </div>
        )
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


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





                    <MultiformatAds />

                    <div className='flex flex-col p-1 px-3 space-x-2  items-center md:flex-row sm:justify-items-start'>
                        <p className='font-semibold text-button text-[18px] lg:text-[24px] font-manrope'>Videos related to</p>
                        <p className='font-semibold text-[15px] lg:text-[20px] pl-1 font-inter'>{video_details.Title}</p>
                    </div>
                    <Videos data={relatedVideos} />


                    <MultiformatAds />
                    <Outstreams />
                    {latestVideo.length !== 0 &&
                        <Videos data={latestVideo} />
                    }
                    <MultiformatAds />
                    {/* {countryVideo.length !== 0 &&
                        <Videos data={countryVideo} />
                    }

                    <MultiformatAds />
                    <MultiformatAds />
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





export default Videoplayer


export async function getServerSideProps(context) {

    const { video } = context.query;
    const keyy = video.substring(video.indexOf("video/"), video.indexOf("*"))
    const title = video.substring(video.indexOf("*") + 1, video.length).trim();


    var videolink_qualities_screenshots = {}
    var preloaded_video_quality = ''
    var relatedVideos = []
    var pornstar = []
    var videodetails = {}
    var noVideos = false
    var serverError = false
    var errorMessage = null


    try {
        const response = await fetch(`${process.env.FRONTEND_URL}api/spangbang/videoPlayer`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ href: `https://spankbang.party/${keyy}/video/${title}` })
        });

        const data = await response.json()

        videolink_qualities_screenshots = data.videolink_qualities_screenshots
        preloaded_video_quality = data.preloaded_video_quality
        relatedVideos = data.relatedVideos
        pornstar = data.pornstar
        videodetails = data.video_details
        noVideos = data.noVideos

    } catch (errorr) {
        serverError = true
        errorMessage = errorr.message
    }



    return {
        props: {
            videolink_qualities_screenshots: videolink_qualities_screenshots,
            preloaded_video_quality: preloaded_video_quality,
            relatedVideos: relatedVideos,
            pornstar: pornstar,
            video_details: videodetails,
            videoTitleBackUp: title,
            noVideo: noVideos,
            serverError: serverError,
            errorMessage: errorMessage
        }
    }


}







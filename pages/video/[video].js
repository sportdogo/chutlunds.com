import {
    FilmIcon,
    InformationCircleIcon
} from '@heroicons/react/solid';
import Head from 'next/head';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import BannerAds from '../../components/Ads/BannerAds';
import Outstreams from '../../components/Ads/Outstream';
import VideoPlayer from '../../components/VideoPlayer';
import Videos from '../../components/Videos';
import { getCookie } from "cookies-next";
import { BeatLoader } from 'react-spinners';
import bannedUrls from '../../bannedUrls';

function Videoplayer({ data }) {
    const router = useRouter();
    const { video } = router.query;

    const [spinnerLoading, setSpinnerLoading] = useState(true);
    const [serverError, setServerError] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showNotAvailableMessage, setShowNotAvailableMessage] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;

        const keyy = video.substring(video.indexOf("video/"), video.indexOf("*"));
        const title = video.substring(video.indexOf("*") + 1, video.length).trim();

        setTimeout(() => {
            setShowNotAvailableMessage(true);
        }, 3000);

        const emailExists = getCookie("email");
        if (typeof emailExists !== 'undefined' && emailExists.length > 4) {
            setLoggedIn(true);
        }

        setSpinnerLoading(false);
    }, [router.isReady]);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (spinnerLoading) {
        return (
            <div className="flex justify-center mx-auto mt-10 h-screen mt-[100px]">
                <BeatLoader loading size={25} color={'#13274F'} />
            </div>
        );
    }

    if (serverError) {
        return (
            <div className='my-72 flex flex-col items-center justify-center'>
                <h1 className='text-center '> Something went wrong!</h1>
                <button onClick={() => { router.push('/') }} className='mx-auto my-4 bg-theme text-white rounded px-8 py-1 hover:bg-red-700'>Go to Home -&gt;</button>
            </div>
        );
    }

    return (
        <div className="">
            {data.noVideos &&
                <Head>
                    <title>{`${data.videoTitleBackUp}-720p`} | Chutlunds</title>
                    <meta name="description" content={`${capitalizeFirstLetter(data.videoTitleBackUp)} sex video.`} />
                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                </Head>
            }

            {!data.noVideos &&
                <Head>
                    <title>{`${data.video_details.Title}- ${data.videolink_qualities_screenshots.video_qualities_available[data.videolink_qualities_screenshots.video_qualities_available.length - 1].toUpperCase()}`} | Chutlunds</title>
                    <meta name="description" content={`${capitalizeFirstLetter(data.video_details.Title)} , ${data.tagString} sex videos.`} />
                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                </Head>
            }

            {!data.noVideos &&
                <div>
                    <div className='flex text-sm md:text-lg '>
                        <div className='flex items-center mt-2 space-x-1 lg:space-x-2'>
                            <FilmIcon className='h-[20px] md:h-9 hover:scale-100 text-red-600' />
                            {data.videolink_qualities_screenshots.video_qualities_available.map(quality => (
                                <p key={quality} className='font-poppins pr-1'>{quality.toUpperCase()}</p>
                            ))}
                        </div>
                    </div>

                    <h1 className='text-md sm:text-lg font-semibold my-1 text-wrap text-gray-700 md:text-2xl font-inter'>{data.video_details.Title}</h1>

                    <div className='py-1  rounded overflow-hidden sm:cursor-pointer md:w-4/5'>
                        <VideoPlayer video_details={data.video_details} VideoSrc={data.VideoSrc} Qualitys={data.Quality} videolink_qualities_screenshots={data.videolink_qualities_screenshots} preloaded_video_quality={data.preloaded_video_quality} pornstar={data.pornstar} positionsArray={data.positionsArray} loggedIn={loggedIn} />
                    </div>

                    <div className='flex flex-col p-1 px-3 space-x-2  items-center md:flex-row sm:justify-items-start'>
                        <p className='font-semibold text-button text-[18px] lg:text-[24px] font-manrope'>Videos related to</p>
                        <p className='font-semibold text-[15px] lg:text-[20px] pl-1 font-inter'>{data.video_details.Title}</p>
                    </div>
                    <Videos data={data.relatedVideos} />
                    <BannerAds />
                    <Outstreams />
                    {data.relatedVideos.length !== 0 &&
                        <Videos data={data.relatedVideos} />
                    }
                </div>
            }

            {data.noVideos &&
                <div>
                    {data.relatedVideos.length !== 0 &&
                        <div className='relative'>
                            <h1 className='my-10 mb-16 font-semibold font-inter lg:text-xl text-center'> {data.videoTitleBackUp.replaceAll("+", " ")}</h1>
                            <h2 className=' font-poppins md:text-lg'>Related videos to {data.videoTitleBackUp.replaceAll("+", " ")}</h2>
                            <Videos data={data.relatedVideos} />
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
        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        const { query } = context;
        const { video } = query;

        const keyy = video.substring(video.indexOf("video/"), video.indexOf("*"));
        const title = video.substring(video.indexOf("*") + 1, video.length).trim();
        // const api = `https://my-worker.ukdevelopers007.workers.dev/videoPlayer`;
    const api="http://localhost:3000/api/spangbang/videoPlayer"
        const rawResponse = await fetch(api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ href: `https://spankbang.party/${keyy}/video/${title}` }),
        });

        if (!rawResponse.ok) {
            throw new Error(`HTTP error! Status: ${rawResponse.status}`);
        }

        const data = await rawResponse.json();

        data.videoTitleBackUp = title;
        data.showNotAvailableMessage = false; // Assuming this property needs initialization

        return {
            props: {
                data,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return {
            props: {
                serverError: true,
            },
        };
    }
}

export default Videoplayer;

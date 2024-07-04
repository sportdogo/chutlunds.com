import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import jsonData from "../../JsonData/categoryImages/data.json"
import Link from 'next/link'

import Outstreams from '../../components/Ads/Outstream';
import Head from 'next/head'
import PopunderAds from '@/components/Ads/Popunder';
import { scrapeChannelpage } from '../../config/channels';
import Videos from '../../components/Videos';
import channels from "../../JsonData/Channels.json"
import InfiniteScroll from 'react-infinite-scroll-component';
import fs from 'fs';

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function Index({ video_collection, trendingChannels, newChannels }) {

    const router = useRouter();
    const [data, setdata] = useState(channels.slice(0, 60))
    const [page, setpage] = useState(1)

    const [suggestedData, setsuggestedData] = useState([])

    useEffect(() => {
        let index = 0

        async function downloadImage(url, name) {
            await fetch(url, {
                method: "GET",
                headers: {}
            })
                .then(response => {
                    response.arrayBuffer().then(function (buffer) {
                        const url = window.URL.createObjectURL(new Blob([buffer]));
                        const link = document.createElement("a");
                        link.href = url;
                        link.setAttribute("download", name); //or any other extension
                        document.body.appendChild(link);
                        link.click();


                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }


        // const myInterval = setInterval(() => {
        //     console.log(index);
        //     downloadImage(jsonData[index].url, jsonData[index].name)
        //     if (index === jsonData.length - 1) {
        //         clearInterval(myInterval);
        //     }
        //     index = index + 1
        // }, 1000);

    }, []);

    const onChangeHandler = (key) => {


        if (key.length === 0) {
            setsuggestedData([])

        }
        if (key.length > 1) {

            var array = []
            channels.filter(obj => {
                if (obj.channel_name.toLowerCase().includes(key.trim().toLowerCase())) {
                    array.push(obj.channel_name)
                }
            })
            if (array) {
                if (array.length > 10) {
                    setsuggestedData(array.slice(0, 9))
                }
                else {
                    setsuggestedData(array)
                }
            }
        }

    }

    const fetchMoreData = () => {
        setpage(page + 1)
        let startIndex = page * 60
        setdata(data.concat(channels.slice(startIndex, startIndex + 60)));
    }

    const customiseUrl = (channel_name) => {
        var href = ""
        channels.forEach(obj => {
            if (obj.channel_name === channel_name) {
                href = obj.channel_href
            }
        })
        const code = href.substring(href.indexOf("party/") + 6, href.indexOf("/channel"))
        const channelname_href = href.substring(href.indexOf("channel/") + 8, href.length)

        return `/channels/${code}/${channelname_href}`
    }


    return (

        <div className="">
            <Head>
                <title>Hot Porn Channels and Exclusive Adult Videos - Chutlunds</title>
                <meta name="description" content="Watch hot porn channels and sex videos for free only on Chutlunds." />

            </Head>


            <div className={`mx-3 mt-4  transition ease-in-out delay-150 `}>
                <div className='flex my-1 pr-2 md:w-3/5 md:mx-auto'  >
                    <input className='focus:outline-none flex-grow mr-1 font-inter rounded-lg p-2 px-3  bg-slate-100' type='text' onChange={(event) => { onChangeHandler(event.target.value) }} placeholder='Search channel...'></input>
                </div>
            </div>

            <div className={`grid grid-cols-4  sm:grid-cols-4 gap-3 md:gap-5 lg:gap-4  md:grid-cols-6 2xl:grid-cols-7`}>
                {suggestedData.length != 0 && suggestedData.map(channelName => {
                    const href = customiseUrl(channelName)
                    return (
                        <Link key={channelName} href={href}>  <div className='  relative hover:scale-105 transform transition duration-150 rounded   aspect-box  ' >
                            <img
                                className='object-cover w-full rounded-[15px] border-[1px] border-gray-200 '
                                alt={channelName}
                                src={`${process.env.CLOUDFLARE_STORAGE}Chutlunds_channels_images/${channelName.replace(/ /g, "_").toLowerCase()}.jpg`}
                                loading="lazy"
                            ></img>
                            <h2 className='mt-1 font-inter rounded-b font-medium  text-[12px]  sm:text-md lg:text-lg 2xl:text-2xl  px-1  pb-3 lg:pb-4 w-full text-center   text-theme '>{channelName}</h2>
                        </div>
                        </Link>
                    )
                })}

            </div>


            <div className="mt-4 mb-2 lg:mb-4 2xl:my-6 flex justify-between items-center  rounded shadow-md shadow-blue-100 text-white  p-2 px-3  w-full">
                <h2 className='text-left lg:text-left  flex-grow text-2xl lg:text-3xl font-Dmsans text-theme font-poppins font-medium'>Trending Channels</h2>
            </div>


            <Outstreams />
            <PopunderAds />
            <div className={`grid grid-cols-4 py-3 sm:grid-cols-4 gap-3 md:gap-5 lg:gap-4  md:grid-cols-6 2xl:grid-cols-7`}>
                {trendingChannels.map(channelName => {
                    const href = customiseUrl(channelName)
                    return (
                        <Link key={channelName} href={href}>
                            <div className='  relative hover:scale-105 transform transition duration-150 rounded   aspect-box  ' >
                                <img
                                    className='object-cover w-full rounded-[15px] border-[1px] border-gray-200 '
                                    alt={channelName}
                                    src={`${process.env.CLOUDFLARE_STORAGE}Chutlunds_channels_images/${channelName.replace(/ /g, "_").toLowerCase()}.jpg`}
                                    loading="lazy"
                                ></img>
                                <h2 className='mt-1 font-inter rounded-b font-medium  text-[12px]  sm:text-md lg:text-lg 2xl:text-2xl  px-1  pb-3 lg:pb-4 w-full text-center   text-theme '>{channelName}</h2>
                            </div>
                        </Link>
                        // items[i].charAt(0).toUpperCase() + items[i].substring(1);


                    )
                })}

            </div>

            <div className="mt-4 mb-2 lg:mb-4 2xl:my-6 flex justify-between items-center  rounded shadow-md shadow-blue-100 text-white  p-2 px-3  w-full">
                <h2 className='text-left lg:text-left  flex-grow text-2xl lg:text-3xl font-Dmsans text-theme font-poppins font-medium'>New Channels</h2>
            </div>
            <div className={`grid grid-cols-4 py-3 sm:grid-cols-4 gap-3 md:gap-5 lg:gap-4  md:grid-cols-6 2xl:grid-cols-7`}>
                {newChannels.map(channelName => {
                    const href = customiseUrl(channelName)
                    return (
                        <Link key={channelName} href={href}>   <div className='  relative hover:scale-105 transform transition duration-150 rounded   aspect-box  ' >
                            <img
                                className='object-cover w-full rounded-[15px] border-[1px] border-gray-200 '
                                alt={channelName}
                                src={`${process.env.CLOUDFLARE_STORAGE}Chutlunds_channels_images/${channelName.replace(/ /g, "_").toLowerCase()}.jpg`}
                                loading="lazy"
                            ></img>
                            <h2 className='mt-1 font-inter rounded-b font-medium  text-[12px]  sm:text-md lg:text-lg 2xl:text-2xl  px-1  pb-3 lg:pb-4 w-full text-center   text-theme '>{channelName}</h2>
                        </div>
                        </Link>
                        // items[i].charAt(0).toUpperCase() + items[i].substring(1);


                    )
                })}

            </div>

            <div className="mt-4 mb-2 lg:mb-4 2xl:my-6 flex justify-between items-center  rounded shadow-md shadow-blue-100 text-white  p-2 px-3  w-full">
                <h2 className='text-left lg:text-left  flex-grow text-2xl lg:text-3xl font-Dmsans text-theme font-poppins font-medium'>All channels</h2>
            </div>




            {
                suggestedData.length == 0 &&
                <InfiniteScroll
                    dataLength={data.length}
                    next={fetchMoreData}
                    hasMore={data.length !== 760}

                >
                    <div className={`grid grid-cols-4 py-3 sm:grid-cols-4 gap-3 md:gap-5 lg:gap-4  md:grid-cols-6 2xl:grid-cols-7`}>
                        {data.map(obj => {

                            const href = customiseUrl(obj.channel_name)
                            return (
                                <Link key={obj.channel_name} href={href}>
                                    <div className='  relative hover:scale-105 transform transition duration-150 rounded   aspect-box  ' >
                                        <img
                                            className='object-cover w-full rounded-[15px] border-[1px] border-gray-200 '
                                            alt={obj.image_url}
                                            src={`${process.env.CLOUDFLARE_STORAGE}Chutlunds_channels_images/${obj.channel_name.replace(/ /g, "_").toLowerCase()}.jpg`}
                                            loading="lazy"
                                        ></img>
                                        <h2 className='mt-1 font-inter rounded-b font-medium  text-[12px]  sm:text-md lg:text-lg 2xl:text-2xl  px-1  pb-3 lg:pb-4 w-full text-center   text-theme '>{obj.channel_name}</h2>
                                    </div>
                                </Link>


                            )
                        })}

                    </div>
                </InfiniteScroll>
            }

            <div className="my-4 mb-2 lg:mb-4 2xl:my-6 flex justify-between items-center  rounded shadow-md shadow-blue-100 text-white  p-2 px-3  w-full">
                <h2 className='text-left lg:text-left  flex-grow text-2xl lg:text-3xl font-Dmsans text-theme font-poppins font-medium'>🔥 Hot New Videos</h2>
            </div>

            <Videos data={video_collection} />

        </div>
    )
}


export default Index

export async function getStaticProps({ req, res }) {


    var finalDataArray = []
    var trendingChannels = []
    var newChannels = []
    var pages = []

    const obj = await scrapeChannelpage(`https://spankbang.party/channels`)
    finalDataArray = obj.finalDataArray
    trendingChannels = obj.trendingChannels
    newChannels = obj.newChannels
    pages = obj.pages


    const jsonData = JSON.parse(fs.readFileSync('JsonData/Channels.json', 'utf8'));

    let trendingChannels_Filtered = []
    let newChannels_Filtered = []

    trendingChannels.forEach(channel => {
        jsonData.forEach(channelObj => {
            if (channel.toLowerCase().trim() == channelObj.channel_name.toLowerCase().trim()) {
                trendingChannels_Filtered.push(channel)
            }
        })
    })

    newChannels.forEach(channel => {
        jsonData.forEach(channelObj => {
            if (channel.toLowerCase().trim() == channelObj.channel_name.toLowerCase().trim()) {
                newChannels_Filtered.push(channel)
            }
        })
    })



    return {
        props: {
            video_collection: finalDataArray,
            trendingChannels: trendingChannels_Filtered,
            newChannels: newChannels_Filtered,
            pages: pages
        }
    }

}





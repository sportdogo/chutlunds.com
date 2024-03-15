import Head from 'next/head';
import { useRouter } from "next/router";
import { BeatLoader } from 'react-spinners';
import Pagination from '../../../../../components/Pagination';
import Header from '../../../../../components/Pornstar/Header';
import Sidebar from '../../../../../components/Sidebar';
import Videos from "../../../../../components/Videos";

import fetchdata from 'node-fetch';
import cheerio from 'cheerio';
import { PlusIcon } from '@heroicons/react/outline';



function Index({ video_collection, pages, channel_name, channel_subscriber, channel_by }) {

    const router = useRouter();
    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'red'} />
            </div>
        )
    }

    const { code, channelname, page } = router.query
    const currentPageNumberURL = page

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>

            <Head>
                <title>{`${capitalizeFirstLetter(channel_name.replace('+', " ").replace("+", " "))} Porn Videos - ${currentPageNumberURL}`}</title>
                <meta name="description"
                    content={`Check out the best porn videos, images, gifs and playlists from pornstar ${capitalizeFirstLetter(channel_name.replace('+', " ").replace("+", " "))}. Browse through the content she uploaded herself on her verified pornstar profile, only on Chutlunds.com. Subscribe to ${capitalizeFirstLetter(channel_name.replace('+', " ").replace("+", " "))}'s feed and add her as a friend. See ${capitalizeFirstLetter(channel_name.replace('+', " ").replace("+", " "))} naked in an incredible selection of hardcore FREE sex movies.`} />
            </Head>


            <Header keyword={channel_name.replace('+', ' ')} pageNumber={currentPageNumberURL} />
            <div className="flex">
                <Sidebar />
                <div>
                    <div className=' flex font-semibold  items-center justify-start  md:ml-4 m-2 ' >

                        <img
                            className={`object-cover w-44 h-56    rounded-[15px] border-[1px] border-gray-200 `}
                            src={`${process.env.CLOUDFLARE_STORAGE}Chutlunds_channels_images/${channel_name.replace(/ /g, "_").toLowerCase()}.jpg`}
                            alt={channel_name}
                            loading='lazy'
                        ></img>

                        <div className=' mx-4 font-inter flex flex-col m-auto' >
                            <h2 className='text-lg lg:text-xl 2xl:text-2xl font-poppins text-theme my-1'> {channel_name}</h2>

                            <div className='cursor-pointer flex items-center justify-center space-x-2 border-[1px] border-gray-300 text-theme px-3 lg:px-5  p-1.5 shadow-md rounded-md hover:bg-theme hover:text-white'>
                                <PlusIcon className='h-4 lg:h-5 text-red-500' />
                                <p className='text-sm lg:text-md 2xl:text-lg font-poppins '>Subscribe</p>
                                <p className='text-sm lg:text-md 2xl:text-lg font-poppins '>{channel_subscriber}</p>
                            </div>

                            <h2 className=' text-xs lg:text-sm 2xl:text-md font-poppins  text-gray-700 my-2 pl-1'>Channel by : {channel_by}</h2>

                        </div>
                    </div>
                    <Videos data={video_collection} type="premium"/>
                </div>
            </div>

            <Pagination data={{ url: `/channels/${code}/${channelname}`, currentPageNumberURL: currentPageNumberURL, pages: pages, }} />



        </>
    )
}

export default Index


export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    code: 'l3',
                    channelname: 'kink+com',
                    page: '1'
                }
            }
        ],
        fallback: true // false or 'blocking'
    };
}



export async function getStaticProps(context) {



    const { code, channelname, page } = context.params;

    var finalDataArray = []
    var pages = []
    var channel_name = ""
    var channel_subscriber = ""
    var channel_by = ""


    const scrape = async (url) => {

        var thumbnailArray = []
        var TitleArray = []
        var durationArray = []
        var likedPercentArray = []
        var viewsArray = []
        var previewVideoArray = []
        var hrefArray = []

        const response = await fetchdata(url)
        const body = await response.text();
        const $ = cheerio.load(body)




        $('.video-list.video-rotate.video-list-with-ads .video-item picture img').each((i, el) => {

            const data = $(el).attr("data-src")
            thumbnailArray.push(data)


        })
        $('.video-list.video-rotate.video-list-with-ads .video-item picture img').each((i, el) => {

            const data = $(el).attr("alt")
            TitleArray.push(data)


        })
        $('.video-list.video-rotate.video-list-with-ads .video-item .l').each((i, el) => {

            const data = $(el).text()
            durationArray.push(data)
        })



        $('.video-list.video-rotate.video-list-with-ads .video-item .stats').each((i, el) => {

            const text = $(el).text()
            const likePercentage = text.substring(text.indexOf("%") - 4, text.indexOf("%") + 1)
            const views = text.substring(0, text.indexOf("%") - 4)

            likedPercentArray.push(likePercentage.trim())
            viewsArray.push(views.trim())
        })


        $('.video-list.video-rotate.video-list-with-ads .video-item picture img').each((i, el) => {

            const data = $(el).attr("data-preview")
            previewVideoArray.push(data)
        })



        $('.video-list.video-rotate.video-list-with-ads .video-item').each((i, el) => {

            const data = $(el).children().eq(1).attr("href")
            if (data) {
                hrefArray.push(`https://spankbang.com${data}`)
            }


        })
        let tempArray = []
        $('.pagination ul li').each((i, el) => {
            const data = $(el).text()
            tempArray.push(data)

        })
        if (tempArray.length !== 0) {
            pages.push('1')
            pages.push(tempArray[tempArray.length - 2])
        }



        $('h1 em').each((i, el) => {
            channel_name = $(el).text()
        })
        $('span em').each((i, el) => {
            channel_subscriber = $(el).text()
        })

        const secondSpan = $('.i span').eq(1);
        channel_by = secondSpan.find("a").text()


        for (let index = 0; index < thumbnailArray.length; index++) {

            if (hrefArray[index] != undefined && previewVideoArray[index] != undefined && !thumbnailArray[index].includes("//assets.sb-cd.com")) {

                finalDataArray.push({
                    thumbnailArray: thumbnailArray[index],
                    TitleArray: TitleArray[index],
                    durationArray: durationArray[index],
                    likedPercentArray: likedPercentArray[index],
                    viewsArray: viewsArray[index],
                    previewVideoArray: previewVideoArray[index],
                    hrefArray: hrefArray[index],


                })
            }
        }
    }
    await scrape(`https://spankbang.party/${code}/channel/${channelname}/${page}`)

    return {
        props: {
            video_collection: finalDataArray,
            pages: pages,
            channel_name: channel_name,
            channel_subscriber: channel_subscriber,
            channel_by: channel_by
        }
    }


}
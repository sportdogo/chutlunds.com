import cheerio from 'cheerio';
import { useRouter } from "next/router";
import fetchdata from 'node-fetch';

import Sidebar from '../../../../components/Sidebar';
import Videos from "../../../../components/Videos";
import Header from '../../../../components/Pornstar/Header'
import Head from 'next/head'
import { BeatLoader } from 'react-spinners';
import Link from 'next/link'
import pornstarNameList from '../../../../JsonData/pornstarlist/alldata.json'
import {
    ThumbUpIcon, ClockIcon, FilmIcon, EyeIcon, PlusIcon, MinusIcon, CogIcon
} from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import Pagination from '../../../../components/Pagination';



function Index({ video_collection, pages, pornstarInformation }) {

    const router = useRouter();
    const { code, pornstarname } = router.query
    const [imageURL, setimage] = useState('')
    const currentPageNumberURL = '1'

    useEffect(() => {
        pornstarNameList.filter(pornstar => {
            if (pornstarname.toLowerCase() === pornstar.Name.toLowerCase().replace(/ /g, "+")) {
                setimage(pornstar.thumbnail)
            }
        })
    }, [])

    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'red'} />
            </div>
        )
    }

    function capitalizeFirstLetter(string) {
        console.log(string.charAt(0).toUpperCase() + string.slice(1));
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        <>


            <Head>
                <title>{`${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} Porn Videos - Chutlunds`}</title>
                <meta name="description"
                    content={`Check out the best porn videos, images, gifs and playlists from pornstar ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))}. Browse through the content she uploaded herself on her verified pornstar profile, only on Chutlunds.com. Subscribe to ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))}'s feed and add her as a friend. See ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} naked in an incredible selection of hardcore FREE sex movies.`} />
            </Head>

   


            <div className=''>

                <Header keyword={pornstarname.replace("+", " ")} pageNumber={currentPageNumberURL} code={code} />
            </div>
            <div>
                <div className=' flex font-semibold  items-center justify-start  md:ml-4 m-2 ' >

                    <img
                        className={`object-cover w-44 h-56    rounded `}
                        src={imageURL}
                        alt={pornstarname}
                        loading='lazy'
                    ></img>

                    <div className=' mx-4 font-inter flex flex-col mt-auto' >

                        <h2 className=' p-0.5  ' > {pornstarInformation.views}</h2>
                        <h2 className='p-0.5  ' > {pornstarInformation.videos}</h2>
                        <h2 className='p-0.5  ' > {pornstarInformation.age}</h2><h2 className='p-0.5  ' > {pornstarInformation.from}</h2>

                    </div>
                </div>
                <Videos data={video_collection} />
            </div>


            {/* PAGINATION */}
            <Pagination data={{ url: `/pornstar/${code}/${pornstarname}`, currentPageNumberURL: currentPageNumberURL, pages: pages, }} />







        </>
    )
}

export default Index


export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    code: '24y',
                    pornstarname: 'mercedes+ashley'
                }
            }
        ],
        fallback: true // false or 'blocking'
    };
}





export async function getStaticProps(context) {

    const { code, pornstarname } = context.params;

    var finalDataArray = []
    var pages = []
    var pornstarInformation = {}


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


        $('.i p span:nth-child(1)').each((i, el) => {

            const data = $(el).text()
            pornstarInformation['views'] = data
        })
        $('.i p span:nth-child(2)').each((i, el) => {

            const data = $(el).text()
            pornstarInformation['videos'] = data
        })
        $('.i p span:nth-child(3)').each((i, el) => {

            const data = $(el).text()
            pornstarInformation['age'] = data
        })
        $('.i p span:nth-child(4)').each((i, el) => {

            const data = $(el).text()
            pornstarInformation['from'] = data
        })


        $('.i p span:nth-child(5)').each((i, el) => {

            const data = $(el).text()
            pornstarInformation['ethinicity'] = data
        })
        $('.i p span:nth-child(6)').each((i, el) => {

            const data = $(el).text()
            pornstarInformation['haircolor'] = data
        })
        $('.i p span:nth-child(7)').each((i, el) => {

            const data = $(el).text()
            pornstarInformation['height'] = data
        })
        $('.i p span:nth-child(8)').each((i, el) => {

            const data = $(el).text()
            pornstarInformation['weight'] = data
        })




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

    await scrape(`https://spankbang.party/${code}/pornstar/${pornstarname}/?o=all`)


    return {
        props: {
            video_collection: finalDataArray,
            pages: pages,
            pornstarInformation: pornstarInformation,
        }
    }
}
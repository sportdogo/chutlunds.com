import cheerio from 'cheerio';
import { useRouter } from "next/router";
import Head from 'next/head';
import { BeatLoader } from 'react-spinners';
import Pagination from '../../../../components/Pagination';
import Header from '../../../../components/Pornstar/Header';
import Videos from "../../../../components/Videos";
import { PlusIcon } from '@heroicons/react/outline';
import { Scrape_Video_Item } from '@/config/Scrape_Video_Item';



function Index({ video_collection, pages, channel_name, channel_subscriber, channel_by, channel_imageUrl }) {



    const router = useRouter();
    const { code, channelname } = router.query
    const currentPageNumberURL = '1'



    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'#13274F'} />
            </div>
        )
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>


            <Head>
                <title>{`${capitalizeFirstLetter(channel_name.replace('+', " ").replace("+", " "))} Porn Videos - Chutlunds`}</title>
                <meta name="description"
                    content={`Check out the best porn videos, images, gifs and playlists from pornstar ${capitalizeFirstLetter(channel_name.replace('+', " ").replace("+", " "))}. Browse through the content she uploaded herself on her verified pornstar profile, only on Chutlunds.com. Subscribe to ${capitalizeFirstLetter(channel_name.replace('+', " ").replace("+", " "))}'s feed and add her as a friend. See ${capitalizeFirstLetter(channel_name.replace('+', " ").replace("+", " "))} naked in an incredible selection of hardcore FREE sex movies.`} />
            </Head>




            <div className=''>

                <Header keyword={channel_name.replace("+", " ")} pageNumber={currentPageNumberURL} code={code} />
            </div>
            <div>
                <div className=' flex font-semibold  items-center justify-start  md:ml-4 m-2 ' >

                    <img
                        className={`object-cover w-44 h-44    rounded-[15px] border-[1px] border-gray-200 `}
                        src={channel_imageUrl}
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
                <Videos data={video_collection} type="premium" />
            </div>


            {/* PAGINATION */}
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
                    channelname: 'kink+com'
                }
            }
        ],
        fallback: true // false or 'blocking'
    };
}





export async function getStaticProps(context) {

    const { code, channelname } = context.params;

    var finalDataArray = []
    var pages = []
    var channel_name = ""
    var channel_subscriber = ""
    var channel_by = ""
    let channel_imageUrl=""

    const scrape = async (url) => {



        const response = await fetch(url)
        const body = await response.text();
        const $ = cheerio.load(body)

        finalDataArray = Scrape_Video_Item($)


        let tempArray = []
        $('.pagination ul li').each((i, el) => {
            const data = $(el).text()
            tempArray.push(data)

        })
        if (tempArray.length !== 0) {
            pages.push('1')
            pages.push(tempArray[tempArray.length - 2])
        }



        $('.channel-info h1').each((i, el) => {
            channel_name = $(el).text().replace("Channel", "")
        })
        $('span em').each((i, el) => {
            channel_subscriber = $(el).text()
        })

        const secondSpan = $('.i span').eq(1);
        channel_by = secondSpan.find("a").text()


         channel_imageUrl =  $('.top .i .p img').attr('src');

    }

    await scrape(`https://spankbang.party/${code}/channel/${channelname}/?o=long`)

    return {
        props: {
            video_collection: finalDataArray,
            pages: pages,
            channel_name: channel_name,
            channel_subscriber: channel_subscriber,
            channel_by: channel_by,
            channel_imageUrl:channel_imageUrl.replace(".com",".party"),
            channel_image: channelname
        }
    }
}




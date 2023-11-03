import { useRouter } from "next/router";
import Sidebar from '../../../../../components/Sidebar';
import Videos from "../../../../../components/Videos";
import Header from '../../../../../components/Pornstar/Header'
import Head from 'next/head'
import { BeatLoader } from 'react-spinners';
import Link from 'next/link'
import Pagination from '../../../../../components/Pagination';
import { scrapeVideos } from '../../../../../config/spangbang';




function Index({ video_collection, pages }) {

    const router = useRouter();
    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'red'} />
            </div>
        )
    }

    const { code, pornstarname, page } = router.query
    const currentPageNumberURL = page

    function capitalizeFirstLetter(string) {
        console.log(string.charAt(0).toUpperCase() + string.slice(1));
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        <>

            <Head>
                <title>{`${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} Porn Videos - ${currentPageNumberURL}`}</title>
                   <meta name="description"
                    content={`Check out the best porn videos, images, gifs and playlists from pornstar ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))}. Browse through the content she uploaded herself on her verified pornstar profile, only on Chutlunds.com. Subscribe to ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))}'s feed and add her as a friend. See ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} naked in an incredible selection of hardcore FREE sex movies.`} />
            </Head>


            <Header keyword={pornstarname.replace('+', ' ')} pageNumber={currentPageNumberURL} />
            <div className="flex">
                <Sidebar />
                <Videos data={video_collection} />

            </div>

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
                    pornstarname: 'mercedes+ashley',
                    page: '1'
                }
            }
        ],
        fallback: true // false or 'blocking'
    };
}



export async function getStaticProps(context) {



    const { code, pornstarname, page } = context.params;

    var finalDataArray = []
    var pages = []

    const obj = await scrapeVideos(`https://spankbang.party/${code}/pornstar/${pornstarname}/page/${page}/?o=all`)
    finalDataArray = obj.finalDataArray
    pages = obj.pages
    pages[0] = page;

    console.log(`https://spankbang.party/${code}/pornstar/${pornstarname}/page/${page}/?o=all`)


    return {
        props: {
            video_collection: finalDataArray,
            pages: pages
        }
    }


}
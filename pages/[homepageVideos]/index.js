import { useRouter } from "next/router";
import Sidebar from '../../components/Sidebar';
import Videos from "../../components/Videos";
import Header from '../../components/searchPage/Header'
import Head from 'next/head'
import { BeatLoader } from 'react-spinners';
import Pagination from '../../components/Pagination';
import { scrapeVideos } from '../../config/spangbang';



function Category({ video_collection, pages }) {

    const router = useRouter();
    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'red'} />
            </div>
        )
    }

    const { homepageVideos } = router.query
    const currentPageNumberURL = '1'

    function capitalizeFirstLetter(string) {
        console.log(string.charAt(0).toUpperCase() + string.slice(1));
        return string.charAt(0).toUpperCase() + string.slice(1);
      }


    return (
        <>
            <Head>
                <title>{`${capitalizeFirstLetter(homepageVideos)} Porn Videos`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

            </Head>
            <Header keyword={homepageVideos} pageNumber={currentPageNumberURL} />
            <div className="flex">
                <Sidebar />
                <Videos data={video_collection} />

            </div>

            {/* PAGINATION */}
            <Pagination data={{ url: `/${homepageVideos}`, currentPageNumberURL: currentPageNumberURL, pages: pages, }} />

        </>
    )
}

export default Category

// export async function getStaticPaths() {


//     return {

//         paths: [
//             { params: { homepageVideos: 'trending' } },
//             { params: { homepageVideos: 'upcoming' } },
//             { params: { homepageVideos: 'new' } },
//             { params: { homepageVideos: 'popular' } },

//         ],
//         fallback: true // false or 'blocking'
//     };
// }


export async function getServerSideProps(context) {



    const { homepageVideos } = context.params;

    var finalDataArray = []
    var pages = []


    if (homepageVideos === 'trending') {

        const obj = await scrapeVideos(`https://spankbang.party/trending_videos/`)
        finalDataArray = obj.finalDataArray
        pages = obj.pages

    }
    else if (homepageVideos === 'upcoming') {
        const obj = await scrapeVideos(`https://spankbang.party/upcoming/`)
        finalDataArray = obj.finalDataArray
        pages = obj.pages

    }
    else if (homepageVideos === 'popular') {
        const obj = await scrapeVideos(`https://spankbang.party/most_popular/?period=week`)
        finalDataArray = obj.finalDataArray
        pages = obj.pages

    }
    else {
        const obj = await scrapeVideos(`https://spankbang.party/new_videos/`)
        finalDataArray = obj.finalDataArray
        pages = obj.pages

    }




    return {
        props: {
            video_collection: finalDataArray,
            pages: pages
        }
    }


}
import { useRouter } from "next/router";
import Sidebar from '../../../../components/Sidebar';
import Videos from "../../../../components/Videos";
import Header from '../../../../components/searchPage/Header'
import RecommendedAds from '../../../../components/Ads/RecommendedAds';
import Head from 'next/head'
import { BeatLoader } from 'react-spinners';
import Link from 'next/link'
import Pagination from '../../../../components/Pagination';
import { scrapeVideos } from '../../../../config/spangbang';




function Category({ video_collection, pages }) {

    const router = useRouter();
    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'red'} />
            </div>
        )
    }

    const { category, page } = router.query
    const currentPageNumberURL = page

    function capitalizeFirstLetter(string) {
        console.log(string.charAt(0).toUpperCase() + string.slice(1));
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    return (
        <>
            <Head>
                <title>{capitalizeFirstLetter(category)} sex videos - Free download | Chutlunds | Page {page}</title>
                <meta name="description" content={`Watch free collection of ${capitalizeFirstLetter(category)} sex videos, ${category} porn videos, latest ${category} videos in high quality only on Chutlunds.`} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            </Head>

            <Header keyword={category} pageNumber={currentPageNumberURL} />
            <div className="flex">
                <Sidebar />
                <Videos data={video_collection} />

            </div>




            {/* PAGINATION */}
            <Pagination data={{ url: `/category/${category}`, currentPageNumberURL: currentPageNumberURL, pages: pages, }} />


            <RecommendedAds />
        </>
    )
}

export default Category



export async function getStaticPaths() {


    return {

        paths: [{ params: { category: 'vr', page: '1' } }],
        fallback: true // false or 'blocking'
    };
}



export async function getStaticProps(context) {

    const { category, page } = context.params;
    var finalDataArray = []
    var pages = []




    const obj = await scrapeVideos(`https://spankbang.party/s/${category}/${page}/?o=all`)
    finalDataArray = obj.finalDataArray
    pages = obj.pages
    console.log(`https://spankbang.party/s/${category}/${page}/?o=all`)




    return {
        props: {
            video_collection: finalDataArray,
            pages: pages
        }
    }


}
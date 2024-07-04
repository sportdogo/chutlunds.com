// import cheerio from 'cheerio';
import { useRouter } from "next/router";
// 
import Head from 'next/head';
import { BeatLoader } from 'react-spinners';
import Pagination from "../../../components/Pagination";
import Sidebar from "../../../components/Sidebar";
import Videos from "../../../components/Videos";
import Header from '../../../components/searchPage/Header';
import { scrapeVideos } from "../../../config/spangbang";



function Category({ video_collection, pages }) {


  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="flex justify-center mx-auto mt-10 ">
        <BeatLoader loading size={25} color={'red'} />
      </div>
    )
  }

  const { category } = router.query
  const currentPageNumberURL = '1'

  function capitalizeFirstLetter(string) {
    console.log(string.charAt(0).toUpperCase() + string.slice(1));
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>

      <Head>
        <title>{capitalizeFirstLetter(category)} sex videos | FuckVideo</title>
        <meta name="description" content={`Watch free collection of ${capitalizeFirstLetter(category)} sex videos, ${category} porn videos, latest ${category} videos in high quality only on FuckVideo.`} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>

   

      <Header keyword={category} pageNumber={currentPageNumberURL} />
      <div className="flex">
        <Sidebar />
        <Videos data={video_collection} />

      </div>



      {/* PAGINATION */}
      <Pagination data={{ url: `/category/${category}`, currentPageNumberURL: currentPageNumberURL, pages: pages, }} />

    </>
  )
}

export default Category

export async function getStaticPaths() {


  return {
    paths: [{ params: { category: 'creampie' } }],
    fallback: true // false or 'blocking'
  };
}



export async function getStaticProps(context) {



  const { category } = context.params;


  var finalDataArray = []
  var pages = []



  console.log(`https://spankbang.party/s/${category}/?o=all`)
  const obj = await scrapeVideos(`https://spankbang.party/s/${category}/?o=all`)
  finalDataArray = obj.finalDataArray
  pages = obj.pages



  return {
    props: {
      video_collection: finalDataArray,
      pages: pages
    }
  }


}



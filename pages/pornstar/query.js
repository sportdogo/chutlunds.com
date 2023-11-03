import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import Videos from "../../components/Videos";
import Header from '../../components/Pornstar/Header'
import Link from 'next/link'
import { BeatLoader } from 'react-spinners'
import { useContext, useState } from 'react';
import videosContext from '../../context/videos/videosContext';
import Router from 'next/router'
import Head from 'next/head'
import Pagination from '../../components/Pagination';
import PaginationQuery from '../../components/PaginationQuery';
import { scrapeVideos } from '../../config/spangbang';

function Pornstar({ video_collection, pages, query, keyword, currentPage, filteredObjsArray }) {



  const router = useRouter();
  const currentPageNumberURL = currentPage

  function capitalizeFirstLetter(string) {
    console.log(string.charAt(0).toUpperCase() + string.slice(1));
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (

    <>


      <Head>
        <title>{`${capitalizeFirstLetter(keyword.replace('+', " ").replace("+", " "))} Porn Videos - Chutlunds`}</title>
        <meta name="description"
          content={`Check out the best porn videos, images, gifs and playlists from pornstar ${capitalizeFirstLetter(keyword.replace('+', " ").replace("+", " "))}. Browse through the content she uploaded herself on her verified pornstar profile, only on Chutlunds.com. Subscribe to ${capitalizeFirstLetter(keyword.replace('+', " ").replace("+", " "))}'s feed and add her as a friend. See ${capitalizeFirstLetter(keyword.replace('+', " ").replace("+", " "))} naked in an incredible selection of hardcore FREE sex movies.`} />
      </Head>




      <div>

        <Header keyword={keyword} pageNumber={currentPageNumberURL} filteredObjsArrayProps={filteredObjsArray} />
        <div className="flex">
          <Sidebar />
          <Videos data={video_collection} />

        </div>


        {/* PAGINATION */}
        <PaginationQuery data={{ keyword: keyword, pathname: `/category/query/`, currentPageNumberURL: currentPageNumberURL, pages: pages, filteredObjsArray: filteredObjsArray }} />

      </div>


    </>
  )
}

export default Pornstar




export async function getServerSideProps(context) {
  const { pornstar, page, code } = context.query;
  var finalDataArray = []
  var pages = []


  const { o, q, d, p, } = context.query;

  var filteredObjsArray = []
  var completeSearch = ''
  if (o) {
    filteredObjsArray.push(`o=${o}`)
  } else {
    // This is by default required if not any filter is present accoring to new spangbang update
    filteredObjsArray.push(`o=all`)
  }
  if (q) {
    filteredObjsArray.push(`q=${q}`)

  }
  if (d) {
    filteredObjsArray.push(`d=${d}`)
  }
  if (p) {
    filteredObjsArray.push(`p=${p}`)
  }

  if (page > 1) {
    for (let index = 0; index < filteredObjsArray.length; index++) {
      filteredObjsArray[index].replace('o=', '');

    }
  }

  if (filteredObjsArray.length === 1) {
    completeSearch = filteredObjsArray[0]
  }
  if (filteredObjsArray.length === 2) {
    completeSearch = `${filteredObjsArray[0]}&${filteredObjsArray[1]}`
  }
  if (filteredObjsArray.length === 3) {
    completeSearch = `${filteredObjsArray[0]}&${filteredObjsArray[1]}&${filteredObjsArray[2]}`
  }
  if (filteredObjsArray.length === 4) {
    completeSearch = `${filteredObjsArray[0]}&${filteredObjsArray[1]}&${filteredObjsArray[2]}&${filteredObjsArray[3]}`
  }



  if (filteredObjsArray.length > 0) {

    const obj = await scrapeVideos(`https://spankbang.party/${code}/pornstar/${pornstar.replace(' ', '+').toLowerCase()}/${page}/?${completeSearch}`)
    finalDataArray = obj.finalDataArray
    pages = obj.pages
    pages[0] = page;
    console.log(`https://spankbang.party/${code}/pornstar/${pornstar.replace(' ', '+').toLowerCase()}/${page}/?${completeSearch}`);
  }
  else {

    const obj = await scrapeVideos(`https://spankbang.party/${code}/pornstar/${pornstar.replace(' ', '+').toLowerCase()}/${page}/?o=all`)
    finalDataArray = obj.finalDataArray
    pages = obj.pages
    pages[0] = page;

    console.log(`https://spankbang.party/${code}/pornstar/${pornstar.replace(' ', '+').toLowerCase()}/${page}/?o=all`);


  }

  return {
    props: {
      video_collection: finalDataArray,
      pages: pages,
      query: filteredObjsArray,
      keyword: pornstar,
      currentPage: page,
      filteredObjsArray: filteredObjsArray
    }
  }


}
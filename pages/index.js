import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';

import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from 'next/router';
import BannerAds from '../components/Ads/BannerAds';
import Outstreams from '../components/Ads/Outstream';
import HomepageTitle from '../components/HomepageTitle';
import Sidebar from '../components/Sidebar';
import Videos from '../components/Videos';
import { getLanguge } from '../config/getLanguge';
import videosContext from '../context/videos/videosContext';
// import { getHomePageVideos } from '../config/getHomepageVideos';
import { updateCountry } from '../config/firebase/lib';

import { getViewTypeFromCookie, setViewTypeCookie } from '../config/utils';
import Pornstar_slider from '../components/pornstar_slider';
import Channels_slider from '../components/channels_slider';
import Category_slider from '../components/category_slider';


export default function Home({ video_collection, trendingChannels, tags, trendingCategories, trendingPornstars }) {


  const { currentLocation, setcurrentLocation,viewType, setViewType } = useContext(videosContext);
  const [countryVideos, setcountryVideos] = useState([]);
  const [countryLanguage, setcountryLanguage] = useState('');

  const router = useRouter()


  async function fetchVideos(data) {
    const lang = getLanguge(data.countryName)

    setcountryLanguage(lang)

    //value is languge of country
    let url = `https://spankbang.party/s/${lang.toLowerCase().trim()}/?o=trending`


    const rawResponse = await fetch('/api/spangbang/getvideos', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });
    const content = await rawResponse.json();
    setcountryVideos(shuffle(content.finalDataArray))

  }

  async function fetchLocation() {


    const location_localstorage = localStorage.getItem("location")
    if (location_localstorage !== null) {
      const parsedLocation = JSON.parse(location_localstorage)
      setcurrentLocation(parsedLocation)
      countryUpdated_DB(parsedLocation.countryName)
      await fetchVideos(parsedLocation)

    } else {
      try {
        const response = await fetch('https://api.db-ip.com/v2/free/self')
        const data = await response.json();

        setcurrentLocation(data)
        await fetchVideos(data)
        await countryUpdated_DB(data.countryName)
        localStorage.setItem("location", JSON.stringify(data))
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function countryUpdated_DB(country) {
    //Check the country updated in DB or not
    const countryUpdated_DB = getCookie('countryUpdated_DB')
    const email = getCookie('email')
    const accountType = getCookie('account')
    if (typeof countryUpdated_DB !== 'undefined' && typeof email !== 'undefined' && accountType !== 'credential') {
      if (countryUpdated_DB) {
        // return 

      }
      await updateCountry(email.trim(), country)
    }
  }


  useEffect(() => {

    let videoRoute = getCookie("videoRoute");
    if (typeof videoRoute !== 'undefined') {
      deleteCookie('videoRoute')
      router.push(videoRoute)
    }

    fetchLocation()

    setViewType(getViewTypeFromCookie());


  }, []);

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

  const toggleViewType = () => {
    const newViewType = viewType === 'grid' ? 'horizontal' : 'grid';
    setViewTypeCookie(newViewType);
    setViewType(newViewType);
  };

  return (
    <div className=" ">


      <Head>
        <title>Chutlunds: Free Porn Videos and 4K Sex Movies</title>
        <meta name="description" content="Chutlunds is the hottest free porn site in the world! Cum like never before and explore millions of fresh and free porn videos! Get lit on Chutlunds!" />

        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="msvalidate.01" content="8A6530C78E46DD0011117B2ECB618480" />

      </Head>


      <div className='flex justify-between items-center m-4 md:hidden'>
        <h2 className='text-[20px]  font-semibold  font-inter'>Trending Channels</h2>
        <img
          className='h-[20px] w-[20px] cursor-pointer fill-blue-500'
          src={viewType === 'grid' ? './grid.png' : './horizontal.png'}
          onClick={toggleViewType}
          alt="Toggle View"
        />
      </div>
      <Channels_slider trendingChannels={trendingChannels} />

      <div className="w-full overflow-x-auto whitespace-nowrap py-2  scrollbar-hide md:hidden select-none">
        {tags.map((tag, index) => (
          <a key={tag.tag} href={`/search/${tag.tag.trim()}`} className="bg-theme text-white px-3 py-1.5 rounded-lg m-1 inline-block text-sm">

            {tag.tag}
          </a>
        ))}
      </div>


      <main className="flex-row flex  mt-1 md:mt-3 md:space-x-3 space-x-2">
        <Sidebar />
        <div className='w-full'>


          <BannerAds />
          <Outstreams />


          {countryVideos.length !== 0 &&
            <>
              <HomepageTitle title={`Popular Porn Videos in ${currentLocation.countryCode}`} country={currentLocation.countryName} language={countryLanguage} />
              <Videos data={shuffle(countryVideos).slice(0, 12)} />
            </>
          }


          <HomepageTitle title={video_collection[0].videosGroupName} />
          <Videos data={video_collection[0].finalDataArray} />

          <h2 className='text-[20px] md:hidden font-semibold m-4 font-inter'>Trending Pornstars</h2>
          <Pornstar_slider trendingPornstars={trendingPornstars} />


          <HomepageTitle title={video_collection[1].videosGroupName} />
          <Videos data={video_collection[1].finalDataArray} />

          <h2 className='text-[20px] md:hidden font-semibold m-4 font-inter'>Trending Categories</h2>
          <Category_slider trendingCategories={trendingCategories.slice(1)} />



          <HomepageTitle title={video_collection[2].videosGroupName} />
          <Videos data={video_collection[2].finalDataArray} />

          <HomepageTitle title={video_collection[3].videosGroupName} />
          <Videos data={video_collection[3].finalDataArray} />

          <HomepageTitle title={video_collection[4].videosGroupName} />
          <Videos data={video_collection[4].finalDataArray} />

          <HomepageTitle title={video_collection[5].videosGroupName} />
          <Videos data={video_collection[5].finalDataArray} />



        </div>
      </main>

      <footer >

        <a className='' href="https://www.fuckvideo.live/">.</a>
        <a className='' href="https://www.chutlunds.com/">.</a>
        <a className='' href="https://www.desikahaniya.in/">.</a>
      </footer>
    </div>
  )
}


export async function getStaticProps({ req, res }) {

  const parcelData = { href: "https://spankbang.party/" }

  const API_URL = `${process.env.BACKEND_URL}getHomePageVideos`;

  const rawResponse = await fetch(API_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(parcelData),
  });
  const ress = await rawResponse.json();;


  return {
    props: {
      video_collection: ress.result.finalDataArray_Array,
      trendingChannels: ress.result.trendingChannels,
      tags: ress.result.tags,
      trendingCategories: ress.result.trendingCategories,
      trendingPornstars: ress.result.trendingPornstars
    }
  }


}

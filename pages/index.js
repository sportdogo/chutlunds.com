import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';

import cheerio from 'cheerio';
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from 'next/router';
import fetchdata from 'node-fetch';
import React from 'react';
import MultiformatAds from '../components/Ads/MultiFormatAds';
import Outstreams from '../components/Ads/Outstream';
import PopunderAds from '../components/Ads/Popunder_Mob';
import HomepageTitle from '../components/HomepageTitle';
import Sidebar from '../components/Sidebar';
import Videos from '../components/Videos';
import Category_slider from '../components/category_slider';
import { getLanguge } from '../config/getLanguge';
import { scrapeVideos } from '../config/spangbang';
import videosContext from '../context/videos/videosContext';

export default function Home({ video_collection, pages, desiVideosDataArray, desiMmsVideoArray }) {


  const { currentLocation, setcurrentLocation } = useContext(videosContext);
  const [countryVideos, setcountryVideos] = useState([]);
  const [countryLanguage, setcountryLanguage] = useState('');

  const router = useRouter()


  async function fetchVideos(data) {
    const lang = getLanguge(data.countryName)
    setcountryLanguage(lang)

    //value is languge of country
    let url = `https://spankbang.party/s/${lang.toLowerCase().trim()}/`

    const rawResponse = await fetch('/api/spangbang', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(url)
    });
    const content = await rawResponse.json();

    setcountryVideos(content.data.finalDataArray)
  }

  async function fetchLocation() {


    const location_localstorage = localStorage.getItem("location")
    if (location_localstorage !== null) {
      const parsedLoaction = JSON.parse(location_localstorage)
      setcurrentLocation(parsedLoaction)
      countryUpdated_DB(parsedLoaction.countryName)
      await fetchVideos(parsedLoaction)

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
      const parcelData = { email: email.trim(), country: country }
      const rawResponse = await fetch(`${process.env.FRONTEND_URL}api/login/updateCountry`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(parcelData),
      });

      const res = await rawResponse.json();
      if (res.sucess) {
        setCookie('countryUpdated_DB', true, { maxAge: 900000 })
      }
      console.log(res);
    }
  }


  useEffect(() => {

    let videoRoute = getCookie("videoRoute");
    if (typeof videoRoute !== 'undefined') {
      deleteCookie('videoRoute')
      router.push(videoRoute)
    }

    fetchLocation()

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

  return (
    <div className=" ">


      <Head>
        <title>Chutlunds: Free Porn Videos and 4K Sex Movies</title>
        <meta name="description" content="Chutlunds is the hottest free porn site in the world! Cum like never before and explore millions of fresh and free porn videos! Get lit on Chutlunds!" />

        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="msvalidate.01" content="8A6530C78E46DD0011117B2ECB618480" />

      </Head>


      <Category_slider />

      <PopunderAds />

      <main className="flex-row flex  mt-1 md:mt-3 md:space-x-3 space-x-2">
        <Sidebar />
        <div>
          {/* <h1 className="lg:mb-3 mb-2 lg:text-lg text-center lg:text-left text-[15px] md:text-lg border-t-[0.5px] md:border-0 border-slate-300  shadow-xl px-1 pb-2 pt-2 md:pt-0 lg:py-0 font-inter">
            Free desi sex videos, desi mms, Indian sex videos, desi porn videos, devar bhabhi ki chudai, aunty ki chudai collection. full hd indian sex videos download free.
          </h1> */}

          {/* 

          {countryVideos.length !== 0 &&
            <>
              <HomepageTitle title={`Popular Porn Videos in ${currentLocation.countryCode}`} country={currentLocation.countryName} language={countryLanguage} />
              <Videos data={shuffle(countryVideos).slice(0, 12)} />
            </>
          }

          <HomepageTitle title='Desi Sex Videos' />
          <Videos data={shuffle(desiVideosDataArray).slice(0, 12)} />
          <HomepageTitle title='Desi MMS' />
          <Videos data={shuffle(desiMmsVideoArray).slice(0, 12)} /> */}

          <HomepageTitle title='Popular Porn Videos' />
          <Videos data={video_collection[2].slice(0, 12)} />
          <HomepageTitle title='Trending Porn Videos' />
          <Videos data={video_collection[0].slice(0, 12)} />
          <HomepageTitle title='Upcoming Porn Videos' />
          <Videos data={video_collection[1]} />
          <HomepageTitle title='New Porn Videos' />
          <Videos data={video_collection[3]} />

        </div>
      </main>

      <footer >
        <MultiformatAds />
        <Outstreams />
        <a className='' href="https://www.fuckvideo.live/">.</a>
          <a className='' href="https://www.chutlunds.com/">.</a>
          <a className='' href="https://www.desikahaniya.in/">.</a>
      </footer>
    </div>
  )
}


export async function getStaticProps({ req, res }) {



  var finalDataArray_Arrar = []
  var finalDataArray = []

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





    $('.videos .video-list.video-rotate').each((i, el) => {

      const select = cheerio.load(el)

      select('.video-item picture img').each((i, el) => {

        const data = $(el).attr("data-src")
        thumbnailArray.push(data)


      })

      select('.video-item picture img').each((i, el) => {

        const data = $(el).attr("alt")
        TitleArray.push(data)


      })

      select('.video-item .l').each((i, el) => {

        const data = $(el).text()
        durationArray.push(data)
      })



      select('.video-item .stats').each((i, el) => {

        const text = $(el).text()
        const likePercentage = text.substring(text.indexOf("%") - 4, text.indexOf("%") + 1)
        const views = text.substring(0, text.indexOf("%") - 4)

        likedPercentArray.push(likePercentage.trim())
        viewsArray.push(views.trim())

      })


      select('.video-item picture img').each((i, el) => {

        const data = $(el).attr("data-preview")
        previewVideoArray.push(data)
      })



      select('.video-item').each((i, el) => {

        const data = $(el).children().eq(1).attr("href")
        if (data) {
          hrefArray.push(`https://spankbang.com${data}`)
        }
      })



      for (let index = 0; index < thumbnailArray.length; index++) {

        if (hrefArray[index] != undefined && previewVideoArray[index] != undefined && !thumbnailArray[index].includes("//assets.sb-cdate.com")) {

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

      if (finalDataArray.length > 2) {
        finalDataArray_Arrar.push(finalDataArray)
      }

      thumbnailArray = []
      TitleArray = []
      durationArray = []
      likedPercentArray = []
      viewsArray = []
      previewVideoArray = []
      hrefArray = []

      finalDataArray = []
    })


  }


  await scrape(`https://spankbang.party/`)


  var desiVideosDataArray = []
  const obj = await scrapeVideos(`https://spankbang.party/s/desi%20sex%20videos/?o=all`)
  desiVideosDataArray = obj.finalDataArray

  var desiMmsVideoArray = []
  const obj2 = await scrapeVideos(`https://spankbang.party/s/desi%20mms/?o=all`)
  desiMmsVideoArray = obj2.finalDataArray



  return {
    props: {
      video_collection: finalDataArray_Arrar,
      desiVideosDataArray: desiVideosDataArray,
      desiMmsVideoArray: desiMmsVideoArray
    }
  }


}

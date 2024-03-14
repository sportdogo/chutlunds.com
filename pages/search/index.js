import React from 'react'
import cheerio from 'cheerio';
import { useState, useRef, } from 'react';
import fetchdata from 'node-fetch';
import Link from 'next/link'
import { useRouter } from 'next/router';
import Head from 'next/head'
import Outstreams from '../../components/Ads/Outstream';
import Popunder from '../../components/Ads/Popunder';

function Search({ tags }) {


    const searchInputref = useRef('')
    const router = useRouter()

    const [searchKey, setsearchKey] = useState('')
    const [tagsArray, settagsArray] = useState(tags)


    function similarity(s1, s2) {
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength == 0) {
            return 1.0;
        }
        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    function editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        var costs = new Array();
        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        var newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }

    const searchTag = (e) => {


        if (e.target.value.length <= 1) {
            settagsArray(tags)
            return
        }

        var filteredTagArray = tags.filter(keyword => {
            if (keyword.trim().toLowerCase().includes(e.target.value.trim().toLowerCase())) {
                console.log(e.target.value.length);
                return keyword
            }
        })

        settagsArray(filteredTagArray)

    }


    return (
        <div className=" ">

            <Head>
                <title>Most popular and trending porn searches- Chutlunds</title>
                <meta name="description"
                    content="Most popular and trending porn searches - HD porn videos and adult movies- Chutlunds" />
            </Head>

            <Outstreams />
            <Popunder />


            <div className={`my-2  transition ease-in-out delay-150 mt-2 `}>

                <form className='w-full sm:w-[400px] lg:w-[600px] flex items-center' >

                    <input onChange={searchTag} className='shadow-lg mr-3 flex-grow   outline-none text-inter text-sm sm:text-md  border-gray-300 rounded pl-2  h-[35px]' type="text" placeholder='Search your tag...' />
                    {/* 
                    <button type="submit" className='bg-red-800  hover:bg-red-900 text-white text-sm p-2 pl-4 pr-4 m-1 rounded '>Search</button> */}

                </form>
            </div>

            <div className='flex items-center space-x-2 mt-4'>
                <img src='/login/label.png' className='h-[25px] w-[25px]' />
                <h1 className='text-lg font-bold md:text-2xl font-poppins'> All Tags</h1>
            </div>

            <div className='my-2 flex flex-wrap '>
                {tagsArray.map(keyword => {
                    return (
                        <Link key={keyword} href={`/search/${keyword.trim().replace(/ /g, "+")}`}>
                            <div className='my-1 mr-1.5 lg:mr-3 p-1 px-2 text-xs text-black bg-gray-300 rounded font-semibold hover:bg-theme  font-poppins hover:text-white md:text-lg  '>
                                {keyword}
                            </div>
                        </Link>
                    )
                })}
            </div>




        </div>
    )
}

export default Search



export async function getServerSideProps() {


    var TrendingKeywords = []
    var PopularKeywords = []
    var tags = []





    const scrape = async (url) => {



        const response = await fetchdata(url)
        const body = await response.text();
        const $ = cheerio.load(body)





        $('.list li a').each((i, el) => {

            const data = $(el).text()
            tags.push(data)

        })

    }


    await scrape(`https://spankbang.party/tags`)





    return {
        props: {
            TrendingKeywords: TrendingKeywords,
            PopularKeywords: PopularKeywords,
            tags: tags
        }
    }


}
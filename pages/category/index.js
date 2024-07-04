import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import jsonData from "../../JsonData/categoryImages/data.json";

import Head from 'next/head';
import Outstreams from '../../components/Ads/Outstream';
import PopunderAds from '../../components/Ads/Popunder';


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
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

function Index() {

    const router = useRouter();

    useEffect( () => {
        let index = 0

        async function downloadImage(url, name) {
            await fetch(url, {
                method: "GET",
                headers: {}
            })
                .then(response => {
                    response.arrayBuffer().then(function (buffer) {
                        const url = window.URL.createObjectURL(new Blob([buffer]));
                        const link = document.createElement("a");
                        link.href = url;
                        link.setAttribute("download", name); //or any other extension
                        document.body.appendChild(link);
                        link.click();


                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }


        // const myInterval = setInterval(() => {
        //     console.log(index);
        //     downloadImage(jsonData[index].url, jsonData[index].name)
        //     if (index === jsonData.length - 1) {
        //         clearInterval(myInterval);
        //     }
        //     index = index + 1
        // }, 1000);

    }, []);




    return (

        <div className="">
            <Head>
                <title>FuckVideo Categories: Find Your Favorite Free Hardcore Porn Videos</title>
                <meta name="description" content="FuckVideo has the best hardcore porn videos. Discover the newest XXX to stream in your favorite sex category. See the hottest amateurs and pornstars in action." />
            </Head>


            <div className='flex items-center py-2 my-1 justify-between  rounded-lg'>
                <h2 className='text-center lg:text-left  flex-grow text-3xl font-Dmsans'>Porn Categories</h2>
            </div>
            {/* <h1 className="text-center lg:text-left text-sm md:text-lg shadow-xl py-2 my-1 font-inter">
                Collections of free desi sex videos, desi mms, Indian sex videos, desi porn videos, devar bhabhi ki chudai, aunty ki chudai collection. full hd indian sex videos download free.
            </h1> */}

            <Outstreams />
            <PopunderAds />

            <div className={`grid grid-cols-3 py-3 sm:grid-cols-3 gap-2 md:gap-3 lg:gap-4  md:grid-cols-4 lg:grid-cols-5`}>
                {shuffle(jsonData).map(category => {
                    return (
                        <Link key={category.name} href={`/category/${category.name.toLowerCase().trim().substring(0, category.name.indexOf('.png'))}`}>
                                <div className='  relative hover:scale-105 transform transition duration-150 rounded   aspect-box  ' >
                                    <img
                                        className='object-cover w-full'
                                        alt={category.name}
                                        src={`${process.env.CLOUDFLARE_STORAGE}category_images/${category.name}`}
                                        loading="lazy"
                                    ></img>
                                    <h2 className='font-inter rounded-b absolute text-sm sm:text-lg  px-1 bottom-0 w-full text-center  z-10 text-white bg-transparent bg-black bg-opacity-50'>{category.name.charAt(0).toUpperCase() + category.name.substring(0, category.name.indexOf('.png')).substring(1)}</h2>
                                </div>
                        </Link>
                        // items[i].charAt(0).toUpperCase() + items[i].substring(1);


                    )
                })}

            </div>

        </div>
    )
}


export default Index



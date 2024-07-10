import React from 'react'
import Link from 'next/link'


function Category_slider(trendingChannels) {


    return (
        <div className='flex items-start space-x-1 text-color overflow-x-scroll scrollbar-hide md:hidden my-4'>

            {trendingChannels.trendingChannels.map(category => {
                // extract code and channelname for href 
                const code = category.href.substring(category.href.indexOf('/channel') - 2, category.href.indexOf('/channel')).toLowerCase();
                console.log(`/channels/${code}/${category.channelName.replace(/ /g, "_").toLowerCase()}`);

                return (
                    <Link href={`/channels/${code}/${category.channelName.replace(/ /g, "_").toLowerCase()}`} key={category.imageUrl} >
                        <div className='flex flex-col justify-center items-center mx-1'>
                            <div className='w-[90px]'>
                                <img className='shadow-md rounded-full object-cover aspect-square' src={category.imageUrl} loading="lazy"></img>
                            </div>
                            <h2 className='text-xs text-center font-poppins text-gray-600 font-semibold mt-1 whitespace-nowrap'>{category.channelName.toUpperCase()}</h2>
                        </div>
                    </Link>
                )
            })}

        </div>
    )
}

export default Category_slider
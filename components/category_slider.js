import React from 'react'
import Link from 'next/link'
import jsonData from "../JsonData/categoryImages/data.json"


function Category_slider() {




    // Used like so
    var array = jsonData;

    return (
        <div className='flex items-start space-x-1 text-color overflow-x-scroll scrollbar-hide md:hidden mt-4'>

            {array.map(category => {
                return (
                    <Link href={`/category/${category.name.substring(0, category.name.indexOf('.png')).toLowerCase()}`} key={category.name} >
                        <div className='flex flex-col justify-center items-center mx-1'>
                            <div className='w-[90px]'>
                                <img className='shadow-md rounded-full object-cover aspect-square'   src={`./category_images/${category.name}`} alt={category.name.substring(0, category.name.indexOf('.png')).toUpperCase()} loading="lazy"></img>
                            </div>
                            <h2 className='text-xs text-center font-poppins text-gray-600 font-semibold mt-1 whitespace-nowrap'>{category.name.substring(0, category.name.indexOf('.png')).toUpperCase()}</h2>
                        </div>
                    </Link>
                )
            })}

        </div>
    )
}

export default Category_slider
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { SearchIcon, ArrowRightIcon, CogIcon, ClockIcon, XCircleIcon, CalendarIcon } from '@heroicons/react/solid'
import { FilterIcon } from '@heroicons/react/outline'
import Link from 'next/link'

import { useContext } from 'react'
import videosContext from '../../context/videos/videosContext'
import Router from 'next/router'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header({ keyword, pageNumber, filteredObjsArrayProps, code }) {

    const context = useContext(videosContext);
    const { setSpinner, } = context;






    // This object is to display whats stuffs are filtered 
    const Final_filteredArray = []

    var filter_isPresent = 'All'
    var quality_isPresent = 'All'
    var duration_isPresent = 'All'
    var date_isPresent = 'All'

    if (filteredObjsArrayProps) {

        for (let index = 0; index < filteredObjsArrayProps.length; index++) {

            if (filteredObjsArrayProps[index].includes("o=")) {



                if (filteredObjsArrayProps[index].includes('new')) {
                    filter_isPresent = 'New'
                }

                if (filteredObjsArrayProps[index].includes('top')) {

                    filter_isPresent = 'Popular'
                }
                if (filteredObjsArrayProps[index].includes('long')) {

                    filter_isPresent = 'Long'
                }
                if (filteredObjsArrayProps[index].includes('trending')) {

                    filter_isPresent = 'Trending'
                }

                if (!filteredObjsArrayProps[index].includes('all')) {
                    Final_filteredArray.push(filter_isPresent)
                }
            }

            if (filteredObjsArrayProps[index].includes("q=")) {
                if (filteredObjsArrayProps[index].includes('hd')) {
                    quality_isPresent = '720p'
                }
                if (filteredObjsArrayProps[index].includes('fhd')) {
                    quality_isPresent = '1080p'
                }
                if (filteredObjsArrayProps[index].includes('uhd')) {
                    quality_isPresent = '4K'
                }
                if (!filteredObjsArrayProps[index].includes('all')) {
                    Final_filteredArray.push(quality_isPresent)
                }
            }

            if (filteredObjsArrayProps[index].includes("d=")) {
                if (filteredObjsArrayProps[index].includes('10')) {
                    duration_isPresent = '10+min'
                }
                if (filteredObjsArrayProps[index].includes('20')) {
                    duration_isPresent = '20+min'
                }
                if (filteredObjsArrayProps[index].includes('40')) {
                    duration_isPresent = '40+min'
                }
                if (!filteredObjsArrayProps[index].includes('all')) {
                    Final_filteredArray.push(duration_isPresent)
                }
            }

            if (filteredObjsArrayProps[index].includes("p=")) {
                if (filteredObjsArrayProps[index].includes('d')) {
                    date_isPresent = 'Today'
                }
                if (filteredObjsArrayProps[index].includes('w')) {
                    date_isPresent = 'This Week'
                }
                if (filteredObjsArrayProps[index].includes('m')) {
                    date_isPresent = 'This Month'
                }
                if (filteredObjsArrayProps[index].includes('y')) {
                    date_isPresent = 'This Year'
                }
                if (!filteredObjsArrayProps[index].includes('all')) {
                    Final_filteredArray.push(date_isPresent)
                }
            }


        }
    }

    const filter = [
        { name: 'All', query: 'o=all' },
        { name: 'Trending', query: 'o=trending' },
        { name: 'New', query: 'o=new' },
        { name: 'Popular', query: 'o=top' },
        { name: 'Long', query: 'o=long' },
    ]
    const qualtiy = [
        { name: 'All', query: 'q=all' },
        { name: '720p', query: 'q=hd' },
        { name: '1080p', query: 'q=fhd' },
        { name: '4K', query: 'q=uhd' },
    ]
    const duration = [
        { name: 'All', query: 'd=all' },
        { name: '10+min', query: 'd=10' },
        { name: '20+min', query: 'd=20' },
        { name: '40+min', query: 'd=40' },
    ]
    const date = [
        { name: 'All', query: 'p=all' },
        { name: 'Today', query: 'p=d' },
        { name: 'This Week', query: 'p=w' },
        { name: 'This Month', query: 'p=m' },
        { name: 'This Year', query: 'p=y' },
    ]

    const clickHandler = (query) => {
        setSpinner(true)

        if (Router.pathname.includes("/channels/")) {
            //this code is just to change     channelname: keyword and pornstar: keyword

            var queryObj = {
                channelname: keyword,
                page: 1,
                code: code
            }
        } else {

            var queryObj = {
                pornstar: keyword,
                page: 1,
                code: code
            }
        }

        if (filteredObjsArrayProps) {
            for (let index = 0; index < filteredObjsArrayProps.length; index++) {

                queryObj[filteredObjsArrayProps[index].substring(0, filteredObjsArrayProps[index].indexOf('='))] = filteredObjsArrayProps[index].substring(filteredObjsArrayProps[index].indexOf('=') + 1, filteredObjsArrayProps[index].length)
            }
        }

        if (query) {
            queryObj[query.substring(0, query.indexOf('='))] = query.substring(query.indexOf('=') + 1, query.length)
        }
        var pathname = ""
        if (Router.pathname.includes("/channels/")) {
            pathname = "/channels/query/"
        } else {
            pathname = "/pornstar/query/"
        }

        Router.push({
            pathname: pathname,
            query: queryObj
        })
    }

    const removefilter = (item) => {

        if (item === 'Long' || item === 'Trending' || item === 'New' || item === 'Popular' || item === 'All') {
            for (let index = 0; index < filteredObjsArrayProps.length; index++) {
                if (filteredObjsArrayProps[index].includes("o=")) {
                    filteredObjsArrayProps.splice(index, 1);
                    clickHandler()
                }

            }
        }
        if (item === 'Today' || item === 'This Week' || item === 'This Month' || item === 'This Year') {
            for (let index = 0; index < filteredObjsArrayProps.length; index++) {
                if (filteredObjsArrayProps[index].includes("p=")) {
                    filteredObjsArrayProps.splice(index, 1);
                    clickHandler()

                }

            }
        }
        if (item === '10+min' || item === '20+min' || item === '40+min') {
            for (let index = 0; index < filteredObjsArrayProps.length; index++) {
                if (filteredObjsArrayProps[index].includes("d=")) {
                    filteredObjsArrayProps.splice(index, 1);
                    clickHandler()

                }

            }
        }
        if (item === '720p' || item === '1080p' || item === '4K') {
            for (let index = 0; index < filteredObjsArrayProps.length; index++) {
                if (filteredObjsArrayProps[index].includes("q=")) {
                    filteredObjsArrayProps.splice(index, 1);
                    clickHandler()

                }

            }
        }


    }




    return (

        <div>

            <div className='flex items-center md:pr-10 pt-2  sm:p-1 px-2 md:px-3 '>
                <div className='flex  '>
                    <h1 className='text-xl md:text-2xl pl-1 pr-1 font-semibold text-red-900 font-inter my-1  '>{keyword} sex videos</h1>

                </div>
                <p className='text-md md:text-xl  pl-1 pr-1  flex-grow font-inter  text-right text-gray-900 '>{`Page-${pageNumber}`}</p>
            </div>


            <div className='w-fit   md:flex sm:py-1 '>

                {/* This filtered applied bar */}
                <div className='flex items-center flex-wrap justify-start space-x-1 md:space-x-2 pr-2 mb-2 md:mb-0   '>
                    {Final_filteredArray.map(item => {
                        return (
                            <div key={item} onClick={() => { removefilter(item) }} className=' text-xs md:text-sm hover:bg-red-800 cursor-pointer bg-red-500 rounded-lg px-2 py-1 flex items-center space-x-1'>
                                <p className=' text-white font-inter ' >{item}</p>
                                <XCircleIcon className='h-4 md:h-6 text-white' />
                            </div>
                        )
                    })}
                </div>
                <div className='flex items-center justify-start md:justify-center mb-1    space-x-1 sm:space-x-2'>

                    <Menu as="div" className={` relative  text-left`}>
                        <div className='w-fit'>
                            <Menu.Button className="inline-flex justify-center cursor-pointer  w-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ">
                                Filter
                                <FilterIcon className="-mr-1 ml-2 h-4 md:h-5  w-4 md:w-5  mt-[1.5px]" aria-hidden="true" />
                            </Menu.Button>

                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className=" z-50 origin-top-right absolute left-0 mt-2 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                                {filter.map(item => {
                                    return (
                                        <Menu.Item key={item.name}  >
                                            {({ active }) => (
                                                <p onClick={() => { clickHandler(item.query) }} className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm font-semibold hover:text-white hover:bg-red-500 cursor-pointer'
                                                )}
                                                >
                                                    <span className={`${item.name === filter_isPresent ? "text-green-500" : ""}`}>{item.name}</span>
                                                </p>
                                            )}
                                        </Menu.Item>



                                    )
                                })}



                            </Menu.Items>
                        </Transition>
                    </Menu>


                    <Menu as="div" className="relative  text-left">
                        <div className=' w-fit'>
                            <Menu.Button className="inline-flex justify-center cursor-pointer  w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ">
                                Quality
                                <CogIcon className="-mr-1 ml-2 h-4 md:h-5  w-4 md:w-5  mt-[1.5px]" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className=" z-50 origin-top-right absolute right-0 mt-2 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">

                                    {qualtiy.map(item => {
                                        return (
                                            <Menu.Item key={item.name} >
                                                {({ active }) => (
                                                    <p onClick={() => { clickHandler(item.query) }} className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm font-semibold hover:text-white hover:bg-red-500 cursor-pointer'
                                                    )}
                                                    >
                                                        <span className={`${item.name === quality_isPresent ? "text-green-500" : ""}`}>{item.name}</span>
                                                    </p>
                                                )}
                                            </Menu.Item>
                                        )
                                    })}



                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>


                    <Menu as="div" className="relative  text-left">
                        <div className=' w-fit'>
                            <Menu.Button className="inline-flex justify-center cursor-pointer  w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ">
                                Duration
                                <ClockIcon className="-mr-1 ml-2 h-4 md:h-5  w-4 md:w-5  mt-[1.5px]" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className=" z-50 origin-top-right absolute right-0 mt-2 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">

                                    {duration.map(item => {
                                        return (
                                            <Menu.Item key={item.name} >
                                                {({ active }) => (
                                                    <p onClick={() => { clickHandler(item.query) }} className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm font-semibold hover:text-white hover:bg-red-500 cursor-pointer'
                                                    )}
                                                    >
                                                        <span className={`${item.name === duration_isPresent ? "text-green-500" : ""}`}>{item.name}</span>
                                                    </p>
                                                )}
                                            </Menu.Item>
                                        )
                                    })}



                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>


                    <Menu as="div" className="relative  text-left">
                        <div className=' w-fit'>
                            <Menu.Button className="inline-flex justify-center cursor-pointer  w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ">
                                Date
                                <CalendarIcon className="-mr-1 ml-2 h-4 md:h-5  w-4 md:w-5  mt-[1.5px]" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className=" z-50 origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">

                                    {date.map(item => {
                                        return (
                                            <Menu.Item key={item.name} >
                                                {({ active }) => (
                                                    <p onClick={() => { clickHandler(item.query) }} className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm font-semibold hover:text-white hover:bg-red-500 cursor-pointer'
                                                    )}
                                                    >
                                                        <span className={`${item.name === date_isPresent ? "text-green-500" : ""}`}>{item.name}</span>
                                                    </p>
                                                )}
                                            </Menu.Item>
                                        )
                                    })}



                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>


            </div>
        </div>


    )
}


import { useState, useRef, useEffect, } from 'react';
import { useContext } from 'react'
import videosContext from '../context/videos/videosContext'
import ReactCountryFlag from "react-country-flag"
import { getCookie, deleteCookie } from "cookies-next";

import { Fragment } from 'react'

import {

} from '@heroicons/react/solid'
import {
    MoonIcon,
    MenuIcon,
    SearchIcon,
    SunIcon,
    LoginIcon,
    UserIcon,
    UserCircleIcon

} from '@heroicons/react/outline'
import { useRouter } from 'next/router';

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import Link from 'next/link';

var navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Category', href: '/category', current: false },
    { name: 'Pornstars', href: '/pornstar', current: false },
    { name: 'MobileApp', href: '/chutlundsAPK', current: false },
    // { name: 'Live Cams', href: "https://chaturbate.com/in/?tour=LQps&campaign=3v7pk&track=default&room=ukdevelopers", current: false },
    // { name: 'Meet & Fuck', href: "https://chaturbate.com/in/?tour=LQps&campaign=3v7pk&track=default&room=ukdevelopers", current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function Navbar() {

    const router = useRouter();
    const context = useContext(videosContext);
    const { currentLocation, countryBlocked, loggedIn, setloggedIn } = context;

    const [location, setlocation] = useState(currentLocation)
    const [searchKey, setsearchKey] = useState('')
    const [showSuggested, setshowSuggested] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("location") && !currentLocation) {
            setlocation(JSON.parse(localStorage.getItem("location")))
        }

        const emailExists = getCookie("email");
        if (typeof emailExists !== 'undefined' && emailExists.length > 4) {
            setloggedIn(true)
        }



    }, [])


    const signOut = async () => {
        const Email = getCookie('email')
        deleteCookie('membership');
        deleteCookie('countryUpdated_DB');
        deleteCookie('account');
        deleteCookie('email');

        try {
            const parcelData = { email: Email }
            const rawResponse = await fetch(`${process.env.FRONTEND_URL}api/login/logout`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(parcelData),
            });
            const res = await rawResponse.json();
            console.log(res);
            window.location.reload()

        } catch (error) {
            window.location.reload()
        }
    }



    const [searchBarVisibility, setsearchBarVisibility] = useState('hidden');
    const [tags, settags] = useState([])
    const searchInputref = useRef('')
    const handleSearchIconClick = () => {
        if (searchBarVisibility === 'hidden') {
            setsearchBarVisibility('flex')
        } else {
            setsearchBarVisibility('hidden')

        }
        router.push('/search')
    }
    const goSearch = (e) => {
        e.preventDefault();


        if (e.target[0].value) {
            router.push(`/search/${e.target[0].value.trim()
                }`)

        }

    }



    const handleClickFlag = () => {
        router.push({
            pathname: '/VideosList',
            query: {
                key: location.country_name,
                name: `Trending Porn videos in ${location.country_name}`
            }
        })
    }

    const getSuggestedTags = (e) => {
        setshowSuggested(true)
        setsearchKey(e.target.value)
        settags([])


        if (e.target.value.trim().length <= 2) {
            return
        } else {
            var tagsData = [];
            const abcdArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


            const FIRST_LETTER = e.target.value.charAt(0).trim().toUpperCase();
            tagsData = require(`../JsonData/tags/${FIRST_LETTER}.json`)

            for (let index = 0; index < abcdArray.length; index++) {
                if (abcdArray[index].trim() == FIRST_LETTER) {
                } else {
                    var Data = require(`../JsonData/tags/${abcdArray[index]}.json`)
                    tagsData = tagsData.concat(Data)
                }
            }
            var filteredTagArray = tagsData.filter(keyword => {
                if (keyword.trim().toLowerCase().includes(e.target.value.trim().toLowerCase())) {
                    console.log(e.target.value.length);
                    return keyword
                }
            })
            settags(filteredTagArray)
        }
    }

    return (

        <div className='font-inter'>

            <div className="bg-[#13274F] text-white p-2  shadow-md lg:hidden">

                <Disclosure as="nav" >
                    {({ open }) => (
                        <>
                            <div className='flex  items-center justify-between'>

                                <div className='flex items-center space-x-1' >

                                    <Link href='/'>
                                        <p className=' align-center text-center font-Dancing font-bold  text-3xl pl-1 pr-1 cursor-pointer lg:text-left lg:ml-6 '>Chutlunds.com</p>
                                    </Link>
                                    {location &&
                                        <div className='cursor-pointer' onClick={handleClickFlag}>
                                            <ReactCountryFlag
                                                svg
                                                countryCode={location.countryCode}
                                                style={{
                                                    fontSize: '25px',
                                                    lineHeight: '25px',
                                                }}
                                                aria-label="United States"
                                            />
                                        </div>
                                    }

                                </div>






                                <div className='flex items-center'>

                                    <div onClick={handleSearchIconClick} className=' lg:hidden mr-2 cursor-pointer p-2  hover:bg-button hover:text-white rounded-md '>
                                        <SearchIcon className='h-6 w-6' />
                                    </div>

                                    <Menu as="div" className="relative mx-1 mr-2">
                                        <div>
                                            <Menu.Button className=" ">

                                                {!loggedIn &&
                                                    <img src='/login/user.png' className='cursor-pointer h-5 w-5 mt-1.5'></img>
                                                }

                                                {loggedIn &&
                                                    <img src='/login/userOnline.png' className='cursor-pointer h-5 w-5 mt-1.5'></img>
                                                }
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
                                            <Menu.Items className="flex flex-col justify-start origin-top-right absolute -right-[50px] lg:-right-[125px] mt-3  w-[200px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20 pb-4">



                                                {!loggedIn &&
                                                    <Menu.Item>
                                                        <button onClick={() => { router.push('/account/login') }} className='text-white w-[150px] h-[30px] text-[11px] font-inter px-[25px] py-[7px] bg-button hover:bg-button_hover rounded mt-[24px] mx-auto'>
                                                            Sign In / Sign Up
                                                        </button>
                                                    </Menu.Item>


                                                }

                                                {loggedIn &&
                                                    <h2 className='font-Opensans text-theme  text-[14px] cursor-pointer text-center text-theme font-semibold my-2'>{getCookie("email")}</h2>
                                                }


                                                {loggedIn &&
                                                    <Menu.Item>
                                                        <button onClick={signOut} className='text-white w-[150px] h-[30px] text-[11px] font-inter px-[25px] py-[7px] bg-button hover:bg-button_hover rounded mt-[8px] mx-auto'>
                                                            Sign Out
                                                        </button>
                                                    </Menu.Item>
                                                }

                                                <Menu.Item>
                                                    <h2 className='cursor-pointer text-[11px] font-DMsans text-[#001857] w-fit mx-auto mb-28px mt-[14px]'>Need Help ?</h2>
                                                </Menu.Item>

                                            </Menu.Items>
                                        </Transition>
                                    </Menu>


                                    <Disclosure.Button className="lg:hidden items-center justify-center rounded-md text-white hover:bg-button p-2">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>



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
                                <Disclosure.Panel className="">




                                    <div className="px-2 pt-2 pb-3 space-y-1">
                                        {navigation.map((item) => (


                                            <a href={item.href} key={item.name} >
                                                <Disclosure.Button
                                                    as="a"
                                                    className={classNames(
                                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'block px-3 py-2 rounded-md text-base font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Disclosure.Button>
                                            </a>
                                        ))}
                                    </div>
                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>

                <div className={`flex flex-col relative p-1 ${searchBarVisibility}  transition ease-in-out delay-150 mt-2 `}>

                    <form className=' w-full flex items-center' onSubmit={goSearch}>

                        <input value={searchKey} onChange={getSuggestedTags} ref={searchInputref} className='flex-grow  outline-none text-inter text-sm border-gray-300 rounded pl-2  h-[35px] text-theme' type="text" placeholder='Search your favourite porn video...' />

                        <button type="submit" className='bg-button  hover:bg-button_hover text-white text-sm p-2 pl-4 pr-4 m-1 rounded '>Search</button>

                    </form>
                    {showSuggested &&
                        <div className='bg-white max-h-[300px] z-50  overflow-scroll scrollbar-hide'>
                            {tags.map(tag => {
                                return (
                                    <div key={tag} onClick={() => {
                                        setsearchKey(tag); setshowSuggested(false); router.push(`/search/${tag.trim()}`)
                                    }} className='flex items-center space-x-2 p-2 border-[1px] border-gray-300 cursor-pointer hover:bg-blue-100 pl-4'>
                                        {/* <img src='/login/history.png' className='h-[20px]' /> */}
                                        <p className='text-[12px] fontinter text-theme'>{tag}</p>

                                    </div>
                                )
                            })}
                        </div>
                    }



                </div>



            </div>
            <div className='flex justify-around items-center mb-1 bg-blue-100 shadow-lg lg:hidden font-arial px-2'>

                <Link href='/'>
                    <p className=' sm:text-xl xl:text-[28px] text-md text-theme  text-center p-1 hover:text-red-600  '>Home</p>
                </Link>

                <Link href='/category'>
                    <p className=' sm:text-xl xl:text-[28px] text-md text-theme  text-center p-1 hover:text-red-600  '>Catergories</p>
                </Link>

        
                <Link href='/chutlundsAPK'>
                    <p className=' sm:text-xl xl:text-[28px] text-md text-theme  text-center p-1 hover:text-red-600 '>Mobile App</p>
                </Link>





            </div>

            {/* Large Sreeen NavBar  */}

            <div className='flex-col hidden lg:flex ' >


                {/* Navbar */}
                <div className=' flex items-center justify-between bg-[#13274F] pt-2 pb-2 text-white'>

                    <div className='flex items-center space-x-1 md:space-x-3  ml-2' >

                        <img src='/erotic.png' alt="loading..." className='w-14' />

                        <Link href='/'>
                            <p className=' align-center text-center font-Dancing font-bold  text-4xl cursor-pointer lg:text-left '>Chutlunds.com</p>
                        </Link>
                        {location &&

                            <div className='cursor-pointer pt-1' onClick={handleClickFlag}>
                                <ReactCountryFlag
                                    svg
                                    countryCode={location.countryCode}
                                    style={{
                                        fontSize: '25px',
                                        lineHeight: '25px',
                                    }}
                                    aria-label="United States"
                                />
                            </div>
                        }



                        <a target="_blank" href={countryBlocked ? "https://go.xxxiijmp.com/?userId=9ea31ff27db3b7242eabcc2d26ac0eaf38f093c68528e70c2e7f5a72df55c42e" : "https://chaturbate.com/in/?tour=LQps&campaign=3v7pk&track=default&room=ukdevelopers"} rel="noopener noreferrer">
                            <div className='pl-8  flex  items-center 
                             cursor-pointer hover:scale-105  transition-all space-x-2'>
                                <img
                                    src='/livesex.png'
                                    height={35}
                                    width={35}
                                    alt='loading'
                                ></img>
                                <p className='font-bold '>Live Sex</p>
                            </div>
                        </a>
                    </div>


                    <div className='flex space-x-4 items-center justify-end font-theme'>
                        <form className=' flex items-center ' onSubmit={goSearch}>



                            <div className='relative'>
                                <input value={searchKey} onChange={getSuggestedTags} ref={searchInputref} className='w-[250px] flex-grow border-2 outline-none border-gray-300 rounded pl-2 h-10  text-sm text-theme' type="text" placeholder='Search your favourite porn video...' />

                                {showSuggested &&

                                    <div className='bg-white absolute top-[44px] left-0 right-0 max-h-[300px] z-50 overflow-hidden overflow-scroll scrollbar-hide'>
                                        {tags.map(tag => {
                                            return (
                                                <div key={tag} onClick={() => {
                                                    setsearchKey(tag); setshowSuggested(false); router.push(`/search/${tag.trim()}`)
                                                }} className='flex items-center space-x-2 p-2 border-[1px] border-gray-300 cursor-pointer hover:bg-blue-100 pl-4'>
                                                    {/* <img src='/login/history.png' className='h-[20px]' /> */}
                                                    <p className='text-[12px] fontinter text-theme'>{tag}</p>

                                                </div>
                                            )
                                        })}
                                    </div>
                                }
                            </div>
                            <button type="submit" className='ml-4 bg-button  hover:bg-button_hover text-white text-sm h-10  pl-4 pr-4 m-1 rounded '>Search</button>



                        </form>
                        {/* <button className='bg-red-800  hover:bg-red-900 text-white text-sm h-10  pl-4 pr-4 m-1 rounded '>Upload</button> */}


                        {/* <div >
                            <button className='p-1 pl-2 pr-2 border-2 border-black  rounded-l'>
                                <SunIcon onClick={enableLightMode} className='h-8 w-8 text-white' />
                            </button>
                            <button className='p-1 pl-2 pr-2 border-2 border-black  rounded-r'>
                                <MoonIcon onClick={enableDarkMode} className='h-8 w-8' />
                            </button>
                        </div> */}

                        <div className='flex items-center '>
                            {/* <UserIcon className='h-8 w-8' /> */}

                            {!loggedIn &&
                                <div className='flex items-center space-x-2 pr-12 font-inter'>
                                    <p onClick={() => { router.push('/account/login') }} className=' m-2 rounded underline  pl-2 pr-2  cursor-pointer hover:text-white'>Login</p>
                                    {/* <p onClick={() => { router.push('/account/register') }} className='m-1 underline rounded   pl-2 pr-2  cursor-pointer hover:text-white'>Register</p> */}
                                </div>
                            }

                            {loggedIn &&
                                <div className='flex items-center space-x-2 pr-12 font-inter'>
                                    <p className=' m-2 rounded underline   pl-2 pr-2 cursor-pointer '>{getCookie('email')}</p>
                                    <button className='font-inter bg-green-500 px-3 py-1 rounded' onClick={signOut}>Logout</button>
                                </div>
                            }


                        </div>
                    </div>

                </div>






                <div className='w-full bg-blue-100 text-theme items-center justify-around   flex mb-2 p-1 shadow-lg'>
                    {navigation.map(item => {

                        return (
                            <Link href={item.href} key={item.name}>

                                <p key={item.name} className='text-xl 2xl:text-2xl font-semibold cursor-pointer p-1 hover:text-red-400'>{item.name}</p>
                            </Link>
                        )
                    })}


                    {/* <a target="_blank" href="https://chaturbate.com/in/?tour=LQps&campaign=3v7pk&track=default&room=ukdevelopers" rel="noopener noreferrer">
                        <p className='text-xl font-semibold cursor-pointer p-1 text-black hover:text-red-700'>Live Sex</p>
                    </a> */}


                </div>

            </div>


        </div>
    )
}

export default Navbar

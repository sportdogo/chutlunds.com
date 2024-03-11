import React, { useContext, useState } from 'react'
import ModalMembership from '../components/ModalMembership'
import videosContext from '../context/videos/videosContext'

const features = [
    {
        img: "/membership/noads.png",
        heading: "SURF AD FREE",
        sub_heading: "No distractions ever! Hide all ads & popups"
    },

    {
        img: "/membership/4k.png",
        heading: "HIGH DEF VIDEOS",
        sub_heading: "Enjoy ultra HD videos in 4K formats"
    },
    {
        img: "/membership/download.png",
        heading: "HD Downloads up to 4K!",
        sub_heading: "Unlimited HD Downloads of all your favorite full length high-res movies."
    },
    // {
    //     img: "/membership/videos.png",
    //     heading: "+650 NEW VIDEOS / DAY",
    //     sub_heading: "Hundreds of new videos added every day / 617k complete videos"
    // },
    {
        img: "/membership/exclu.png",
        heading: "EXCLUSIVE CONTENT",
        sub_heading: "Access premium, full movies and never before seen content"
    },
]
const Membership = () => {



    const { paymentModalVisible, setpaymentModalVisible } = useContext(videosContext);
    return (
        <div className='relative h-screen' >

            <img src="/membership_bg.png" className="-z-10 absolute top-0 left-0 object-cover w-screen h-full brightness-75 " alt="" />

            <div className='z-10'>

                <div className='flex items-center justify-center pt-5'>
                    <p className=' align-center text-center font-Dancing font-bold text-white  text-[50px] lg:text-[80px] cursor-pointer lg:text-left '>Chutlunds</p>
                    <img src="/vip-pass.png" alt="" className='h-[70px] lg:h-[120px] animate-shine' />
                </div>


                <button onClick={() => setpaymentModalVisible(true)} className='bg-theme text-white lg:px-8 lg:py-4 px-6 py-3 rounded-2xl font-poppins text-[14px] lg:text-[20px] mx-auto block  hover:scale-105 transition-all mt-4 lg:mt-8'>Get Membership now!</button>


                <div className='fixed bottom-0 lg:fixed p-6 gap-6 left-0 grid grid-cols-2 lg:grid-cols-4 bg-black bg-opacity-70  w-full'>

                    {features.map(obj => {
                        return (
                            <div key={obj.img} className=''>
                                <img src={obj.img} alt="" className='w-[70px] lg:w-[100px] 2xl:w-[120px] mx-auto mb-6 lg:mb-10' />
                                <p className='text-white font-semibold font-inter tracking-wider block mx-auto text-center my-1 text-[14px] lg:text-[20px]'>{obj.heading}</p>
                                <p className='text-gray-300 font-thin font-poppins  block mx-auto text-center lg:w-3/4 text-[11px] lg:text-[15px]'>{obj.sub_heading}</p>
                            </div>

                        )
                    })}

                </div>

                {/* Make background darker */}
                <div className={`bg-black bg-opacity-40 fixed inset-0 z-20  ${paymentModalVisible ? "" : "hidden"} `} />

                <ModalMembership />


            </div>


        </div>
    )
}

export default Membership
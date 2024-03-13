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

const plans = [
    {
        duration: "1 month",
        offer: "",
        price: "$2.99",
        type: "month"
    },
    {
        duration: "3 months",
        offer: "20% OFF",
        price: "$4.99",
        type: "month"
    },
    {
        duration: "12 months",
        offer: "40% OFF",
        price: "$9.99",
        type: "month"
    },

    {
        duration: "Lifetime",
        offer: "USE FOREVER",
        price: "$19.99",
        type: "once"
    },
]
const Membership = () => {


    const handlePlanChange = (plan) => {
        setSelectedPlan(plan);
    };

    const { paymentModalVisible, setpaymentModalVisible, selectedPlan, setSelectedPlan } = useContext(videosContext);
    return (
        <div className='relative h-screen' >

            <img src="/membership_bg.png" className="-z-10 absolute top-0 left-0 object-cover w-screen h-full brightness-75 " alt="" />

            <div className='z-10'>

                <div className='flex items-center justify-center pt-5'>
                    <p className=' align-center text-center font-Dancing font-bold text-white  text-[50px] lg:text-[80px] cursor-pointer lg:text-left select-none'>Chutlunds</p>
                    <img src="/vip-pass.png" alt="" className='h-[70px] lg:h-[120px] animate-shine' />
                </div>

                <div className='block mx-auto w-4/5 md:w-3/5 lg:w-[500px] 2xl:w-[600px]'>
                    {plans.map((plan, index) => (
                        <div key={index} className="flex items-center justify-between mb-2 py-3 px-4 lg:px-8 lg:py-4  bg-white bg-opacity-80 rounded-md cursor-pointer select-none" onClick={() => handlePlanChange(plan)}>
                            <div className='flex items-center'>
                                <input
                                    type="radio"
                                    id={`plan-${index}`}
                                    name="plan"
                                    value={index}
                                    checked={selectedPlan.duration === plan.duration}
                                    onChange={() => handlePlanChange(plan)}
                                    className="form-radio h-5 w-5 lg:h-6 lg:w-6 mr-2 lg:mr-3 text-theme border-theme focus:ring-theme"
                                />
                                <label htmlFor={`plan-${index}`} className="font-poppins text-md lg:text-lg">{plan.duration}</label>
                                <span className={`font-arial font-semibold text-xs lg:text-sm ml-2 bg-red-500 text-white rounded-md px-1 py-0.5 ${plan.offer.length === 0 ? "hidden" : ""}`}>{plan.offer}</span>
                            </div>
                            <div>
                                <span className="font-bold font-inter text-lg lg:text-2xl">{plan.price}</span>
                                <span className="text-sm lg:text-md">/{plan.type}</span>
                            </div>
                        </div>
                    ))}
                </div>


                <button onClick={() => setpaymentModalVisible(true)} className='bg-theme text-white lg:px-8 lg:py-4 px-6 py-3 rounded-2xl font-poppins text-[14px] lg:text-[20px] mx-auto block  hover:scale-105 transition-all mt-4 lg:mt-8'>Get Access now!</button>


                <div className='absolute bottom-0 lg:fixed p-4 lg:p-6 gap-4 lg:gap-6 left-0 grid grid-cols-2 lg:grid-cols-4 bg-black bg-opacity-70  w-full'>

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
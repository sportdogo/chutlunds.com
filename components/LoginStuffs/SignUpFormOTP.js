import React, { useContext, useEffect, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { XCircleIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import videosContext from '../../context/videos/videosContext'
import Router, { useRouter } from 'next/router';
import ClipLoader from "react-spinners/ClipLoader";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

export const SignUpFormOTP = () => {
    const router = useRouter();
    const { email } = router.query

    const { setloggedIn, } = useContext(videosContext)

    const [OTP, setOTP] = useState('')
    const [loading, setloading] = useState(false);
    const [resentOTP, setresentOTP] = useState(0);
    const [message, setmessage] = useState('');

    useEffect(() => {
        if (typeof getCookie('email') !== 'undefined') {
            router.push('/')
        }
    }, []);



    const verifyOTP = async (e) => {

        if (OTP.length !== 4) {
            alert('Enter OTP')
            return
        }
        e.preventDefault()
        setloading(true)

        try {
            const parcelData = { email: email.trim(), otp: OTP }
            const rawResponse = await fetch(`${process.env.FRONTEND_URL}api/login/verifyOtp`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(parcelData),
            });

            const res = await rawResponse.json();
            console.log(res);
            setloading(false)

            if (res.message === 'OTP Incorrect') {
                setmessage('OTP Incorrect')
            }

            if (res.message === 'OTP Verified') {
                setCookie('email', email.trim(), { maxAge: 900000 });
                setCookie('membership', false, { maxAge: 900000 });
                setCookie('account','credential', { maxAge: 900000 });

                //Update loggedIn in DB
                const parcelData = { email: email.trim() }
                const rawResponse = await fetch(`${process.env.FRONTEND_URL}api/login/updateloggedIn`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(parcelData),
                });
                const res = await rawResponse.json();
                console.log(res);
                setloggedIn(true)
                router.push('/')
            }

        } catch (error) {
            setloading(false)
            console.log(error);
            alert(error);

        }
    }

    const resendOTP = async (e) => {
        e.preventDefault()
        setloading(true)
        try {
            const parcelData = { email: email.trim() }
            const rawResponse = await fetch(`${process.env.FRONTEND_URL}api/login/resendOTP`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(parcelData),
            });

            const res = await rawResponse.json();
            console.log(res);
            setloading(false)

            if (res.message === 'OTP Sent Again!') {
                setresentOTP(1)
                setmessage('OTP Sent Again!')
            }

        } catch (error) {
            setloading(false)
            console.log(error);
            alert(error);

        }
    }

    return (


        <div className={`bg-no-repeat bg-cover	bg-opacity-80 w-full mb-[300px] sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-[450px] mx-auto`}>




            <div className='px-[28px]  w-full'>


                <h2 className='mt-[20px] font-inter text-[18px] text-[#323232]'>
                    Enter Verification Code
                </h2>



                <div className='flex flex-col items-center  shadow-red-500 rounded  shadow-lg mt-8 px-4 pb-4'>
                    <h2 className=' text-center  font-inter text-[14px] xl:text-[16px] w-full h-[26px] mt-[21px] text-black font-medium'>
                        {`Please enter the 4-digit code we sent to
                        ${email}.`}
                    </h2>





                    <div className="divOuter mt-[30px]">
                        <div className="divInner">
                            <input value={OTP.substring(0, 4)} onChange={e => { if (e.target.value.length < 5) { setOTP(e.target.value) } }} className="partitioned bg-transparent text-[#323232] font-bold" type="number" maxLength="4" />
                        </div>
                    </div>

                    <div className='mb-6 min-h-[30px] xl:min-h-[40px] mt-1'>
                        <p className={` rounded text-center w-full  text-[14px] xl:text-[16px] text-red-500 font-semibold px-1 pb-1 mt-1 ${message.length > 0 ? "visible" : "invisible"}`}>{message}</p>
                    </div>


                    <h2 className='text-center w-full  font-inter text-[13px] lg:text-[15px] mt-[14px]'>By continuing, you agree to Chutlunds&apos;s
                        Terms of Use and Privacy Policy.
                    </h2>

                </div>





                {/* Bottom */}


                <div className='pt-4 mt-[58px]'>

                    {!loading &&
                        <div className=' flex flex-col space-y-2'>

                            {resentOTP === 0 &&
                                <button onClick={resendOTP} className='font-normal text-[14px] text-center w-[154px] h-[30px]  mx-auto  text-white bg-red-500 hover:bg-red-600 rounded-[5px] block'>Re-send OTP</button>
                            }


                            <button onClick={verifyOTP} className='font-normal text-[14px] text-center w-[154px] h-[30px]  mx-auto text-white bg-red-500 hover:bg-red-600 rounded-[5px] block'>Continue</button>
                        </div>

                    }


                    {loading &&
                        <div className='block mx-auto w-fit '>
                            <ClipLoader color="#323232" size={30} />

                        </div>

                    }
                </div>



            </div>


        </div>
    )
}

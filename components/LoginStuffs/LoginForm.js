import React, { useContext, useEffect, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { XCircleIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import videosContext from '../../context/videos/videosContext'
import ClipLoader from "react-spinners/ClipLoader";
import { setCookie, getCookie } from "cookies-next";







export const LoginForm = () => {

    const router = useRouter()



    const { OTPemail, setOTPemail, loggedIn, setloggedIn } = useContext(videosContext)

    const [loading, setloading] = useState(false);
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [message, setmessage] = useState('');
    const [Country, setCountry] = useState('');


    useEffect(() => {
        if (typeof getCookie('email') !== 'undefined') {
            router.push('/')
        }

    }, []);




    const SignIn = async (route) => {
        router.push(`/api/${route}`)
    }

    const submitForm = async (event) => {

        event.preventDefault();
        setmessage('')
        setloading(true)


        try {
            const parcelData = { email: email.trim(), password: password }
            const rawResponse = await fetch(`${process.env.FRONTEND_URL}api/login/login`, {
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

            if (res.message === 'OTP Sent') {
                setOTPemail(res.data.email)
                Router.push({
                    pathname: `/account/verifyOTP`,
                    query: { email: email.trim() }
                })
            }

            if (res.message === 'Password Incorrect') {
                setmessage("Password Incorrect !")
                return
            }
            if (res.message === 'User not found') {
                setmessage("User not found !")
                return
            }

            if (res.message === 'Logged In') {
                setCookie('email', res.data.email, { maxAge: 900000 });
                setCookie('account', 'credential', { maxAge: 900000 });
                setCookie('membership', res.data.membership, { maxAge: 900000 });
                setloggedIn(true)
                router.push('/')

            }


        } catch (error) {
            setloading(false)
            console.log(error);
            alert(error);

        }


    }

    const forgotPassword = async () => {
        router.push('/account/forgotPassword')
    }

    const registerClick = async () => {
        router.push('/account/register')
    }





    return (
        <div className={`bg-no-repeat bg-cover	bg-opacity-80 w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-[450px] mx-auto`}>



            <h2 className='mt-[20px] text-[#323232]  text-[18px] font-manrope mb-2'>
                SIGN UP / SIGN IN
            </h2>

            {/* <form autoComplete="on" onSubmit={submitForm}>
                <div className="px-5 pt-4 font-inter">

                    <label className=" text-[#323232] pb-[1px] block ml-1">E-mail</label>
                    <input onChange={e => { setemail(e.target.value) }} required type="text" id='email' name='email' className=" rounded-lg px-3 py-2 mt-1 mb-3 text-sm w-full outline-none  text-[#323232] placeholder:text-gray-400   border-[1px] border-gray-400" placeholder='E-mail' />

                    <label className=" text-[#323232] pb-[1px] block ml-2">Password</label>
                    <input onChange={e => { setpassword(e.target.value) }} required type="password" id='password' name='password' className=" rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full outline-none  text-[#323232] placeholder:text-gray-400  border-[1px] border-gray-400" placeholder='Password' />

                    <div className='h-[40px]'>
                        {!loading &&
                            <button type="submit" className="transition duration-200 bg-red-500 hover:bg-red-600  text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                {!loading && <span className="inline-block mr-2">Login</span>}
                                {!loading && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>}


                            </button>
                        }

                        {loading &&
                            <div className='block mx-auto w-fit '>
                                <ClipLoader color={"#323232"} size={35} />

                            </div>

                        }
                    </div>

                    <div className='h-[50px]'>
                        <p className={` rounded text-center  text-md text-red-500 font-semobold mt-3 px-1 py-1 ${message.length > 0 ? "visible" : "invisible"}`}>{message}</p>
                    </div>


                </div>

            </form>

            <button className="transition duration-200  pb-1 cursor-pointer  text-sm rounded-lg text-[#323232] block mx-auto font-arial ">
                <span className="inline-block ml-1">Don't have an account ?</span>

                <span onClick={registerClick} className="inline-block ml-1 text-red-500">Register</span>
            </button>

            <button onClick={forgotPassword} className="transition duration-200  py-3 cursor-pointer  text-sm rounded-lg text-[#323232] block mx-auto font-inter hover:text-red-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <span className="inline-block ml-1">Forgot Password</span>
            </button>


            <div className='flex items-center justify-center space-x-1 mt-4'>

                <span className='border-[1px] border-gray-300 w-full'></span>
                <p className='text-[#323232] font-inter text-sm'>OR</p>
                <span className='border-[1px] border-gray-300 w-full'></span>
            </div> */}



            <div className=' w-full  mt-[76px]  mx-auto  flex flex-col items-start  space-y-6 px-6'>

                <div onClick={() => SignIn('user/google')}
                    className='hover:bg-slate-200 w-full rounded-xl  flex items-center justify-center space-x-4 cursor-pointer py-1.5  px-6 border-[1px] border-slate-300  '>
                    <img src='/login/google.png' className='lg:h-[38px] object-contain h-[28px] w-[28px] cursor-pointer ml-1'></img>
                    <h2 className=' font-semibold font-inter text-[#323232] text-[11px] lg:text-[14px]'>Continue with Google</h2>
                </div>


                <div onClick={() => SignIn('user/facebook')}
                    className='hover:bg-slate-200 w-full  flex items-center justify-center space-x-4 cursor-pointer py-1.5  px-6  rounded-xl border-[1px] border-slate-300 '>
                    <img src='/login/facebook.png' className='lg:h-[40px] object-contain h-[28px] w-[28px] cursor-pointer ml-1'></img>
                    <h2 className='font-semibold font-inter text-[#323232] text-[11px] lg:text-[14px]'>Continue with Facebook</h2>
                </div>








            </div>


        </div>

    )
}

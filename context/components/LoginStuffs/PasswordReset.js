import React, { useContext, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { XCircleIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import videosContext from '../../context/videos/videosContext'
import Router, { useRouter } from 'next/router';
import ClipLoader from "react-spinners/ClipLoader";
import { setCookie, deleteCookie } from "cookies-next";

export const PasswordReset = () => {
    const router = useRouter();


    const { OTPemail } = useContext(videosContext)

    const [Email, setEmail] = useState('')
    const [OTP, setOTP] = useState('')
    const [loading, setloading] = useState(false);
    const [message, setmessage] = useState('');
    const [OTP_Sent, setOTP_Sent] = useState(0);
    const [password, setpassword] = useState('');
    const [retypePassword, setretypePassword] = useState();
    const [passwordUpdated, setpasswordUpdated] = useState(false);






    const verifyOTP = async (e) => {


        try {
            const parcelData = { email: Email.trim(), otp: OTP }
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

            if (res.message === 'OTP Verified') {
                return { verified: true, message: res.message }
            } else {
                return { verified: false, message: res.message }
            }

        } catch (error) {
            setloading(false)
            console.log(error);
            alert(error);

        }
    }

    const resendOTP = async (e) => {
        e.preventDefault()
        if (passwordUpdated) {
            router.push('/account/login')
            return
        }
        setmessage('')

        setloading(true)
        try {
            const parcelData = { email: Email.trim() }
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

            if (res.message === 'OTP Sent Again!' && OTP_Sent === 0) {
                setOTP_Sent(1)
                setmessage('OTP Sent')

            }

            if (res.message === 'OTP Sent Again!' && OTP_Sent === 1) {
                setmessage('OTP Sent Again!')

            }
            if (res.message === 'User not found') {
                setmessage('User not found!')
            }

        } catch (error) {
            alert(error);
            setloading(false)
            console.log(error);

        }
    }


    const updatePassword = async (e) => {
        setmessage('')

        if (OTP.length !== 4) {
            setmessage('Enter 4 digit OTP')
            return
        }

        if (password !== retypePassword) {
            alert('password not matched!')
            return
        }

        setloading(true)


        const { verified, message } = await verifyOTP()

        if (!verified) {
            setloading(false)
            setmessage(message)
            return
        }

        try {
            const parcelData = { email: Email.trim(), password: password }
            const rawResponse = await fetch(`${process.env.FRONTEND_URL}api/login/forgotPassword`, {
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

            if (res.message === 'Password Updated') {
                setmessage('Password updated')
                setOTP_Sent(0)
                setpasswordUpdated(true)
                setTimeout(() => {
                    router.push('/account/login')
                }, 2000);

            }
            setloading(false)


        } catch (error) {
            alert(error);
            setloading(false)
            console.log(error);

        }
    }




    return (



        <div className={`bg-no-repeat bg-cover	bg-opacity-80 w-full mb-[400px] sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-[450px] mx-auto`}>





            <div className='px-[28px]  w-full'>


                <h2 className='my-[20px]  mb-[30px] font-inter text-[18px] text-[#323232]'>
                    Reset Password
                </h2>



                <div className='flex flex-col items-center justify-start  rounded shadow-gray-400 shadow-md p-4'>

                    <h2 className='text-[#323232] font-inter text-[14px] xl:text-[16px] w-full h-[26px] mb-2'>
                        Please enter your registered Email
                    </h2>

                    <input onChange={e => { setEmail(e.target.value) }} required type="text" id='email' name='email' className=" rounded-lg w-full px-3 py-2  text-[13px] xl:text-[15px]  outline-none  text-[#323232] placeholder:text-gray-400  border-[1px] border-gray-400" placeholder='E-mail' />

                    <div className=' min-h-[30px] xl:min-h-[40px]'>

                        {OTP_Sent === 0 &&
                            <div className=' mt-[3px]'>
                                <p className={` rounded text-center w-full  text-[16px] xl:text-[18px] text-theme font-semibold px-1 pb-1 ${message.length > 0 ? "block" : "hidden"}`}>{message}</p>
                            </div>
                        }
                    </div>


                </div>



                <div className='px-5'>


                    {OTP_Sent > 0 &&

                        <div className='flex flex-col items-center my-2'>

                            <h2 className=' text-left text-[#323232] font-inter text-[12px] xl:text-[14px] w-full h-[26px] mt-[21px]'>
                                {`Please enter the 4-digit code we sent to
                        ${Email}.`}
                            </h2>

                            <div className="divOuter my-[20px] mt-[30px]">
                                <div className="divInner">
                                    <input value={OTP.substring(0, 4)} onChange={e => { if (e.target.value.length < 5) { setOTP(e.target.value) } }} className="partitioned bg-transparent text-[#323232]" type="number" maxLength="4" />
                                </div>
                            </div>

                            <div className='mb-6 min-h-[30px] xl:min-h-[40px]'>
                                <p className={` rounded text-center w-full  text-[16px] xl:text-[18px] text-theme font-semibold px-1 pb-1 ${message.length > 0 ? "visible" : "invisible"}`}>{message}</p>
                            </div>

                            <div className='flex flex-col items-center justify-start w-full'>

                                <label className=" text-[14px] xl:text-[16px] w-full  text-[#323232] pb-[1px] block  text-left  mt-2">Set New Password</label>

                                <input onChange={e => { setpassword(e.target.value) }} required type="password" id='email' name='email' className=" rounded-lg w-full px-3 py-2  text-[13px] xl:text-[15px]  outline-none  text-[#323232] placeholder:text-gray-400  border-[1px] border-gray-400 mb-2" placeholder='New Password' />



                                <input onChange={e => { setretypePassword(e.target.value) }} required type="password" id='email' name='email' className=" rounded-lg w-full px-3 py-2  text-[13px] xl:text-[15px]  outline-none  text-[#323232] placeholder:text-gray-400  border-[1px] border-gray-400" placeholder='Retype New Password' />
                            </div>
                        </div>
                    }
                </div>





                {/* Bottom */}


                <div className='mt-8'>
                    {!loading &&
                        <div className='flex flex-col space-y-3' >

                            {OTP_Sent === 1 &&
                                <button onClick={resendOTP} className='font-normal text-[14px] text-center w-[154px] h-[30px]  mx-auto  text-white  bg-theme hover:bg-red-600 rounded-[5px] block'>Re-send OTP</button>
                            }

                            {OTP_Sent === 0 &&

                                <button onClick={resendOTP} className='font-normal text-[14px] text-center w-[154px] h-[30px]  mx-auto text-white bg-theme hover:bg-red-600 rounded-[5px] block'>{passwordUpdated ?"Go to login":"Confirm" }</button>
                            }

                            {OTP_Sent === 1 &&
                                <button onClick={updatePassword} className='font-normal text-[14px] text-center w-[154px] h-[30px]  mx-auto  text-white  bg-theme hover:bg-red-600 rounded-[5px] block'>Update Password</button>
                            }

                        </div>
                    }

                    {loading &&
                        <div className='block mx-auto w-fit'>
                            <ClipLoader color={"#323232"} size={30} />

                        </div>

                    }



                </div>







            </div>


        </div>
    )
}

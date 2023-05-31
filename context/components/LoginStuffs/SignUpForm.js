import React, { useContext, useEffect, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { XCircleIcon, FolderDownloadIcon, ChatIcon } from '@heroicons/react/solid'
import videosContext from '../../context/videos/videosContext'
import { BeatLoader } from 'react-spinners'
import ClipLoader from "react-spinners/ClipLoader";
import Router, { useRouter } from 'next/router'
import { setCookie, deleteCookie } from "cookies-next";


export const SignUpForm = () => {
    const router = useRouter()

    const [Email, setEmail] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [phone, setphone] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [validateEmailState, setvalidateEmailState] = useState(null)
    const [message, setmessage] = useState('');
    const [loading, setloading] = useState(false);
    const [Country, setCountry] = useState('');


    useEffect(() => {
        getLocation();
    }, [])

    async function getLocation() {

        try {
            const response = await fetch('https://api.db-ip.com/v2/free/self')
            const data = await response.json();
            setCountry(data.countryName)
            setCookie('country', data.countryName, { maxAge: 900000 })

        } catch (error) {
            const response = await fetch(' https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0')
            const data = await response.json();
            setCountry(data.country_name)
            setCookie('country', data.country_name, { maxAge: 900000 })
        }

    }
    const validateEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        return (false)
    };



    const gotoLogin = () => {
        router.push('/account/login')

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setmessage('')

        if (Email.length > 10 && !validateEmail(Email)) {
            alert("Please Enter Email correctly")
            return
        }

        if (password != confirmPassword) {
            alert("Confirm Password Incorrect")
            return
        }

        setloading(true)

        try {
            const parcelData = { firstName: firstName.trim(), lastName: lastName.trim(), email: Email.trim(), password: password, country: Country }
            const rawResponse = await fetch(`${process.env.FRONTEND_URL}api/login/register`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(parcelData),
            });

            const res = await rawResponse.json();
            console.log(res);

            if (res.message === 'Already Resgistered') {
                setmessage('Already Resgistered !')
            }
            if (res.message === 'OTP Sent') {
                Router.push({
                    pathname: `/account/verifyOTP`,
                    query: { email: Email }
                })
            }

            setloading(false)
        } catch (error) {
            setloading(false)
            console.log(error);
            alert(error);
            return
        }

    }





    return (




        <div className={`bg-no-repeat bg-cover	bg-opacity-80 w-full mb-[200px] sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-[450px] mx-auto`}>



            <div className='px-[28px]  w-full'>



                <h2 className=' mt-[20px] text-[#323232]  text-[20px] font-inter font-medium mb-6'>
                    Join Chutlunds for free
                </h2>


                <div className='flex flex-col space-y-1 xl:space-y-2 x'>
                    <div className='flex items-center space-x-3 xl:space-x-4 font-inter'>
                        <img src='/login/download.png' className='text-red-600 h-[18px] xl:h-[24px] ' />
                        <span className='text-[12px] lg:text-[14px]'>Free download any video
                        </span>
                    </div>
                    <div className='flex items-center space-x-3 xl:space-x-4 font-inter'>
                        <img src='/login/heart.png' className='text-red-600 h-[18px] xl:h-[24px] ' />
                        <span className='text-[12px] lg:text-[14px]'>Save your favorites
                        </span>
                    </div>

                    <div className='flex items-center space-x-3 xl:space-x-4 font-inter'>
                        <img src='/login/ai.png' className='text-red-600 h-[18px] xl:h-[24px] ' />
                        <span className='text-[12px] lg:text-[14px]'>Enjoy video Recommendations
                        </span>
                    </div>
                    <div className='flex items-center space-x-3 xl:space-x-4 font-inter'>
                        <img src='/login/chat.png' className='text-red-600 h-[19px] xl:h-[25px] ' />
                        <span className='text-[12px] lg:text-[14px]'>Start sexting and post comments

                        </span>
                    </div>
                </div>

                <form className='flex flex-col items-center justify-start' onSubmit={handleSubmit} >

                    <div className=' relative flex items-center justify-between   text-[#323232] rounded-lg   border-[1px] border-gray-400 w-full  outline-none text-sm xl:text--md mt-[23px] placeholder:text-gray-400 bg-transparent '>
                        <input required onChange={(e) => { setEmail(e.target.value); console.log() }} className='rounded-lg w-full p-2 px-3 bg-transparent outline-none' type='text' placeholder='E-Mail' name='email' id='email' />

                        {Email.length > 10 &&
                            <div className='absolute right-2'>
                                {/* <p className='text-button text-xs font-inter'>Format incorrect</p> */}
                                <CheckCircleIcon className={`text-green-400 h-[20px] ${validateEmail(Email) ? "" : "hidden"}`} />
                                <XCircleIcon className={`text-red-400 h-[20px] ${!validateEmail(Email) ? "" : "hidden"}`} />
                            </div>
                        }

                    </div>






                    <input required onChange={e => setfirstName(e.target.value)} className='p-2 px-3  text-[#323232] rounded-lg   border-[1px] border-gray-400 w-full  outline-none text-sm xl:text--md mt-[23px] placeholder:text-gray-400 bg-transparent ' type='text' placeholder='First Name' name='name' id='firstname' />

                    <input required onChange={e => setlastName(e.target.value)} className='p-2 px-3  text-[#323232] rounded-lg   border-[1px] border-gray-400 w-full  outline-none text-sm xl:text--md mt-[23px] placeholder:text-gray-400 bg-transparent ' type='text' placeholder='Last Name' />


                    {/* <input required={true} value={phone} onChange={(e) => { if (e.target.value.length <= 10) { setphone(e.target.value) } }} className='p-2 px-3  text-[#323232] rounded-lg   border-[1px] border-gray-400 w-full  outline-none text-sm xl:text--md mt-[23px] placeholder:text-gray-400 bg-transparent ' type='number' placeholder='Phone' maxLength={10} /> */}

                    <input required onChange={e => setpassword(e.target.value)} className='p-2 px-3  text-[#323232] rounded-lg   border-[1px] border-gray-400 w-full  outline-none text-sm xl:text--md mt-[23px] placeholder:text-gray-400 bg-transparent ' type='password' placeholder='Password' name='password' />

                    <input required onChange={e => setconfirmPassword(e.target.value)} className='p-2 px-3  text-[#323232] rounded-lg   border-[1px] border-gray-400 w-full  outline-none text-sm xl:text--md mt-[23px] placeholder:text-gray-400 bg-transparent ' type='password' placeholder='Confirm Password' />

                    <div className='h-[20px]'>
                        <p className={` rounded text-center  w-full text-md text-button mt-1 font-semiboldpx-1 pt-1 ${message.length > 0 ? "visible" : "invisible"}`}>{message}</p>
                    </div>

                    {/* Bottom */}
                    <h2 className='text-center w-full text-[#323232]  font-inter text-[12px] mt-[26px]'>By continuing, you agree to Chutlunds&apos;s
                        Terms of Use and Privacy Policy.
                    </h2>

                    <div className='mt-[18px]'>
                        {!loading &&

                            <button type='submit' className='font-normal text-[14px] text-center w-[154px] h-[30px]   text-white hover:bg-button_hover bg-button rounded-[5px]  '>Continue</button>
                        }
                        {loading &&
                            <div className='mx-auto'>
                                <ClipLoader color='#323232' size={24} />
                            </div>
                        }
                    </div>

                </form>


                <div className='flex flex-col items-center justify-center mt-[20px]'>



                    <div className='flex items-center  space-x-[10px] ml-[15px]'>
                        <h2 className='text-center text-[#323232]  font-inter  text-[13px]'>Existing user ?</h2>

                        <button onClick={gotoLogin} type="submit" value="submit" className='font-normal text-[14px] text-center w-[80px] h-[30px]  border-[1px] border-button rounded-[5px] hover:bg-button text-[#323232] hover:text-white '>Sign In</button>
                    </div>
                </div>






            </div>

            <div>

            </div>


        </div>
    )
}

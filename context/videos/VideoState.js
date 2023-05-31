import videosContext from "./videosContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";






const VideoState = (props) => {

    const router = useRouter();
    const [spinnerLoading, setspinnerLoading] = useState(false)
    const [DarkTheme, setDarkTheme] = useState('')
    const [currentLocation, setcurrentLocation] = useState(null)

    //Login stuffs

    const [loggedIn, setloggedIn] = useState(false);

    //this the email in which otp is send during signUp and show this email in OTP sidebar
    const [OTPemail, setOTPemail] = useState(null)


    const [tagsContext, settagsContext] = useState([])



    function setSpinner(boolean) {

        setspinnerLoading(boolean)
        setTimeout(() => {
            setspinnerLoading(false)

        }, 2000);

    }
    function setDarkThemeFunc(theme) {
        setDarkTheme(theme)

    }





    return (
        <videosContext.Provider value={{ spinnerLoading, setSpinner, setDarkThemeFunc, DarkTheme, currentLocation, setcurrentLocation, OTPemail, setOTPemail, loggedIn, setloggedIn ,tagsContext, settagsContext}}>
            {props.children}
        </videosContext.Provider>
    )
}




export default VideoState;
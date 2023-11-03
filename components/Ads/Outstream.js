import { Outstream, Placeholder } from "exoclick-react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from 'react';
import Script from "next/script";


function Outstreams() {


    const [videoPage, setvideoPage] = useState(false);
    const router = useRouter();
    
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();


    useEffect(() => {
        if (window.location.href.includes('video')) {
            setvideoPage(true)
        }

    }, []);

    return (

        <div className="fixed bottom-4 right-0 z-10">


            {/* min---lg  */}
            {/* <div className="  lg:hidden space-y-20">

                <Placeholder width="220" height="120">
                    <Outstream zoneId="5069574" maxWidth={400} />
                </Placeholder>

            </div> */}


            {/* lg---xl  */}
            {/* <div className="hidden lg:flex  xl:hidden space-x-6">
                <Placeholder width="400" height="266">
                    <Outstream zoneId="5069574" maxWidth={400} />
                </Placeholder>


            </div> */}

            {/* xl---max  */}

            {/* <div className={`hidden xl:flex ${videoPage ? "flex-col space-y-6" : "flex-row space-x-6"}`}>
                <Placeholder width="400" height="266">
                    <Outstream zoneId="5069574" maxWidth={400} />
                </Placeholder>
            </div>
             */}


            {/* <Script id={uniqid} src='//staggereddam.com/56/1d/06/561d0641f7b00b80cf88a24977269049.js'></Script> */}

        </div>
    )
}

export default Outstreams;

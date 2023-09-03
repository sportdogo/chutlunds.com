import { Outstream, Placeholder } from "exoclick-react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from 'react';


function Outstreams() {


    const [videoPage, setvideoPage] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (window.location.href.includes('video')) {
            setvideoPage(true)
        }

    }, []);

    return (

        <div className="fixed bottom-4 right-0 z-10">


            {/* min---lg  */}
            <div className="  lg:hidden space-y-20">

                <Placeholder width="220" height="120">
                    <Outstream zoneId="5069574" maxWidth={400} />
                </Placeholder>

            </div>


            {/* lg---xl  */}
            <div className="hidden lg:flex  xl:hidden space-x-6">
                <Placeholder width="400" height="266">
                    <Outstream zoneId="5069574" maxWidth={400} />
                </Placeholder>


            </div>

            {/* xl---max  */}

            <div className={`hidden xl:flex ${videoPage ? "flex-col space-y-6" : "flex-row space-x-6"}`}>
                <Placeholder width="400" height="266">
                    <Outstream zoneId="5069574" maxWidth={400} />
                </Placeholder>
            </div>
            
        </div>
    )
}

export default Outstreams;

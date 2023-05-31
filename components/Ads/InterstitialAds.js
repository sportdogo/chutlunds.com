import { FullpageInterstitial } from "exoclick-react";
import { useEffect, useRef } from "react";


function InterstitialAds({ command }) {

    var clickRefMoble = useRef(null);
    var clickRefIntertitials = useRef(null);

    useEffect(() => {

        setTimeout(() => {
            if (window.innerWidth < 750) {
                clickRefMoble.current.click();
                console.log("clickRefIntertitials");

            } else {
                clickRefIntertitials.current.click();
                console.log("clickRefIntertitials");
            }
        }, 50000);


    }, []);


    return (
        <div className="flex items-center justify-center">


            {/* Mobile Ads */}
            <div className='sm:hidden bg-red-200'>
                <a ref={clickRefMoble} href="#" onClick={e => e.preventDefault()} className="demo-mobile">
                </a>
                <FullpageInterstitial
                    zoneId={4318840}
                    frequencyType="clicks"
                    firstTriggerClicks={1}
                    nextTriggerClicks={1}
                    triggerClass={['demo-mobile']}
                />
            </div>


            {/* WebAds */}
            <div className='hidden sm:flex'>
                <a ref={clickRefIntertitials} href="#" onClick={e => e.preventDefault()} className="demo-desktop">
                </a>
                <FullpageInterstitial
                    zoneId={4580172}
                    frequencyType="clicks"
                    firstTriggerClicks={1}
                    nextTriggerClicks={1}
                    triggerClass={['demo-desktop']}
                />
            </div>
        </div>
    )
}

export default InterstitialAds;

import Script from "next/script";
import { useEffect } from "react";

function PopunderAds() {

    useEffect(() => {
        console.log(window.location.href, 'PopunderAds');
    }, []);

    return (
        <div className="flex items-center justify-center">


            <Script
                id="popunder"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    var ad_idzone = "4809654",
                    ad_popup_fallback = false,
                    ad_popup_force = false,
                    ad_chrome_enabled = true,
                    ad_new_tab = false,
                    ad_frequency_period = 5,
                    ad_frequency_count = 3,
                    ad_trigger_method = 3,
                    ad_t_venor = false;
  `,
                }}
            />


            <Script
                strategy="afterInteractive"
                src="https://a.realsrv.com/popunder1000.js"
            />






        </div>
    )
}

export default PopunderAds;

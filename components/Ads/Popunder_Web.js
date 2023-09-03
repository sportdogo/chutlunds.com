import Script from "next/script";

function PopunderAds_2() {



    return (
        <div className="flex items-center justify-center">

            <Script
                id="popunder"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    var ad_idzone = "5069558",
                    ad_popup_fallback = true,
                    ad_popup_force = false,
                    ad_chrome_enabled = true,
                    ad_new_tab = true,
                    ad_frequency_period = 5,
                    ad_frequency_count = 3,
                    ad_trigger_method = 3,
                    ad_trigger_delay = 0; 
  `,
                }}
            />


            <Script
                strategy="afterInteractive"
                src="https://a.pemsrv.com/popunder1000.js"
            />






        </div>
    )
}

export default PopunderAds_2;

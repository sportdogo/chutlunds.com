import Script from "next/script";

function PopunderAds() {


    return (
        <div className="flex items-center justify-center">



            <Script
                type="text/javascript"
                src="//cdn.tsyndicate.com/sdk/v1/p.js"
                data-ts-spot="0fede73077d5463e9a84946bbe3c27ff"
                data-ts-extid="{extid}"
                data-ts-session-duration="300"
                data-ts-count="3"
                
                async
                defer
            />



        </div>
    )
}

export default PopunderAds;

import Script from "next/script";


function BannerAds() {

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    return (
        <div className="">

            <Script
                type="text/javascript"
                src="//cdn.tsyndicate.com/sdk/v1/bi.js"
                data-ts-spot="9d2353bb144e44528acb154218a20ded"
                data-ts-width="300"
                data-ts-height="250"
                data-ts-extid="{extid}"
                async
                defer
            />


        </div>
    )
}

export default BannerAds;

import Script from "next/script";

function PopunderAds_2() {


    return (
        <div className="flex items-center justify-center">

            <Script
                type="text/javascript"
                src="//cdn.tsyndicate.com/sdk/v1/p.js"
                data-ts-spot="a10d216ce99841069e6f28bf6fd113a2"
                data-ts-extid="{extid}"
                data-ts-session-duration="300"
                data-ts-count="5"
                data-ts-mode="selective"
                data-ts-ignore-filter="block_popunder"
                async
                defer
            />


        </div>
    )
}

export default PopunderAds_2;

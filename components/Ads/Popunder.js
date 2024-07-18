import Script from "next/script";

function PopunderAds_2() {



    return (
        <div className="flex items-center justify-center">

            <Script
                type="text/javascript"
                src="//cdn.tsyndicate.com/sdk/v1/p.js"
                data-ts-spot="637f41ccc95a46769276024b3fe07174"
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

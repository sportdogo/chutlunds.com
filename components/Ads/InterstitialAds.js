// components/InterstitialAd.js
import Head from 'next/head';
import Script from 'next/script';

const InterstitialAds = () => {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="//cdn.tsyndicate.com/sdk/v1/interstitial.ts.css" />
            </Head>
            <Script
                src="//cdn.tsyndicate.com/sdk/v1/interstitial.ts.js"
                strategy="afterInteractive"
                onLoad={() => {
                    InterstitialTsAd({
                        spot: "ee9ab24036174503b1debe6c3ccc7fdf",
                        extid: "{extid}",
                    });
                }}
            />
            <div id="interstitial-ad"></div>
        </>
    );
};


export default InterstitialAds;

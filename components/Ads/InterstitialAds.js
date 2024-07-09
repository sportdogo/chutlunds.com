// components/InterstitialAd.js
import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';

const InterstitialAds = () => {
    useEffect(() => {
        if (typeof InterstitialTsAd !== 'undefined') {
            InterstitialTsAd({
                spot: "ee9ab24036174503b1debe6c3ccc7fdf",
                extid: "{extid}",
            });
        }
    }, []);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="//cdn.tsyndicate.com/sdk/v1/interstitial.ts.css" />
            </Head>

            <Script
                src="//cdn.tsyndicate.com/sdk/v1/interstitial.ts.js"
                strategy="lazyOnload"
            />

            <Script
                id={uniqid}
                dangerouslySetInnerHTML={{
                    __html: `InterstitialTsAd({
                        spot: "ee9ab24036174503b1debe6c3ccc7fdf",
                        extid: "{extid}",
                   });`,
                }}
                strategy="lazyOnload"
            />

            {/* Invisible Button */}
            <button
                ref={buttonRef}
                style={{ display: 'none' }}
                onClick={() => console.log('Button clicked')}
            >
                Invisible Button
            </button>
        </div>
    )
}

export default InterstitialAds;

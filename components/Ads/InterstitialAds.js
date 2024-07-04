import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

function InterstitialAds() {
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    const buttonRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (buttonRef.current) {
                buttonRef.current.click();
            }
        }, 2000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    return (
        <div className="">
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

import InterstitialAds from '@/components/Ads/InterstitialAds';
import React from 'react';
import Link from 'next/link';

import Script from 'next/script';

const MyComponent = () => (
    <>
        <Script id="cf-async-script" strategy="afterInteractive" data-cfasync="false">
            {`
                        (function(s,o,l,v,e,d){
                            if(s[o]==null&&s[l+e]){
                                s[o]="loading";
                                s[l+e](d,l=function(){
                                    s[o]="complete";
                                    s[v+e](d,l,!1)
                                },!1)
                            }
                        })(document,"readyState","add","remove","EventListener","DOMContentLoaded");
                    `}
        </Script>
        <Script
            src="https://cdn.twinrdsyn.com/Scripts/infinity.js.aspx?guid=4a3b3f72-a167-4c4f-b687-85573a103d70"
            id="infinity"
            data-guid="4a3b3f72-a167-4c4f-b687-85573a103d70"
            data-version="async"
            strategy="afterInteractive"
        />

        <div className='h-[500px] w-[500px] bg-red-300 m-auto flex items-center'>

            <Link className='mx-auto' href="/">Click me Popunder</Link>
        </div>
    </>
);

export default MyComponent;

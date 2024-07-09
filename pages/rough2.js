import InterstitialAds from '@/components/Ads/InterstitialAds';
import React from 'react';
import Link from 'next/link';

import Script from 'next/script';

const MyComponent = () => (
    <>
        <InterstitialAds />

        <div className='h-[500px] w-[500px] bg-red-300 m-auto flex items-center'>

            <Link className='mx-auto' href="/">Click me InterstitialAds</Link>
        </div>
    </>
);

export default MyComponent;

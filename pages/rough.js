import InterstitialAds from '@/components/Ads/InterstitialAds';
import React from 'react';
import Link from 'next/link';

export default function Rough() {
    return (
        <div>
            <Link href="/">
                <a>Click me</a>
            </Link>
            <InterstitialAds />
        </div>
    );
}

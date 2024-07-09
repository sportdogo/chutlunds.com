import InterstitialAds from '@/components/Ads/InterstitialAds';
import React from 'react';
import Link from 'next/link';

export default function Rough() {
    return (
        <div>
            <Link href="/">Click me</Link>
            <InterstitialAds />
        </div>
    );
}

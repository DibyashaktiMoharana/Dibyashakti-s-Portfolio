"use client";

import { useEffect, useState } from 'react';

export default function BackgroundVideo() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <video
            autoPlay
            muted
            loop
            playsInline
            className="fixed inset-0 w-full h-full object-cover z-[-1] opacity-40"
        >
            <source src="/background.mp4" type="video/mp4" />
        </video>
    );
}

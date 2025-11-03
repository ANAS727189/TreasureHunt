"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface RaccoonThiefProps {
    onRaccoonClick: () => void;
}

export default function RaccoonThief({ onRaccoonClick }: RaccoonThiefProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: "50%", left: "50%" });
    const movementIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const spawnRaccoon = () => {
            const top = Math.random() * 80 + 10;
            const left = Math.random() * 80 + 10;

            setPosition({
                top: `${top}%`,
                left: `${left}%`,
            });
            setIsVisible(true);

            const hideDelay = Math.random() * 500 + 1000; // Show for 1 to 1.5 seconds
            hideTimeoutRef.current = setTimeout(() => {
                setIsVisible(false);
            }, hideDelay);
        };

        const getRandomInterval = () => Math.random() * 7000 + 8000;

        const scheduleNextSpawn = () => {
            movementIntervalRef.current = setTimeout(() => {
                spawnRaccoon();
                scheduleNextSpawn();
            }, getRandomInterval());
        };

        scheduleNextSpawn();

        return () => {
            if (movementIntervalRef.current)
                clearTimeout(movementIntervalRef.current);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        };
    }, []);

    return (
        <div
            onClick={isVisible ? onRaccoonClick : undefined}
            style={{
                position: "fixed",
                top: position.top,
                left: position.left,
                transform: "translate(-50%, -50%)",
                width: "100px",
                height: "100px",
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.3s ease",
                zIndex: 9999,
                cursor: isVisible ? "pointer" : "default",
                pointerEvents: isVisible ? "auto" : "none",
            }}
            title="A wild raccoon appears! Click to chat..."
        >
            <Image
                src="/memes/raccoon.png"
                alt="A mischievous raccoon"
                width={100}
                height={100}
                priority
                style={{
                    filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))",
                }}
            />
        </div>
    );
}


'use client';

import { useState, useEffect } from 'react';

export function CountdownTimer({ targetDate }: { targetDate: string }) {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!isClient) {
        return (
            <div className="flex justify-center gap-4 md:gap-8 my-4">
                <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-primary">--</span>
                    <span className="text-xs uppercase text-muted-foreground">days</span>
                </div>
                 <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-primary">--</span>
                    <span className="text-xs uppercase text-muted-foreground">hours</span>
                </div>
                 <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-primary">--</span>
                    <span className="text-xs uppercase text-muted-foreground">minutes</span>
                </div>
                 <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-primary">--</span>
                    <span className="text-xs uppercase text-muted-foreground">seconds</span>
                </div>
            </div>
        );
    }

    const timerComponents = Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="flex flex-col items-center">
            <span className="text-4xl font-bold text-primary">{value.toString().padStart(2, '0')}</span>
            <span className="text-xs uppercase text-muted-foreground">{interval}</span>
        </div>
    ));

    return (
        <div className="flex justify-center gap-4 md:gap-8 my-4">
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
    );
}

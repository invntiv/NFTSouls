import React, { useEffect, useState } from 'react';
import '../styles/App.css';

function Countdown() {

    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();

        const difference = +new Date(`05/01/2022`) - +new Date();

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
        }
    
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [year] = useState(new Date().getFullYear());

    useEffect(() => {
        const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);

    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
        return;
    }
        timerComponents.push(
            <span>
            {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });

    return (
        <div>
            <h1>NFT {year} Countdown</h1>
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      
            <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span class="font-mono text-5xl countdown">
                <span style={{}} ></span>
                </span>
                    days
                
            </div> 
            <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span class="font-mono text-5xl countdown">
                <span style={{value: 15}} ></span>
                </span>
                    hours
                
            </div> 
            <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span class="font-mono text-5xl countdown">
                <span style={{value: 15}} ></span>
                </span>
                    min
                
            </div> 
            <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span class="font-mono text-5xl countdown">
                <span style={{value: 15}} ></span>
                </span>
                    sec
                
            </div>
            </div>
        </div>

    );
}

export default Countdown;
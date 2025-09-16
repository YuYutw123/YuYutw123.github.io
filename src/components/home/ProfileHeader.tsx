"use client";

import React, { useState, useEffect } from "react";

type ProfileHeaderProps = {
    name: string;
    titles: string[];
    avatarUrl: string;
    interval?: number;
};

export default function ProfileHeader({
    name,
    titles,
    avatarUrl,
    interval = 2000,
}: ProfileHeaderProps) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState<"forward" | "backward">("forward");

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => {
                if (direction === "forward") {
                    if (prev === titles.length - 1) {
                        setDirection("backward");
                        return prev - 1;
                    }
                    return prev + 1;
                } else {
                    if (prev === 0) {
                        setDirection("forward");
                        return prev + 1;
                    }
                    return prev - 1;
                }
            });
        }, interval);

        return () => clearInterval(timer);
    }, [titles.length, interval, direction]);

    return (
        <section className="mx-4 flex flex-col md:flex-row items-center gap-8 md:gap-12 rounded-xl bg-white p-8 shadow-blue-200 shadow-sm border border-gray-200">
            <div className="flex-shrink-0">
                <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-40 md:size-48 border-2 shadow-md shadow-blue-200 border-blue-100"
                    style={{ backgroundImage: `url("${avatarUrl}")` }}
                />
            </div>
            <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-shadow-sm">
                    {name}
                </h1>

                <div className="mt-2 h-6 overflow-hidden text-blue-500 text-base text-shadow-sm md:pl-0.5">
                    <div
                        className="transition-transform duration-700 ease-in-out"
                        style={{
                            transform: `translateY(-${index * 1.5}rem)`,
                        }}
                    >
                        {titles.map((title, i) => (
                            <div key={i} className="h-6 flex items-center justify-center md:justify-start">
                                {title}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

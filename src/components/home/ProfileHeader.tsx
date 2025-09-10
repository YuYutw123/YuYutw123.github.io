"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

type ProfileHeaderProps = {
    name: string;
    title: string;
    location: string;
    avatarUrl: string;
};

export default function ProfileHeader({
    name,
    title,
    location,
    avatarUrl,
}: ProfileHeaderProps) {
    return (
        <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12 rounded-xl bg-white p-8 shadow-sm border border-gray-200">
            <div className="flex-shrink-0">
                <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-40 md:size-48 border-4 border-blue-100"
                    style={{ backgroundImage: `url("${avatarUrl}")` }}
                />
            </div>
            <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    {name}
                </h1>
                <p className="mt-2 text-lg text-blue-600">{title}</p>
                <p className="mt-1 text-base text-gray-500 flex items-center justify-center md:justify-start gap-1">
                    <FontAwesomeIcon icon={faLocationDot} className="text-sm" />
                    {location}
                </p>
            </div>
        </section>
    );
}

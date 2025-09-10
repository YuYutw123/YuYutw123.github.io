"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type ActionButtonProps = {
    label: string;
    icon: IconDefinition;
    variant?: "primary" | "secondary";
    onClick?: () => void;
};

export default function ActionButton({
    label,
    icon,
    variant = "primary",
    onClick,
}: ActionButtonProps) {
    const base =
        "flex w-full items-center justify-center gap-2 rounded-lg h-11 px-4 text-base font-bold transition-transform hover:-translate-y-0.5";
    const variants = {
        primary: `${base} bg-blue-600 text-white hover:bg-blue-700`,
        secondary: `${base} bg-gray-200 text-gray-800 hover:bg-gray-300`,
    };

    return (
        <button className={variants[variant]} onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
            <span className="truncate">{label}</span>
        </button>
    );
}

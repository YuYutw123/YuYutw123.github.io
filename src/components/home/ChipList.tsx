"use client";

import React from "react";

type ChipListProps = {
    items: string[];
    variant?: "blue" | "gray";
};

const styles = {
    blue: "rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800",
    gray: "rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700",
};

export default function ChipList({ items, variant = "blue" }: ChipListProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {items.map((item) => (
                <span key={item} className={styles[variant]}>
                    {item}
                </span>
            ))}
        </div>
    );
}

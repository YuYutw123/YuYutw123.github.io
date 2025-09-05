"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="bg-gray-900 text-white shadow-md">
            <nav className="container mx-auto flex justify-between items-center px-4 py-4">
                <h1 className="text-xl font-bold">YuYutw123's Blog</h1>
                <ul className="flex space-x-6">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`hover:text-gray-300 ${
                                    pathname === item.href ? "text-yellow-400 font-semibold" : ""
                                }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

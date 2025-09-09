"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/idk" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="md:mx-4 rounded-b-md backdrop-blur-md bg-gray-900/70 text-white shadow-md sticky top-0 z-50 lg:px-48 px-4">
            <nav className="container mx-auto flex justify-between items-center px-4 py-3">
                {/* Logo */}
                <h1 className="text-md md:text-lg font-bold drop-shadow-glow">
                    <Link href="/" className="text-white">
                        YuYutw123
                    </Link>
                </h1>

                {/* Desktop nav */}
                <ul className="hidden md:flex relative space-x-6 rounded-lg md:text-md text-sm">
                    {navItems.map((item) => (
                        <li key={item.href} className="relative z-10">
                            <Link
                                href={item.href}
                                className={`px-2 py-1 block rounded-md transition-colors duration-300 ${
                                    pathname === item.href
                                        ? "text-gray-200 font-semibold"
                                        : "text-gray-200 hover:text-gray-300"
                                }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                </button>
            </nav>

            {/* Sidebar (mobile only) */}
            <div
                className={`fixed top-0 right-0 h-[100vh] w-64 bg-gray-900 backdrop-blur-md shadow-lg transform transition-transform duration-300 ease-in-out z-40
                ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button
                        className="text-white text-2xl"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <ul className="flex flex-col p-4 space-y-4 text-sm bg-gray-900/95">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`block px-2 py-2 rounded-md transition-colors duration-300 ${
                                    pathname === item.href
                                        ? "text-yellow-400 font-semibold"
                                        : "text-gray-200 hover:text-gray-300"
                                }`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Overlay when sidebar is open */}
            {menuOpen && (
                <div
                    className="w-[100vw] h-[100vh] fixed inset-0 bg-black/40 z-30"
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </header>
    );
}

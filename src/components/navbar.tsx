"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faTimes,
    faHome,
    faImages,
    faUser,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

interface NavItem {
    label: string;
    href: string;
    icon: IconDefinition;
}

const navItemsTheme: NavItem[] = [
    { label: "Home", href: "/", icon: faHome },
    { label: "About", href: "/about", icon: faUser },
    { label: "Gallery", href: "/gallery", icon: faImages },
];

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const navItems = navItemsTheme;

    const headerClasses = "bg-white text-blue-800 shadow-blue-200 shadow-sm";
    const logoClasses = "text-blue-600 font-bold";

    return (
        <header
            className={`sticky top-0 z-50 ${headerClasses} backdrop-blur-md rounded-b-md lg:px-48 px-4 md:mx-4 font-bold`}
        >
            <nav className="container mx-auto flex justify-between items-center px-4 py-3">
                {/* Logo */}
                <h1 className={`text-md md:text-lg ${logoClasses}`}>
                    <Link href="/">YuYutw123</Link>
                </h1>

                {/* Right side: desktop nav + theme switch + hamburger */}
                <div className="flex items-center gap-3 space-x-4 ">
                    {/* Desktop nav */}
                    <ul className="hidden md:flex text-sm md:text-md space-x-4 ">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`group flex items-center gap-2 px-2 py-1 rounded-md ${
                                        pathname === item.href
                                            ? "text-gray-900"
                                            : "text-gray-500 hover:text-gray-900"
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        className={`${
                                            pathname === item.href
                                                ? "text-gray-900 group-hover:text-gray-900"
                                                : "text-gray-500 group-hover:text-gray-900"
                                        }`}
                                    />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                    </button>
                </div>
            </nav>

            {/* Sidebar (mobile) */}
            <div
                className={`md:hidden fixed top-0 right-0 h-[100vh] w-64 transform transition-transform duration-300 ease-in-out z-40 ${
                    menuOpen ? "translate-x-0" : "translate-x-full"
                } ${"bg-gray-200 text-gray-800"} flex flex-col`}
            >
                {/* Sidebar header */}
                <div
                    className={`flex justify-between items-center p-4 ${
                        "border-b border-gray-300"
                    }`}
                >
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button
                        className="text-2xl"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                {/* Sidebar nav list (fills available height) */}
                <ul className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`flex items-center gap-2 px-2 py-2 rounded-md transition-colors hover:bg-gray-300 duration-300 ${
                                    pathname === item.href
                                        ? "bg-gray-300 text-gray-900"
                                        : "text-gray-700 font-semibold"
                                }`}
                                onClick={() => setMenuOpen(false)}
                            >
                                <FontAwesomeIcon icon={item.icon} />
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>

            {/* Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 w-[100vw] h-[100vh] bg-black/40 z-30"
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </header>
    );
}

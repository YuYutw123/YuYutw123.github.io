"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faTimes,
    faGamepad,
    faBriefcase,
    faHome,
    faFolder,
    faImages,
    faUser,
    faBook,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

interface NavItem {
    label: string;
    href: string;
    icon: IconDefinition;
}

const navItemsTheme1: NavItem[] = [
    { label: "Home", href: "/", icon: faHome },
    { label: "Projects", href: "/projects", icon: faFolder },
    { label: "Portfolio", href: "/portfolio", icon: faBook },
];

const navItemsTheme2: NavItem[] = [
    { label: "Home", href: "/", icon: faHome },
    { label: "About", href: "/about", icon: faUser },
    { label: "Gallery", href: "/gallery", icon: faImages },
];

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState<1 | 2>(1); // 1: default, 2: alternative
    const navItems = theme === 1 ? navItemsTheme1 : navItemsTheme2;

    // Header theme styles
    const headerClasses =
        theme === 1
            ? "bg-white shadow-blue-200 text-blue-800 shadow-sm"
            : "bg-gradient-br-header text-white shadow-md";

    const logoClasses =
        theme === 1 ? "text-blue-600 font-bold" : "text-gray-300 font-bold";

    return (
        <header
            className={`sticky top-0 z-50 ${headerClasses} backdrop-blur-md rounded-b-md lg:px-48 px-4 md:mx-4 font-bold`}
        >
            <nav className="container mx-auto flex justify-between items-center px-4 py-3">
                {/* Logo */}
                <h1 className={`text-md md:text-lg ${logoClasses}`}>
                    <Link href="/">
                        {theme === 1 ? "YuYutw123" : "YuYutw123"}
                    </Link>
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
                                            ? theme === 1
                                                ? "text-gray-900"
                                                : "text-blue-200"
                                            : theme === 1
                                            ? "text-gray-500 hover:text-gray-900"
                                            : "text-gradient-br hover:text-blue-200"
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        className={`${
                                            pathname === item.href
                                                ? theme === 1
                                                    ? "text-gray-900 group-hover:text-gray-900"
                                                    : "text-blue-200"
                                                : theme === 1
                                                ? "text-gray-500 group-hover:text-gray-900"
                                                : "text-pink-400 group-hover:text-blue-200"
                                        }`}
                                    />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop theme switch */}
                    <div
                        className={`hidden md:flex shadow-inner relative w-16 h-8 items-center rounded-md p-1 cursor-pointer select-none transition-colors duration-300 ${
                            theme === 1 ? "bg-gray-700" : "bg-gray-600"
                        }`}
                    >
                        {/* Knob */}
                        <div
                            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-md shadow-md transform transition-transform duration-300 ${
                                theme === 1 ? "translate-x-0" : "translate-x-8"
                            }`}
                        />
                        {/* Icons */}
                        <div
                            className={`absolute left-1.5 top-0.5 ${
                                theme === 1 ? "text-gray-800" : "text-gray-200"
                            }`}
                            onClick={() => setTheme(1)}
                        >
                            <FontAwesomeIcon icon={faBriefcase} />
                        </div>
                        <div
                            className={`absolute right-1.5 top-0.5 ${
                                theme === 1 ? "text-gray-200" : "text-gray-800"
                            }`}
                            onClick={() => setTheme(2)}
                        >
                            <FontAwesomeIcon icon={faGamepad} />
                        </div>
                    </div>

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
                } ${
                    theme === 1
                        ? "bg-gray-200 text-gray-800"
                        : "bg-gradient-br-header text-white"
                } flex flex-col`}
            >
                {/* Sidebar header */}
                <div
                    className={`flex justify-between items-center p-4 ${
                        theme === 1
                            ? "border-b border-gray-300"
                            : "border-b border-white/20"
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
                                className={`flex items-center gap-2 px-2 py-2 rounded-md transition-colors duration-300 ${
                                    pathname === item.href
                                        ? theme === 1
                                            ? "text-gray-900 font-semibold"
                                            : "text-blue-200 font-semibold"
                                        : theme === 1
                                        ? "hover:bg-gray-300"
                                        : "hover:bg-purple-700/50"
                                }`}
                                onClick={() => setMenuOpen(false)}
                            >
                                <FontAwesomeIcon icon={item.icon} />
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Bottom theme switch (fixed at sidebar bottom) */}
                <div
                    className={`p-4 pt-3 ${
                        theme === 1
                            ? "border-t border-gray-300"
                            : "border-t border-white/20"
                    } pb-[max(1rem,env(safe-area-inset-bottom))] flex justify-end`}
                >
                    <div
                        className={`shadow-inner relative w-16 h-8 flex items-center rounded-md p-1 cursor-pointer select-none transition-colors duration-300 ${
                            theme === 1 ? "bg-gray-700" : "bg-gray-600"
                        }`}
                    >
                        {/* Knob */}
                        <div
                            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-md shadow-md transform transition-transform duration-300 ${
                                theme === 1 ? "translate-x-0" : "translate-x-8"
                            }`}
                        />
                        {/* Icons */}
                        <div
                            className={`absolute left-1.5 top-0.5 ${
                                theme === 1 ? "text-gray-800" : "text-gray-200"
                            }`}
                            onClick={() => setTheme(1)}
                        >
                            <FontAwesomeIcon icon={faBriefcase} />
                        </div>
                        <div
                            className={`absolute right-1.5 top-0.5 ${
                                theme === 1 ? "text-gray-200" : "text-gray-800"
                            }`}
                            onClick={() => setTheme(2)}
                        >
                            <FontAwesomeIcon icon={faGamepad} />
                        </div>
                    </div>
                </div>
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

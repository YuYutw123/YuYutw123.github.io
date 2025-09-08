"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

    return (
        <header className="mx-4 rounded-b-md backdrop-blur-md bg-gray-900/70 text-white shadow-md sticky top-0 z-50 lg:px-48 px-4">
            <nav className="container mx-auto flex justify-between items-center px-4 py-3">
                <h1 className="text-md md:text-lg font-bold drop-shadow-glow">
                    <Link href={`/`} className="text-white">
                        YuYutw123
                    </Link>
                </h1>
                <ul className="relative flex space-x-6 rounded-lg md:text-md text-sm">
                    {navItems.map((item) => (
                        <li key={item.href} className="relative z-10">
                            <Link
                                href={`${item.href}`}
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
            </nav>
        </header>
    );
}

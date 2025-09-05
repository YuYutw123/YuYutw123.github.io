import type { Metadata } from "next";
import "../../styles/globals.css";

export const metadata: Metadata = {
    title: "About - YuYutw123's Blog",
    description: "Learn more about me and my blog",
};

export default function AboutLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html>
            <body>
                {/* Navbar */}
                <header className="bg-gray-900 text-white py-4 shadow-md">
                    <nav className="container mx-auto flex justify-between items-center px-4">
                        <h1 className="text-xl font-bold">YuYutw123's Blog</h1>
                        <ul className="flex space-x-4">
                            <li>
                                <a href="/" className="hover:text-gray-300">Home</a>
                            </li>
                            <li>
                                <a href="/about" className="hover:text-gray-300">About</a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:text-gray-300">Contact</a>
                            </li>
                        </ul>
                    </nav>
                </header>

                {/* 主要內容 */}
                <main className="container mx-auto px-4 py-8">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-gray-100 text-gray-700 py-6 mt-12 text-center">
                    &copy; {new Date().getFullYear()} YuYutw123. All rights reserved.
                </footer>
            </body>
        </html>
    );
}

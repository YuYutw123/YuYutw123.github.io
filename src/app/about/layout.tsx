import type { Metadata } from "next";
import "../../styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "About - YuYutw123's Blog",
    description: "Learn more about me and my blog",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            <main className="container mx-auto px-4 py-8">{children}</main>
        </div>
    );
}

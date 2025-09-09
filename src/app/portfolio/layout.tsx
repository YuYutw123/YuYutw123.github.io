import type { Metadata } from "next";
import "../../styles/globals.css";

export const metadata: Metadata = {
    title: "About - YuYutw123's Blog",
    description: "Learn more about me and my blog",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <main className="container md:mx-auto md:px-4">{children}</main>
        </div>
    );
}

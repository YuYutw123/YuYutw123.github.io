import type { Metadata } from "next";
import "../../styles/globals.css";

export const metadata: Metadata = {
    title: "Gallery - YuYutw123's Blog",
    description: "Some pics.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <main className="container md:mx-auto md:px-4">{children}</main>
        </div>
    );
}

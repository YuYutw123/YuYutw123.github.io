import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
    title: "YuYutw123's Blog",
    description: "Wanna sleep zzZ...",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body>
                <Navbar />
                <div className="overflow-x-hidden md:container lg:mx-auto md:px-4 lg:w-[60vw] min-h-[100vh]">
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}

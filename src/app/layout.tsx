import type { Metadata } from "next";
import "../styles/globals.css";

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
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}

"use client";

import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

const getSavedTheme = () => window.localStorage.getItem("theme") || "light";

const Comments = () => {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto");

    useEffect(() => {
        // 指定事件型別
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "theme") {
                const newTheme =
                    event.newValue === "auto"
                        ? getSystemTheme()
                        : (event.newValue as "light" | "dark") || "light";
                setTheme(newTheme);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        // 初始 theme 設定
        const savedTheme = getSavedTheme();
        setTheme(savedTheme === "auto" ? getSystemTheme() : (savedTheme as "light" | "dark"));

        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // 避免 SSR hydration error

    return (
        <div id="inject-comments" className="w-full">
            <Giscus
                id="inject-comments"
                repo="YuYutw123/YuYutw123.github.io"
                repoId="R_kgDONUsJVg"
                category="Announcements"
                categoryId="DIC_kwDONUsJVs4CkrUq"
                mapping="title"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                lang="en"
                loading="lazy"
                theme={theme === "auto" ? getSystemTheme() : theme}
            />
        </div>
    );
};

export default Comments;

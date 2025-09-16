"use client";

import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

const Comments = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

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
                theme={"light"}
            />
        </div>
    );
};

export default Comments;

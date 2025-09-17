// tocClient.tsx
"use client";
import TOC from "./toc";
import { useTOC } from "@/lib/useTOC";
import { useEffect, useState } from "react";

interface TOCClientProps {
    postId: string;
}

export default function TOCClient({ postId }: TOCClientProps) {
    const [content, setContent] = useState("");

    useEffect(() => {
        fetch(`/posts/${postId}.md`)
            .then(res => res.text())
            .then(setContent);
    }, [postId]);

    const toc = useTOC(content);
    if (!content) return null;
    return <TOC toc={toc} />;
}
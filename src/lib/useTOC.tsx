"use client";
import { useState, useEffect } from "react";
import { generateId } from "./generateId";

export interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export function useTOC(content: string) {
    const [toc, setToc] = useState<TOCItem[]>([]);

    useEffect(() => {
        const headingRegex = /^(#{1,6})\s+(.*)$/gm;
        const matches = Array.from(content.matchAll(headingRegex));
        const tocItems = matches.map((match) => {
            const level = match[1].length;
            const text = match[2].trim();
            
            const matchIndex = match.index || 0;
            const lineNumber = content.substring(0, matchIndex).split('\n').length;
            const id = generateId(text, lineNumber);
            return { id, text, level };
        });
        setToc(tocItems);
        console.log("Generated TOC:", tocItems);
    }, [content]);

    return toc;
}
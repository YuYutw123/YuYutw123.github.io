"use client";
import { useState, HTMLAttributes } from "react";
import { getTextFromReactNode } from "@/lib/getTextFromReactNode";

export default function PreBlock(props: HTMLAttributes<HTMLPreElement>) {
    const [copied, setCopied] = useState(false);

    const codeString = getTextFromReactNode(props.children).replace(/\n$/, "");

    const handleCopy = async () => {
        await navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-4">
            <pre {...props}>{props.children}</pre>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 px-2 py-1 text-xs 
                        bg-gray-200 hover:bg-gray-300 rounded-md
                        opacity-0 group-hover:opacity-100 transition"
            >
                {copied ? "Copied!" : "Copy"}
            </button>
        </div>
    );
}

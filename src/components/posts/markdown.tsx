'use client';

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkAdmonition from "@/lib/remarkAdmonition";
import rehypeHighlight from "rehype-highlight";

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="markdown">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkDirective, remarkAdmonition]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    a: ({...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {props.children}
                        </a>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

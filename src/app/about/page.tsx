import fs from "fs";
import path from "path";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import markdownStyles from '../../styles/markdown.module.css';
import admonitionStyles from '../../styles/admonition.module.css';
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkAdmonition from "@/lib/remarkAdmonition";

export default function AboutPage() {
    const markdownFilePath = path.join(process.cwd(), "src/posts/spec/About.md");
    const fileContents = fs.readFileSync(markdownFilePath, "utf-8");

    return (
        <div className={`prose mx-auto px-4 py-8 ${markdownStyles.markdown} ${admonitionStyles.admonitionWrapper}`}>
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
                {fileContents}
            </ReactMarkdown>
        </div>
    );
}

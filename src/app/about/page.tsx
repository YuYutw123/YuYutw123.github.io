import fs from "fs";
import path from "path";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

export default function AboutPage() {
    const markdownFilePath = path.join(process.cwd(), "src/posts/spec/about.md");
    const fileContents = fs.readFileSync(markdownFilePath, "utf-8");

    return (
        <div className="prose mx-auto px-4 py-8">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {fileContents}
            </ReactMarkdown>
        </div>
    );
}

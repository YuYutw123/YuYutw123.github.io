import fs from "fs";
import path from "path";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import markdownStyles from '../../styles/markdown.module.css';
import admonitionStyles from '../../styles/admonition.module.css';

export default function AboutPage() {
    const markdownFilePath = path.join(process.cwd(), "src/posts/spec/about.md");
    const fileContents = fs.readFileSync(markdownFilePath, "utf-8");

    return (
        <div className={`prose mx-auto px-4 py-8 ${markdownStyles.markdown} ${admonitionStyles.admonitionWrapper}`}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {fileContents}
            </ReactMarkdown>
        </div>
    );
}

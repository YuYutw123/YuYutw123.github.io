import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkAdmonition from "@/lib/remarkAdmonition";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";
import remarkSpoiler from "@/lib/remarkSpoiler";
// import remarkEmoji from "remark-emoji";
// import remarkGemoji from "remark-gemoji";
import CodeBlock from "./codeBlock";
import PreBlock from "./preBlock";
import { generateId } from "@/lib/generateId";

interface MarkdownRendererProps {
    content: string;
}

type CustomComponents = Components & {
    spoiler?: React.ComponentType<{ children?: React.ReactNode }>;
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="markdown relative">
            <ReactMarkdown
                remarkPlugins={[
                    remarkGfm,
                    remarkDirective,
                    remarkAdmonition,
                    remarkBreaks,
                    remarkSpoiler,
                    // remarkEmoji,
                    // remarkGemoji
                ]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    a: ({ children, ...props }) => (
                        <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            {children}
                        </a>
                    ),
                    code: CodeBlock,
                    pre: PreBlock,
                    h1: ({ children, node }) => {
                        const text = String(children);
                        const lineNumber = node?.position?.start.line ?? 0;
                        const id = generateId(text, lineNumber);
                        return <h1 id={id}>{children}</h1>;
                    },
                    h2: ({ children, node }) => {
                        const text = String(children);
                        const lineNumber = node?.position?.start.line ?? 0;
                        const id = generateId(text, lineNumber);
                        return <h2 id={id}>{children}</h2>;
                    },
                    h3: ({ children, node }) => {
                        const text = String(children);
                        const lineNumber = node?.position?.start.line ?? 0;
                        const id = generateId(text, lineNumber);
                        return <h3 id={id}>{children}</h3>;
                    },
                    spoiler: ({ children }) => <span className="spoiler">{children}</span>,
                } as CustomComponents}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
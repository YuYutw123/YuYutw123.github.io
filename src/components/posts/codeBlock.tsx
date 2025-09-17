import { ReactNode } from "react";

interface CodeProps {
    className?: string;
    children?: ReactNode;
}

export default function CodeBlock({ className, children, ...props }: CodeProps) {
    return (
        <code className={className} {...props}>
            {children}
        </code>
    );
}

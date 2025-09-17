import { ReactNode, ReactElement } from "react";

function isReactElementWithChildren(node: ReactNode): node is ReactElement<{ children?: ReactNode }> {
    return typeof node === "object" && node !== null && "props" in node;
}

export function getTextFromReactNode(node: ReactNode): string {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(getTextFromReactNode).join("");
    if (isReactElementWithChildren(node)) {
        return getTextFromReactNode(node.props.children);
    }
    return "";
}

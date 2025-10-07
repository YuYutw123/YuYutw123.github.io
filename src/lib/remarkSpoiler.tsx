import { visit } from "unist-util-visit";
import type { Root, Parent, Text, PhrasingContent } from "mdast";

export default function remarkSpoiler() {
    return (tree: Root) => {
        visit(tree, "text", (node: Text, index, parent: Parent | undefined) => {
            if (!parent || typeof node.value !== "string") return;

            const regex = /\|\|(.*?)\|\|/g;
            const newNodes: PhrasingContent[] = [];
            let lastIndex = 0;
            let match: RegExpExecArray | null;

            while ((match = regex.exec(node.value)) !== null) {
                if (match.index > lastIndex) {
                    newNodes.push({
                        type: "text",
                        value: node.value.slice(lastIndex, match.index),
                    });
                }

                // 使用 Text 節點 + data.hName
                newNodes.push({
                    type: "text",
                    value: match[1],
                    data: { hName: "span", hProperties: { className: "spoiler" } },
                });

                lastIndex = regex.lastIndex;
            }

            if (lastIndex < node.value.length) {
                newNodes.push({
                    type: "text",
                    value: node.value.slice(lastIndex),
                });
            }

            parent.children.splice(index!, 1, ...newNodes);
        });
    };
}

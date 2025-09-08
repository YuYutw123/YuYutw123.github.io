import { visit } from "unist-util-visit";
import { Root, Parent, Literal } from "mdast";
import { Node } from "unist";

interface DirectiveNode extends Parent {
    type: "containerDirective" | "leafDirective" | "textDirective";
    name: string;
    data?: Record<string, unknown>; // 不使用 any
}

export default function remarkAdmonition() {
    return (tree: Root) => {
        visit(tree, (node: Node) => {
            if ((node as DirectiveNode).type === "containerDirective") {
                const directiveNode = node as DirectiveNode;
                if (!directiveNode.data) {
                    directiveNode.data = {};
                }
                // 明確地告訴 TypeScript data 是 Record<string, unknown>
                const data = directiveNode.data as Record<string, unknown>;
                data.hName = "div";
                data.hProperties = {
                    className: ["admonition", directiveNode.name],
                };
            }
        });
    };
}

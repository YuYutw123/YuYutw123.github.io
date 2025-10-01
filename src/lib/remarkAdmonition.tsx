import { visit } from "unist-util-visit";
import { Root, Parent } from "mdast";
import { Node } from "unist";

interface DirectiveNode extends Parent {
    type: "containerDirective" | "leafDirective" | "textDirective";
    name: string;
    data?: Record<string, unknown>;
}

export default function remarkAdmonition() {
    return (tree: Root) => {
        visit(tree, (node: Node) => {
            const directiveNode = node as DirectiveNode;

            // 只處理 containerDirective (:::note / :::tip / :::warning)
            if (directiveNode.type !== "containerDirective") {
                return;
            }

            // 僅允許特定名稱的 directive
            const allowed = ["note", "tip", "warning", "important"];
            if (!allowed.includes(directiveNode.name)) {
                return;
            }

            if (!directiveNode.data) {
                directiveNode.data = {};
            }

            const data = directiveNode.data as Record<string, unknown>;
            data.hName = "div";
            data.hProperties = {
                className: ["admonition", directiveNode.name],
            };
        });
    };
}

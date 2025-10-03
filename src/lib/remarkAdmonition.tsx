import { visit } from "unist-util-visit";
import { Root, Parent, Text } from "mdast";
import { Node } from "unist";

interface DirectiveNode extends Parent {
    type: "containerDirective" | "leafDirective" | "textDirective";
    name: string;
    data?: Record<string, unknown>;
    value?: string;
}

export default function remarkAdmonition() {
    return (tree: Root) => {
        visit(tree, (node: Node, index, parent) => {
            const directiveNode = node as DirectiveNode;

            if (directiveNode.type === "textDirective" || directiveNode.type === "leafDirective") {
                if (parent && typeof index === "number") {
                    (parent as Parent).children[index] = {
                        type: "text",
                        value: `:${directiveNode.name}`,
                    } as Text;
                }
                return;
            }

            if (directiveNode.type === "containerDirective") {
                const allowed = ["info", "warning"];
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
            }
        });
    };
}

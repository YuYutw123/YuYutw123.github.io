import type { ComponentType, ReactNode } from "react";
import type { Spoiler } from "mdast";

declare module "react-markdown" {
    interface Components {
        spoiler?: ComponentType<{ node: Spoiler; children: ReactNode }>;
    }
}

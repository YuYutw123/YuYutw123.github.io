// types/react-markdown-spoiler.d.ts
import type { ComponentType, ReactNode } from "react";
import type { SpoilerNode } from "@/lib/remarkSpoiler";

declare module "react-markdown" {
    interface Components {
        spoiler?: ComponentType<{ node: SpoilerNode; children: ReactNode }>;
    }
}

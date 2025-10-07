// types/mdast.d.ts
import type { SpoilerNode } from "@/lib/remarkSpoiler";

declare module "mdast" {
    interface PhrasingContentMap {
        spoiler: SpoilerNode;
    }
}

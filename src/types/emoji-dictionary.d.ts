declare module "emoji-dictionary" {
    export function getUnicode(name: string): string | undefined;
    export function getName(emoji: string): string | undefined;
    export function getNames(): string[];
    export function hasEmoji(name: string): boolean;
}

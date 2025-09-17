

export function generateId(text: string, index: number | string) {
    return text.toLowerCase().replace(/[^\w]+/g, "-") + "-" + index;
}
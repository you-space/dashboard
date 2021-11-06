export function convertNumberToPixel(value: number) {
    if (typeof value === "string") {
        return value;
    }

    return `${value}px`;
}

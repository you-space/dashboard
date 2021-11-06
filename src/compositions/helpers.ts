import { computed } from "vue";

export function convertNumberToPixel(value: number) {
    if (typeof value === "string") {
        return value;
    }

    return `${value}px`;
}

export function useModel<T = any>(
    props: Record<string, any>,
    name: string,
    emit: any
) {
    return computed<T>({
        get() {
            return props[name] as any;
        },
        set(value) {
            emit(`update:${name}`, value);
        },
    });
}

import { computed } from "vue";

function isPixelMeasure(value: string): boolean {
    return value.endsWith("px");
}
function isPercentageMeasure(value: string): boolean {
    return value.endsWith("%");
}

function toMeasure(value: number | string) {
    if (isPixelMeasure(value.toString())) {
        return value;
    }

    if (isPercentageMeasure(value.toString())) {
        return value;
    }

    return `${value}px`;
}

export const css = {
    toMeasure: toMeasure,
};

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

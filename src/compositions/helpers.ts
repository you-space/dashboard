import lodash from "lodash";
import colors from "tailwindcss/colors";

import { computed } from "vue";

const allColors = {
    ...colors,
    primary: "var(--theme-primary)",
};

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
function toColor(value: string) {
    if (value.startsWith("#")) {
        return value;
    }

    const color = lodash.get(allColors, value.replace("-", "."), null);

    return color || value;
}

export const css = {
    toMeasure,
    toColor,
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

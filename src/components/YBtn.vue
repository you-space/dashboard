<script lang="ts" setup>
import { css } from "@/compositions/helpers";
import { PropType, computed } from "vue";

const props = defineProps({
    label: {
        type: String,
        default: "",
    },
    color: {
        type: String,
        default: "gray-500",
    },
    darkColor: {
        type: String,
        default: "white",
    },
    textColor: {
        type: String,
        default: "white",
    },
    darkTextColor: {
        type: String,
        default: undefined,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String as PropType<"sm" | "md">,
        default: "md",
    },
    to: {
        type: [Object, String],
        default: null,
    },
    outlined: {
        type: Boolean,
        default: false,
    },
    text: {
        type: Boolean,
        default: false,
    },
    rounded: {
        type: Boolean,
        default: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const sizes = {
    sm: "py-2 px-3 text-sm",
    md: "py-2 px-4 text-sm",
};

const styles = computed(() => {
    const result = {
        "--color": css.toColor(props.color),
        "--text-color": css.toColor(props.textColor),
        "--dark-color": css.toColor(props.color),
        "--dark-text-color": css.toColor(props.textColor),
    };

    if (props.darkColor) {
        result["--dark-color"] = css.toColor(props.darkColor);
    }

    if (props.darkTextColor) {
        result["--dark-text-color"] = css.toColor(props.darkTextColor);
    }

    return result;
});

const classes = computed(() => {
    const result = ["uppercase", "min-w-20", sizes[props.size] || sizes.md];

    if (props.rounded) {
        result.push("rounded");
    }

    if (props.outlined) {
        result.push("y-btn-outlined");
    }

    if (props.disabled) {
        result.push("opacity-50 cursor-not-allowed");
    }

    if (props.text) {
        result.push("y-btn-text");
    }

    return result;
});
</script>

<template>
    <component
        :is="to ? 'router-link' : 'button'"
        v-bind="$attrs"
        class="y-btn"
        :class="classes"
        :to="to"
        :style="styles"
    >
        <template v-if="label">
            {{ label }}
        </template>

        <slot />

        <div
            v-if="loading"
            class="absolute inset-0 flex items-center justify-center"
            :class="`bg-${color}`"
        >
            <!-- <y-spin :class="`text-${textColor}`" /> -->
        </div>
    </component>
</template>

<style lang="scss">
.y-btn {
    @apply relative inline-flex;
    @apply cursor-pointer;
    @apply focus:outline-none;
    @apply font-bold;
    @apply transition-colors;

    --text-color: white;
    --color: blue;

    --dark-color: var(--color);
    --dark-text-color: var(--text-color);

    background-color: var(--color);
    color: var(--text-color);
    z-index: 1;

    &.y-btn-outlined {
        @apply border;
        background-color: transparent;
        border-color: var(--color);
        color: var(--color);

        &:after {
            @apply absolute inset-0;
            content: "";
            background-color: var(--color);
            opacity: 0;
            z-index: -1;
        }

        &:hover:after {
            opacity: 0.1;
        }
    }

    &.y-btn-text {
        background-color: transparent;
        color: var(--color);

        .dark & {
            color: var(--dark-color);
        }

        &:after {
            @apply absolute inset-0;
            content: "";
            background-color: var(--color);
            opacity: 0;
            z-index: -1;
        }

        &:hover:after {
            opacity: 0.1;
        }
    }
}
</style>

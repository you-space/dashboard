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
        default: "primary",
    },
    textColor: {
        type: String,
        default: "white",
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

const styles = computed(() => ({
    "--bg-color": props.outlined
        ? css.toColor("transparent")
        : css.toColor(props.color),
    "--text-color": props.outlined
        ? css.toColor(props.color)
        : css.toColor(props.textColor),
}));

const classes = computed(() => {
    const result = ["uppercase", "min-w-20", sizes[props.size] || sizes.md];

    if (props.rounded) {
        result.push("rounded");
    }

    if (props.outlined) {
        result.push(`border border-${props.color} `);
    }

    if (props.disabled) {
        result.push("opacity-50 cursor-not-allowed");
    }

    return result;
});
</script>

<template>
    <component
        :is="to ? 'router-link' : 'button'"
        v-bind="$attrs"
        :tag="to ? 'button' : undefined"
        class="yt-btn"
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
            <!-- <yt-spin :class="`text-${textColor}`" /> -->
        </div>
    </component>
</template>

<style lang="scss">
.yt-btn {
    @apply relative;
    @apply cursor-pointer;
    @apply focus:outline-none;
    @apply font-bold;

    --text-color: white;
    --bg-color: var(--theme-primary);

    background-color: var(--bg-color);
    color: var(--text-color);
}
</style>

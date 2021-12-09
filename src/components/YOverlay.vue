<script setup lang="ts">
import { css } from "@/compositions/helpers";
import { computed } from "vue";

const props = defineProps({
    color: {
        type: String,
        default: "black",
    },
    opacity: {
        type: Number,
        default: 0.5,
    },
    zIndex: {
        type: Number,
        default: 10,
    },
    absolute: {
        type: Boolean,
        default: false,
    },
});

const style = computed<any>(() => ({
    "--color": css.toColor(props.color),
    "--opacity": props.opacity,
    "--z-index": props.zIndex,
}));

const classes = computed(() => {
    const result = ["y-overlay", "inset-0"];

    if (props.absolute) {
        result.push("absolute");
    }

    if (!props.absolute) {
        result.push("fixed");
    }

    result.push(`z-${props.zIndex}`);

    return result;
});
</script>
<template>
    <div :class="classes" :style="style"></div>
</template>

<style lang="scss">
.y-overlay {
    @apply cursor-default;

    --color: black;
    --opacity: 0.5;
    --z-index: 10;
    background-color: var(--color);
    opacity: var(--opacity);
    z-index: var(--z-index);
}
</style>

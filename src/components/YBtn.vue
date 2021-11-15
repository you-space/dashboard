<template>
    <button class="yt-btn" v-bind="$attrs" :class="classes">
        <template v-if="label">
            {{ label }}
        </template>

        <slot v-else />

        <div
            v-if="loading"
            class="absolute inset-0 flex items-center justify-center"
            :class="`bg-${color}`"
        >
            <!-- <yt-spin :class="`text-${textColor}`" /> -->
        </div>
    </button>
</template>
<script lang="ts" setup>
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
});

const sizes = {
    sm: "py-2 px-3 text-sm",
    md: "py-2 px-4 text-sm",
};

const classes = computed(() => [
    "uppercase",
    `bg-${props.color}`,
    `text-${props.textColor}`,
    sizes[props.size] || sizes.md,
]);
</script>
<style lang="scss">
.yt-btn {
    @apply relative;
    @apply rounded cursor-pointer;
    @apply focus:outline-none border;
    @apply font-bold;
}
</style>

<template>
    <router-link
        v-if="to"
        tag="button"
        class="yt-btn"
        v-bind="$attrs"
        :class="classes"
        :to="to"
    >
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
    </router-link>

    <button v-else class="yt-btn" v-bind="$attrs" :class="classes">
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
import { RouterLinkProps } from "vue-router";

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
});

const sizes = {
    sm: "py-2 px-3 text-sm",
    md: "py-2 px-4 text-sm",
};

const classes = computed(() => {
    const result = ["uppercase", sizes[props.size] || sizes.md];

    if (props.rounded) {
        result.push("rounded");
    }

    if (props.outlined) {
        result.push(`border border-${props.color} text-${props.color}`);
    } else {
        result.push(`bg-${props.color} text-${props.textColor}`);
    }

    return result;
});
</script>
<style lang="scss">
.yt-btn {
    @apply relative;
    @apply cursor-pointer;
    @apply focus:outline-none border dark:border-transparent;
    @apply font-bold;
}
</style>

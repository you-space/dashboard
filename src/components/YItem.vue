<template>
    <router-link v-if="to" v-bind="attrs" :to="to">
        <slot />
    </router-link>

    <div v-else v-bind="attrs">
        <slot />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        to: {
            type: [Object, String],
            default: null,
        },
        clickable: {
            type: Boolean,
            default: false,
        },
        exactActiveClass: {
            type: String,
            default: "y-item-active",
        },
        noPadding: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const classes = ["y-item"];

        if (props.to || props.clickable) {
            classes.push("y-item-clickable");
        }

        if (!props.noPadding) {
            classes.push("px-6 py-3");
        }

        const attrs = {
            class: classes,
            exactActiveClass: props.to ? props.exactActiveClass : undefined,
        };

        return {
            attrs,
        };
    },
});
</script>

<style lang="postcss">
.y-item {
    @apply flex items-center w-full;
}

.y-item-clickable {
    @apply cursor-pointer;
    @apply hover:bg-gray-200 dark:hover:bg-gray-600;
}

.y-item-active {
    @apply bg-gray-100 dark:bg-gray-600;
}
</style>

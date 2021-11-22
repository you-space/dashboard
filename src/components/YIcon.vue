<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { computed, PropType } from "vue";

library.add(fas);

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    clickable: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String as PropType<"md">,
        default: "md",
    },
});

const classes = computed(() => {
    const sizes = {
        md: "h-8 w-8 text-base",
    };

    const result = [
        "y-icon",
        props.clickable ? "y-icon-clickable" : "",
        sizes[props.size] || sizes.md,
    ];

    return result;
});
</script>
<template>
    <i :class="classes">
        <font-awesome-icon :icon="name" />
    </i>
</template>

<style lang="scss">
.y-icon {
    @apply flex items-center justify-center;
    @apply rounded-full text-sm;

    &.y-icon-clickable {
        @apply cursor-pointer;
        @apply transition-colors;
        @apply hover:bg-gray-200;
    }
}
</style>

<script lang="ts" setup>
import { css } from "@/compositions/helpers";
import { computed } from "vue";

const props = defineProps({
    color: {
        type: String,
        default: "white",
    },
    textColor: {
        type: String,
        default: "coolGray-500",
    },
    darkColor: {
        type: String,
        default: "coolGray-800",
    },
    darkTextColor: {
        type: String,
        default: "coolGray-100",
    },
    shadow: {
        type: String,
        default: "sm",
    },
});

const style = computed<any>(() => ({
    "--bg-color": css.toColor(props.color),
    "--text-color": css.toColor(props.textColor),
    "--dark-bg-color": css.toColor(props.darkColor),
    "--dark-text-color": css.toColor(props.darkTextColor),
}));

const classes = computed(() => [`shadow-${props.shadow}`]);
</script>
<template>
    <div class="y-card" :style="style" :class="classes">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.y-card {
    @apply rounded bg-white;

    --bg-color: white;
    --text-color: black;
    --dark-bg-color: #eee;
    --dark-text-color: white;
    background-color: var(--bg-color);
    color: var(--text-color);
}

.dark {
    .y-card {
        background-color: var(--dark-bg-color);
        color: var(--dark-text-color);
    }
}
</style>

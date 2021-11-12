<template>
    <button
        class="yt-btn"
        v-bind="$attrs"
        :class="`px-4 py-2 text-sm uppercase bg-${color} text-${textColor}`"
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
    </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
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
    },
});
</script>
<style lang="postcss">
.yt-btn {
    @apply relative;
    @apply rounded cursor-pointer;
    @apply focus:outline-none border;
    @apply font-bold;
}
</style>

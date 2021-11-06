<template>
    <div class="yt-toolbar" :style="style">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, Ref, watch, computed } from "vue";

export default defineComponent({
    props: {
        height: {
            type: [String, Number],
            default: 55,
        },
    },
    setup(props) {
        const header = inject<Ref>("layout:header");

        function setHeight() {
            if (header) {
                header.value = {
                    height: props.height,
                };
            }
        }

        watch(() => props.height, setHeight, { immediate: true });

        const style = computed(() => {
            return {
                height: `${props.height}px`,
            };
        });

        return {
            style,
        };
    },
});
</script>

<style lang="postcss">
.yt-toolbar {
    @apply transition-colors  ease-in-out;
    @apply flex flex-wrap items-center w-full;
    @apply border-b dark:border-transparent;
    @apply dark:bg-gray-800;
}
</style>

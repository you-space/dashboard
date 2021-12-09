<template>
    <div class="y-content" :style="style">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, Ref } from "vue";

export default defineComponent({
    setup() {
        const content = inject<Ref>("layout:content");

        const style = computed(() => {
            return {
                height: "100%",
                width: "100%",
                ...content?.value,
            };
        });

        return {
            style,
        };
    },
});
</script>

<style lang="scss">
.y-content {
    @apply transition-width  ease-in-out;
    @apply overflow-auto;
    @apply dark:bg-gray-700;

    scroll-behavior: smooth;
}
</style>

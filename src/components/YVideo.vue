<script setup lang="ts">
import { css } from "@/compositions/helpers";
import { computed, StyleValue } from "vue";

const props = defineProps({
    src: {
        type: String,
        default: "",
    },
    height: {
        type: [String, Number],
        default: "100%",
    },
    width: {
        type: [String, Number],
        default: "100%",
    },
});

const style = computed<StyleValue>(() => ({
    "--height": css.toMeasure(props.height),
    "--width": css.toMeasure(props.width),
}));
</script>

<template>
    <div class="y-video w-full" :style="style">
        <iframe v-if="src.includes('youtube.com')" :src="src"></iframe>
        <video v-else :src="src" controls></video>
    </div>
</template>

<style lang="scss">
.y-video {
    --height: 100%;
    --width: 100%;
    position: relative;
    width: var(--width);
    height: var(--height);

    iframe {
        width: var(--width);
        height: var(--height);
    }
}
</style>

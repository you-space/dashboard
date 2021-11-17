<template>
    <img class="responsive-img object-cover" :style="style" :src="src" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { css } from "@/compositions/helpers";

export default defineComponent({
    props: {
        src: {
            type: String,
            default: null,
        },
        height: {
            type: [String, Number],
            default: "auto",
        },
        width: {
            type: [String, Number],
            default: "100%",
        },
    },
    setup(props) {
        const style = {
            height: css.toMeasure(props.height),
            width: css.toMeasure(props.width),
        };

        return {
            style,
        };
    },
});
</script>

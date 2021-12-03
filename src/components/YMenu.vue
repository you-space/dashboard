<script setup lang="ts">
import { ref, computed } from "vue";
import { css, useModel } from "@/compositions/helpers";

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: null,
    },
    width: {
        type: [String, Number],
        default: "auto",
    },
    closeOnClickContent: {
        type: Boolean,
        default: true,
    },
});

const innerModel = ref(false);

const emit = defineEmits(["update:modelValue"]);
const model = useModel(props, "modelValue", emit);

const show = computed({
    get: () => (model.value !== null ? model.value : innerModel.value),
    set: (value) => {
        if (model.value !== null) {
            model.value = value;
            return;
        }

        innerModel.value = value;
    },
});

const style = computed<any>(() => ({
    "--width": css.toMeasure(props.width),
}));

function onClickContent() {
    if (props.closeOnClickContent) {
        show.value = false;
    }
}
</script>
<template>
    <div class="y-menu" @click="show = !show" :style="style">
        <y-overlay @click.stop="show = false" v-if="show" color="transparent" />

        <div
            class="y-menu-content z-40"
            v-show="show"
            @click.stop="onClickContent"
        >
            <slot />
        </div>
    </div>
</template>
<style lang="scss">
.y-menu {
    --width: auto;
    @apply absolute top-0 right-0;
    @apply min-w-full min-h-full;

    .y-menu-content {
        @apply absolute top-full right-0 mt-1;

        width: var(--width);
    }
}
</style>

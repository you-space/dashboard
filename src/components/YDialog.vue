<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: null,
    },
});

const emit = defineEmits(["update:modelValue"]);

const innerModel = ref(false);

const model = computed({
    get: () =>
        props.modelValue !== null ? props.modelValue : innerModel.value,
    set: (v: boolean) =>
        props.modelValue !== null
            ? emit("update:modelValue", v)
            : (innerModel.value = v),
});
</script>

<template>
    <div v-if="model" class="y-dialog">
        <y-overlay v-if="model" @click.stop="model = false" absolute />
        <div class="z-20">
            <slot />
        </div>
    </div>
</template>

<style lang="scss">
.y-dialog {
    @apply fixed inset-0 flex items-center justify-center z-50;
}
</style>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from "vue";

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
    <div
        v-if="model"
        class="fixed inset-0 flex items-center justify-center z-fullscreen"
    >
        <div
            class="absolute inset-0 bg-black opacity-20"
            style="z-index: -1"
            @click="model = false"
        />
        <slot />
    </div>
</template>

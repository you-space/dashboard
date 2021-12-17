<script setup lang="ts">
import { useModel } from "@/compositions/helpers";
import { computed } from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
    minHeight: {
        type: Number,
        default: 0,
    },
});

const style = computed(() => ({
    minHeight: `${props.minHeight}px`,
}));
const emit = defineEmits(["update:modelValue"]);

const model = useModel(props, "modelValue", emit);
</script>
<template>
    <y-input v-model="model">
        <template #input="{ attrs }">
            <textarea v-model="model" :style="style" v-bind="attrs"></textarea>
        </template>
    </y-input>
</template>

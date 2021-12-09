<script setup lang="ts">
import lodash from "lodash";
import { ref, useAttrs } from "vue";
import { useModel } from "@/compositions/helpers";

const props = defineProps({
    modelValue: {
        type: [File, FileList],
        default: null,
    },
    accept: {
        type: String,
        default: "video/*",
    },
});

const emit = defineEmits(["update:modelValue"]);
const attrs = useAttrs();
const input = ref<HTMLInputElement>();

const model = useModel<File | null>(props, "modelValue", emit);

function selectFile() {
    if (!input.value) return;

    input.value.click();
}

function onChange() {
    if (!input.value) return;

    model.value = lodash.get(input.value, "files[0]", null);
}

const inputAttrs = {
    ...attrs,
    modelValue: undefined,
    onUpdateModelValue: undefined,
};
</script>

<template>
    <div class="y-file flex items-center justify-center">
        <input
            type="file"
            ref="input"
            class="hidden"
            :accept="accept"
            @change="onChange"
        />

        <slot name="activator" :attrs="{ onClick: selectFile }">
            <y-input
                @click="selectFile"
                v-bind="inputAttrs"
                prepend-icon="paperclip"
            />
        </slot>
    </div>
</template>

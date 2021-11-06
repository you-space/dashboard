<template>
    <label :class="['yt-input', $attrs.class]">
        <div v-if="label" :class="`text-${innerColor} mb-2 font-bold`">
            {{ label }}
        </div>

        <slot name="input" :attrs="inputAttrs">
            <input v-model="model" v-bind="inputAttrs" />
        </slot>

        <template v-if="message">
            <div :class="`text-${innerColor}`" class="my-2">
                {{ message }}
            </div>
        </template>

        <slot />
    </label>
</template>
<script lang="ts">
import { pick } from "lodash";
import { useModel } from "@/compositions/helpers";
import { defineComponent, inject, PropType, Ref, ref } from "vue";
import { inputKey } from "./YForm.vue";

interface Rule {
    (value: any): boolean | string;
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [String, Number],
            default: "",
        },
        label: {
            type: String,
            default: "",
        },
        rules: {
            type: Array as PropType<Rule[]>,
            default: () => [],
        },
        color: {
            type: String,
            default: "gray-400",
        },
        focusColor: {
            type: String,
            default: "gray-800",
        },
    },
    setup(props, { emit, attrs }) {
        const inputs = inject(inputKey, null);
        const model = useModel(props, "modelValue", emit);

        const message = ref("");
        const innerColor = ref(props.color);
        const innerFocusColor = ref(props.focusColor);

        function validate() {
            const result = props.rules.reduce<string | boolean>(
                (result, rule) =>
                    result !== true ? result : rule(model.value),
                true
            );

            if (typeof result === "boolean") {
                message.value = "";
                innerColor.value = props.color;
                innerFocusColor.value = props.focusColor;
                return result;
            }

            message.value = result;
            innerColor.value = "red-500";
            innerFocusColor.value = "red-500";

            return result;
        }

        if (inputs && inputs.value) {
            inputs.value.push({
                validate,
            });
        }

        const inputAttrs = {
            ...attrs,
            class: `border-${innerColor.value} focus:border-${innerFocusColor.value}`,
            style: undefined,
            onChange: validate,
        };

        return {
            message,
            model,
            innerColor,
            innerFocusColor,

            inputAttrs,
            pick,

            validate,
        };
    },
});
</script>
<style lang="postcss">
.yt-input {
    @apply flex flex-wrap;
    @apply w-full;
}

.yt-input input {
    @apply focus:outline-none;
    @apply w-full rounded px-4 py-2;
    @apply border border-gray-500;
    @apply dark:focus:bg-gray-500 dark:bg-gray-700 dark:text-white dark:border-gray-700;
    @apply transition-colors;
}
</style>

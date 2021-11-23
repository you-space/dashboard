<template>
    <label :class="['y-input', $attrs.class]" :style="styles">
        <div v-if="label" class="y-input-label">
            {{ label }}
        </div>

        <slot name="input" :attrs="inputAttrs">
            <input v-model="model" v-bind="inputAttrs" :type="type" />
        </slot>

        <template v-if="message">
            <div class="y-input-messages">
                {{ message }}
            </div>
        </template>

        <slot />
    </label>
</template>
<script lang="ts">
import lodash from "lodash";
import { useModel } from "@/compositions/helpers";
import { defineComponent, inject, PropType, ref, computed, watch } from "vue";
import { inputKey } from "./YForm.vue";
import colors from "tailwindcss/colors";

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
        type: {
            type: String,
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
            default: "gray-500",
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
        const error = ref(false);

        function validate() {
            const result = props.rules.reduce<string | boolean>(
                (result, rule) =>
                    result !== true ? result : rule(model.value),
                true
            );

            if (typeof result === "boolean") {
                message.value = "";
                error.value = false;
                return result;
            }

            message.value = result;
            error.value = true;

            return result;
        }

        if (inputs && inputs.value) {
            inputs.value.push({
                validate,
            });
        }

        function getColor(name: string): string {
            const color = lodash.get(colors, name.replace("-", ".") || "");

            return color ? color : name;
        }

        const styles = computed<any>(() => ({
            "--color": error.value
                ? getColor("red-500")
                : getColor(props.color),
        }));

        watch(() => model.value, validate);

        const inputAttrs = {
            ...attrs,
            class: undefined,
            style: undefined,
        };

        return {
            message,
            model,

            inputAttrs,
            styles,

            validate,
        };
    },
});
</script>
<style lang="scss">
.dark .y-input {
    input {
        border-color: var(--dark-color);
        background-color: var(--dark-color);
    }
}

.y-input {
    --color: theme("colors.gray.500");
    --dark-color: theme("colors.gray.700");
    @apply flex flex-wrap;
    @apply w-full;

    .y-input-label {
        @apply font-bold;
        @apply mb-4;
        @apply dark:text-white;
        color: var(--color);
    }

    .y-input-messages {
        @apply my-2;
        color: var(--color);
    }

    input {
        @apply focus:outline-none focus:border-primary;
        @apply w-full rounded px-4 py-2;
        @apply border;
        @apply dark:text-white;
        @apply transition-colors;

        border-color: var(--color);

        &.y-input-error {
            border-color: theme("colors.red.500");
        }
    }
}
</style>

<template>
    <form @submit.prevent="submit">
        <slot />
    </form>
</template>
<script lang="ts">
import { defineComponent, ref, provide, InjectionKey, Ref } from "vue";

export interface YtFormInput {
    validate: () => boolean | string;
}

export const inputKey: InjectionKey<Ref<YtFormInput[]>> = Symbol("form:inputs");

export default defineComponent({
    emits: ["submit"],
    setup(_, { emit }) {
        const inputs = ref<YtFormInput[]>([]);

        provide(inputKey, inputs);

        function submit() {
            const isValid = inputs.value.every(
                (input) => input.validate() === true
            );

            if (isValid) {
                emit("submit");
            }
        }

        return {
            submit,
        };
    },
});
</script>

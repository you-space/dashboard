<template>
    <label class="flex items-center" @click="toggle">
        <div
            class="y-switch"
            :style="styles"
            :class="model ? 'y-switch-active' : ''"
        >
            <input type="checkbox" :value="model" disabled class="hidden" />
            <span class="slide round"></span>
        </div>
        <div
            v-if="label"
            :style="`font-size:${size / 3}px;`"
            :class="`text-${innerColor} ml-2 font-bold`"
        >
            {{ label }}
        </div>
    </label>
</template>
<script lang="ts">
import { useModel } from "@/compositions/helpers";
import { defineComponent, ref } from "vue";

export default defineComponent({
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: "",
        },
        size: {
            type: Number,
            default: 40,
        },
        color: {
            type: String,
            default: "gray-500",
        },
    },
    setup(props, { emit }) {
        const model = useModel<boolean>(props, "modelValue", emit);

        const innerColor = ref(props.color);

        const styles: any = {
            "--size": `${props.size}px`,
        };

        function toggle() {
            model.value = !model.value;
        }

        return {
            model,
            innerColor,
            toggle,
            styles,
        };
    },
});
</script>

<style lang="scss">
.y-switch {
    @apply relative inline-block;
    --size: 60px;
    --height: calc(var(--size) * 0.5667);
    --dot-height: calc(var(--height) * 0.765);
    --color: var(--theme-primary);
    width: var(--size);
    height: var(--height);

    .slide {
        @apply absolute inset-0;
        @apply cursor-pointer;
        @apply transition-all ease-in-out;
        background-color: #ccc;

        &.round {
            border-radius: var(--height);

            &:before {
                border-radius: 50%;
            }
        }

        &:before {
            @apply absolute;
            @apply transition-all ease-in-out;
            content: "";
            height: var(--dot-height);
            width: var(--dot-height);
            left: calc(var(--dot-height) * 0.15);
            bottom: calc(var(--dot-height) * 0.15);
            background-color: white;
        }
    }

    &.y-switch-active {
        .slide {
            background-color: var(--color);
            &:before {
                transform: translateX(var(--dot-height));
            }
        }
    }
}
</style>

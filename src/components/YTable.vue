<script setup lang="ts">
import { PropType, StyleValue } from "vue";
import lodash from "lodash";

export interface Header {
    name: string;
    label: string;
    value: string;
    class?: string;
    format?: (value: any) => string;
    style?: StyleValue;
}

defineProps({
    headers: {
        type: Array as PropType<Header[]>,
        default: () => [],
    },
    items: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
    loading: {
        type: Boolean,
        default: false,
    },
});

function getValue(item: any, header: Header) {
    if (header.format) {
        return header.format(item[header.value]);
    }

    return lodash.get(item, header.value);
}
</script>

<template>
    <table class="y-table">
        <thead v-if="headers.length">
            <tr>
                <th
                    v-for="header in headers"
                    :class="header.class || 'text-left'"
                    :style="header.style"
                >
                    {{ header.label }}
                </th>
            </tr>
        </thead>

        <tbody class="relative">
            <div class="absolute inset-0" v-if="loading">
                <y-progress-bar />
            </div>

            <tr v-if="!items.length">
                <td :colspan="headers.length" class="text-center">No items</td>
            </tr>

            <tr v-for="item in items">
                <td v-for="header in headers">
                    <slot
                        :name="`item-${header.name}`"
                        :item="item"
                        :header="header"
                        :value="getValue(item, header)"
                    >
                        {{ getValue(item, header) }}
                    </slot>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style lang="scss">
.y-table {
    @apply w-full text-sm;

    th,
    td {
        @apply border-b py-3 px-4;
    }
}
</style>

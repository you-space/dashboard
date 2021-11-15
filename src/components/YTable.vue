<script setup lang="ts">
import { PropType } from "vue";
import lodash from "lodash";

export interface Header {
    label: string;
    value: string;
    class?: string;
    format?: (value: any) => string;
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
                        :name="`item-${header.value}`"
                        :item="item"
                        :header="header"
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

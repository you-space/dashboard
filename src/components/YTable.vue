<script setup lang="ts">
import { PropType } from "vue";

export interface Header {
    label: string;
    value: string;
    class?: string;
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
});
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
        <tbody>
            <tr v-if="!items.length">
                <td :colspan="headers.length" class="text-center">No items</td>
            </tr>
            <tr v-for="item in items">
                <td v-for="header in headers">
                    {{ item[header.value] }}
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

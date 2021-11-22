<script setup lang="ts">
import { ref } from "vue";

const loading = ref(false);
const items = ref([]);
const headers = [
    {
        name: "title",
        label: "Title",
        value: "title",
    },
    {
        name: "active",
        label: "Active",
        value: "active",
    },
];

function setProviders() {}
</script>
<template>
    <y-page>
        <y-card>
            <y-card-section>
                <div class="flex w-full items-baseline justify-between mb-10">
                    <div class="font-bold text-2xl">Providers list</div>
                </div>
                <y-table
                    :loading="loading"
                    :headers="headers"
                    :items="items"
                ></y-table>
            </y-card-section>
        </y-card>
    </y-page>
</template>

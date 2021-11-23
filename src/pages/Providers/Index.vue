<script setup lang="ts">
import { ref } from "vue";

import Provider from "@/api/models/provider";
import { useProvidersRepository } from "@/api/repositores";
import { notify } from "@/plugins/notify";

const repository = useProvidersRepository();

const loading = ref(false);
const items = ref<Provider[]>([]);

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
    {
        name: "actions",
        label: "",
        value: "actions",
        class: "w-10",
    },
];

async function setProviders() {
    loading.value = true;

    await repository
        .index()
        .then((response) => (items.value = response.data))
        .finally(() => setTimeout(() => (loading.value = false), 1000));
}

setProviders();

async function toggleProvider(item: Provider) {
    await repository
        .update(item.id, {
            active: !item.active,
        })
        .then((response) => notify.success(response.message))
        .finally(setProviders);
}
</script>

<template>
    <y-page>
        <y-card>
            <y-card-section>
                <div class="flex w-full items-baseline justify-between mb-10">
                    <div class="font-bold text-2xl">Providers list</div>
                </div>
                <y-table :loading="loading" :headers="headers" :items="items">
                    <template #item-active="{ item }">
                        <y-switch
                            :model-value="item.active"
                            @update:model-value="toggleProvider(item)"
                        />
                    </template>

                    <template #item-actions="{ item }">
                        <y-icon
                            name="cog"
                            clickable
                            :to="`/providers/${item.id}`"
                        />
                    </template>
                </y-table>
            </y-card-section>
        </y-card>
    </y-page>
</template>

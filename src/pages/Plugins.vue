<script setup lang="ts">
import { ref } from "vue";
import { notify } from "@/plugins/notify";
import { dialog } from "@/plugins/dialog";
import { usePluginsRepository } from "@/api/repositores";
import Plugin from "@/api/models/plugin";

const repository = usePluginsRepository();

const items = ref<Plugin[]>([]);
const loading = ref(false);

const form = ref({
    dialog: false,
    gitUrl: "",
});

const headers = [
    {
        label: "Name",
        value: "name",
    },
    {
        label: "Description",
        value: "description",
    },
    {
        name: "active",
        label: "Active",
        value: "active",
    },
    {
        name: "actions",
        value: "actions",
    },
];

async function setPlugins() {
    loading.value = true;

    await repository
        .index()
        .then((response) => (items.value = response.data))
        .finally(() => setTimeout(() => (loading.value = false), 1000));
}

setPlugins();

async function updatePlugin(plugin: Plugin, value: boolean) {
    await repository
        .update(plugin.id, { active: value })
        .then(() =>
            notify.add({ message: "Plugin updated", color: "green-500" })
        )
        .finally(() => setPlugins());
}

async function addPlugin() {
    await repository
        .store(form.value.gitUrl)
        .then(() => {
            notify.add({ message: "Plugin added", color: "green-500" });
            form.value.dialog = false;
            form.value.gitUrl = "";
        })
        .finally(() => setPlugins());
}

async function deletePlugin(id: Plugin["id"]) {
    const confirm = await dialog.confirm("Are you sure?");

    if (!confirm) {
        return;
    }

    await repository
        .destroy(id)
        .then((response) =>
            notify.add({ message: response.message, color: "green-500" })
        )
        .finally(setPlugins);
}
</script>
<template>
    <y-page>
        <y-card class="p-6">
            <div class="flex w-full items-baseline justify-between">
                <div class="font-bold mb-8 text-2xl">Plugins list</div>
                <y-btn @click="form.dialog = true"> Add new </y-btn>
            </div>

            <y-table :headers="headers" :items="items" :loading="loading">
                <template #item-active="{ item }">
                    <y-switch
                        :model-value="item.active"
                        @update:model-value="updatePlugin(item, !item.active)"
                    />
                </template>

                <template #item-actions="{ item }">
                    <y-icon
                        name="trash"
                        clickable
                        @click="deletePlugin(item.id)"
                    />
                </template>
            </y-table>
        </y-card>

        <y-dialog v-model="form.dialog">
            <y-card class="max-w-2xl">
                <y-form @submit="addPlugin">
                    <y-card-section class="font-bold text-lg uppercase">
                        Add new
                    </y-card-section>

                    <y-card-section>
                        <y-input
                            v-model="form.gitUrl"
                            label="Type git url"
                            :rules="[$rules.required]"
                            placeholder="https://github.com/:username/:repository"
                        />
                    </y-card-section>

                    <y-card-section>
                        <y-btn type="submit"> Submit </y-btn>
                    </y-card-section>
                </y-form>
            </y-card>
        </y-dialog>
    </y-page>
</template>

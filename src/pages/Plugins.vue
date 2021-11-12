<script setup lang="ts">
import { ref } from "vue";
import { usePlugins, Plugin } from "@/compositions/plugins";
import { notify } from "@/plugins/notify";
import { dialog } from "@/plugins/dialog";

const plugins = usePlugins();

const items = ref<Plugin[]>([]);
const loading = ref(false);

const form = ref({
    dialog: false,
    gitUrl: "",
});

const headers = [
    {
        label: "Title",
        value: "title",
    },
    {
        label: "Description",
        value: "description",
    },
    {
        label: "Active",
        value: "active",
    },
    {
        label: "",
        value: "actions",
    },
];

async function setPlugins() {
    loading.value = true;

    await plugins
        .index()
        .then((response) => (items.value = response.data))
        .finally(() => setTimeout(() => (loading.value = false), 1000));
}

setPlugins();

async function updatePlugin(plugin: Plugin, value: boolean) {
    await plugins
        .update(plugin.id, { active: value })
        .then(() =>
            notify.add({ message: "Plugin updated", color: "green-500" })
        )
        .finally(() => setPlugins());
}

async function addPlugin() {
    await plugins
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

    await plugins
        .destroy(id)
        .then(() => {
            notify.add({ message: "Plugin deleted", color: "green-500" });
            setPlugins();
        })
        .finally(() => setPlugins());
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

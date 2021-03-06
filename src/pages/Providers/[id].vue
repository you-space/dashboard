<script setup lang="ts">
import Provider from "@/api/models/provider";
import { useProvidersRepository } from "@/api/repositores";
import { notify } from "@/plugins/notify";
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const router = useRouter();
const repository = useProvidersRepository();

const originalProvider = ref<Partial<Provider>>({});
const provider = ref<Partial<Provider>>({});

const fieldHaveChange = computed(() =>
    provider.value.fields
        ?.map((field, index) => [
            JSON.stringify(field),
            JSON.stringify(originalProvider.value.fields?.[index]),
        ])
        .some(([value, originalValue]) => value !== originalValue)
);

const importHaveChange = computed(
    () => provider.value.import !== originalProvider.value.import
);

const haveChanges = computed(
    () => fieldHaveChange.value || importHaveChange.value
);

async function setProvider() {
    await repository
        .show(props.id)
        .then((data) => {
            originalProvider.value = JSON.parse(JSON.stringify(data));
            provider.value = data;
        })
        .catch(() => router.push("/providers"));
}

watch(() => props.id, setProvider, { immediate: true });

async function save() {
    await repository
        .update(props.id, provider.value)
        .then((res) => notify.success(res.message))
        .finally(setProvider);
}

async function importNow() {
    await repository
        .import(props.id)
        .then((res) => notify.success(res.message));
}
</script>

<template>
    <y-page>
        <y-card v-if="provider">
            <y-card-section class="align-top">
                <div class="text-xl font-bold mb-2">{{ provider.name }}</div>
                <div class="flex-1"></div>

                <y-btn
                    @click="importNow"
                    class="mr-4"
                    outlined
                    :disabled="haveChanges"
                >
                    import now
                </y-btn>
                <y-btn @click="save">save</y-btn>

                <div class="w-full">{{ provider.description }}</div>
            </y-card-section>

            <y-card-section class="flex flex-wrap">
                <div class="text-lg font-bold mb-8">Settings</div>

                <div
                    class="mb-4 w-full flex items-end"
                    v-for="field in provider.fields"
                    :key="field.name"
                    no-padding
                >
                    <y-input
                        v-model="field.value"
                        :label="field.label"
                        :type="field.encrypted ? 'password' : 'text'"
                        class="mr-8 w-8/12"
                    />
                    <y-switch
                        v-model="field.encrypted"
                        label="Encrypt"
                        style="height: 44px"
                    />
                </div>
            </y-card-section>

            <!-- <y-card-section>
                <div class="text-lg font-bold mb-8 w-full">
                    Import frequency
                </div>

                <div class="flex flex-wrap">
                    <y-switch
                        :model-value="provider.import == 'none'"
                        @click="provider.import = 'none'"
                        class="w-full mb-6"
                        label="None"
                    />
                    <y-switch
                        :model-value="provider.import == 'daily'"
                        @click="provider.import = 'daily'"
                        class="w-full mb-6"
                        label="Daily"
                    />
                    <y-switch
                        :model-value="provider.import == 'weekly'"
                        @click="provider.import = 'weekly'"
                        class="w-full mb-6"
                        label="Weekly"
                    />
                    <y-switch
                        :model-value="provider.import == 'monthly'"
                        @click="provider.import = 'monthly'"
                        class="w-full mb-6"
                        label="Monthly"
                    />
                </div>
            </y-card-section> -->
        </y-card>
    </y-page>
</template>

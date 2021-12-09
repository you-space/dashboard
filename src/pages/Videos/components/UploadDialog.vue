<script setup lang="ts">
import { ref } from "vue";
import { useModel } from "@/compositions/helpers";
import { useVideosRepository } from "@/api/repositores";
import { notify } from "@/plugins/notify";

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["update:modelValue"]);

const model = useModel(props, "modelValue", emit);
const repository = useVideosRepository();
const video = ref({
    file: null as null | File,
});

async function submit() {
    if (!video.value.file) return;

    await repository.upload(video.value.file).then(({ id, message }) => {
        notify.success(message);

        // go to video single page
    });
}
</script>
<template>
    <y-dialog v-model="model">
        <y-card class="w-full max-w-2xl">
            <y-card-section class="font-bold text-lg">
                Upload video
            </y-card-section>

            <y-form @submit="submit">
                <y-card-section class="justify-center">
                    <y-file class="w-full" v-model="video.file">
                        <template #activator="{ attrs }">
                            <y-card
                                v-bind="attrs"
                                class="
                                    border-2 border-dashed
                                    w-full
                                    mb-4
                                    cursor-pointer
                                "
                            >
                                <y-card-section class="justify-center">
                                    <div class="w-full mb-6 text-center">
                                        <y-icon
                                            name="file-video"
                                            class="text-7xl"
                                        />
                                    </div>

                                    <y-btn
                                        v-if="!video.file"
                                        outlined
                                        size="sm"
                                        label="Select a video"
                                    />

                                    <div v-else>
                                        {{ video.file.name }}
                                    </div>
                                </y-card-section>
                            </y-card>
                        </template>
                    </y-file>

                    <y-btn label="submit" />
                </y-card-section>
            </y-form>
        </y-card>
    </y-dialog>
</template>

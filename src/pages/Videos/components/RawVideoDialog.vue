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

const repository = useVideosRepository();
const model = useModel(props, "modelValue", emit);

const video = ref({
    src: "",
    videoId: "",
    source: "",
});

async function submit() {
    await repository
        .store({
            source: video.value.source,
            sourceId: video.value.videoId,
            src: video.value.src,
        })
        .then(({ message }) => {
            notify.success(message);

            // go to video single page
        });
}
</script>

<template>
    <y-dialog v-model="model">
        <y-card class="w-full max-w-lg">
            <y-card-section class="font-bold text-gray-700 text-xl">
                New video raw
            </y-card-section>
            <y-form @submit="submit">
                <y-card-section class="justify-center">
                    <y-input
                        v-model="video.src"
                        placeholder="https://www.youtube.com/embed/lVycj0flLgA"
                        class="mb-4"
                        label="Video src link"
                        :rules="[$rules.required]"
                    />
                    <y-input
                        v-model="video.videoId"
                        placeholder="lVycj0flLgA"
                        class="mb-4"
                        label="Video id"
                        :rules="[$rules.required]"
                    />
                    <y-input
                        v-model="video.source"
                        class="mb-4"
                        label="Source name"
                        placeholder="youtube"
                        :rules="[$rules.required]"
                    />

                    <y-btn label="submit" type="submit" />
                </y-card-section>
            </y-form>
        </y-card>
    </y-dialog>
</template>

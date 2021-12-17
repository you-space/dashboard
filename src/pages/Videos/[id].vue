<script setup lang="ts">
import Video from "@/api/models/video";
import { useVideosRepository } from "@/api/repositores";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    id: {
        type: [Number, String],
        required: true,
    },
});

const router = useRouter();
const repository = useVideosRepository();

const video = ref<Video>();

async function setVideo() {
    return repository
        .show(Number(props.id))
        .then((data) => (video.value = data))
        .catch(() => router.go(-1));
}

setVideo();
</script>

<template>
    <y-page class="flex" v-if="video">
        <div class="w-9/12 p-2">
            <y-card>
                <y-card-section>
                    <y-input v-model="video.title" label="Title" class="mb-4" />
                    <y-textarea
                        v-model="video.description"
                        label="Description"
                        :min-height="350"
                    />
                </y-card-section>

                <y-card-section>
                    <div class="font-bold w-full mb-4">Thumbnail</div>

                    <div class="pr-2">
                        <div
                            style="width: 120px; height: 80px"
                            class="
                                bg-gray-400
                                text-white text-2xl
                                flex
                                items-center
                                justify-center
                            "
                        >
                            <y-icon name="plus" />
                        </div>
                    </div>

                    <div v-for="i in 3" :key="i" class="px-2">
                        <y-img
                            height="80"
                            width="120"
                            src="https://picsum.photos/200/300"
                        />
                    </div>
                </y-card-section>
            </y-card>
        </div>

        <div class="w-3/12 p-2">
            <y-card>
                <y-card-section>
                    <y-video :src="video.src" height="250" class="mb-4" />

                    <y-input
                        label="Visibility"
                        v-model="video.visibility"
                        class="mb-4"
                    />

                    <y-input
                        label="Published date"
                        v-model="video.publishedAt"
                        class="mb-4"
                    />
                    <y-input label="Source" v-model="video.source" disabled />
                </y-card-section>
            </y-card>
        </div>
    </y-page>
</template>

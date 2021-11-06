<script setup lang="ts">
import { ref } from "vue";
import { useVideos, Video } from "@/compositions/videos";

const service = useVideos();

const videos = ref<Video[]>([]);

async function setVideos() {
    const { data } = await service.index();

    videos.value = data;
}

setVideos();
</script>

<template>
    <div v-for="video in videos" :key="video.id">
        {{ video.title }}
    </div>
</template>

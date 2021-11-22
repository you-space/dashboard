<script setup lang="ts">
import { ref, watch } from "vue";

import { useMoment } from "@/plugins/moment";
import { dialog } from "@/plugins/dialog";
import { notify } from "@/plugins/notify";

import Video from "@/api/models/video";
import { useVideoRepository } from "@/api/repositores";

interface VideoWithThumbnail extends Video {
    thumbnail?: any;
}

const repository = useVideoRepository();
const moment = useMoment();

const loading = ref(false);

const meta = ref({
    currentPage: 1,
    lastPage: 1,
});

const items = ref<VideoWithThumbnail[]>();

const headers = [
    {
        label: "#",
        value: "id",
    },
    {
        name: "thumbnail",
        label: "",
        value: "thumbnail",
        style: {
            width: "120px",
        },
    },
    {
        label: "Title",
        value: "title",
    },
    {
        label: "Source",
        value: "source",
    },
    {
        label: "Visibility",
        value: "visibility",
    },
    {
        label: "Views",
        value: "views",
        format: (views: Video["views"]) =>
            views.reduce((all, current) => all + current.count, 0),
    },
    {
        label: "Published At",
        value: "publishedAt",
        format: (publishedAt: Video["publishedAt"]) =>
            moment(publishedAt).format("L LT"),
    },
    {
        name: "actions",
    },
];

async function setVideos() {
    loading.value = true;

    await repository
        .index({
            page: meta.value.currentPage,
            include: ["images", "views"],
        })
        .then((response) => {
            items.value = response.data.map((v) => ({
                ...v,
                thumbnail: v.images.find(
                    (img) => img.name === "thumbnail:default"
                ),
            }));

            meta.value.lastPage = response.meta.lastPage;
        })
        .finally(() => setTimeout(() => (loading.value = false), 800));
}

watch(() => meta.value.currentPage, setVideos, {
    immediate: true,
});

async function deleteVideo(id: Video["id"]) {
    const confirm = await dialog.confirm("Are you sure?");

    if (!confirm) {
        return;
    }

    await repository
        .destroy(id)
        .then((response) =>
            notify.add({ message: response.message, color: "green-500" })
        )
        .finally(setVideos);
}
</script>

<template>
    <y-page>
        <y-card>
            <y-card-section>
                <div class="flex w-full items-baseline justify-between mb-10">
                    <div class="font-bold text-2xl">Videos list</div>
                </div>

                <y-table :loading="loading" :headers="headers" :items="items">
                    <template #item-thumbnail="{ value }">
                        <y-img v-if="value" :src="value.src" :height="60" />
                        <div
                            v-else
                            class="
                                w-full
                                bg-gray-500
                                text-white
                                flex
                                items-center
                                justify-center
                            "
                            style="height: 60px"
                        >
                            <y-icon name="video" />
                        </div>
                    </template>

                    <template #item-actions="{ item }">
                        <y-icon
                            clickable
                            name="trash"
                            @click="deleteVideo(item.id)"
                        />
                    </template>
                </y-table>

                <y-pagination
                    v-model="meta.currentPage"
                    :total-pages="meta.lastPage"
                    class="my-8"
                />
            </y-card-section>
        </y-card>
    </y-page>
</template>

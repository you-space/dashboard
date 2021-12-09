<script lang="ts" setup>
import { computed } from "vue";
import { useModel } from "@/compositions/helpers";

const props = defineProps({
    modelValue: {
        type: Number,
        default: 1,
    },
    totalPages: {
        type: Number,
        default: 1,
    },
    length: {
        type: Number,
        default: 3,
    },
    color: {
        type: String,
        default: "gray-500",
    },
    selectedColor: {
        type: String,
        default: "gray-500",
    },
});

const emit = defineEmits(["update:modelValue"]);

const model = useModel(props, "modelValue", emit);

const visiblePages = computed(() => {
    const pages = Array.from({ length: props.totalPages }, (_, i) => i + 1);
    const length = Math.floor(props.length / 2);

    const current = pages.indexOf(props.modelValue);

    const start = Math.max(0, current - length);
    const end = Math.min(pages.length, current + length + 1);

    if (model.value === 1) {
        return pages.slice(0, props.length);
    }

    if (model.value === props.totalPages) {
        return pages.slice(
            pages.indexOf(props.totalPages) - length - 1,
            pages.indexOf(props.totalPages) + 1
        );
    }

    return pages.slice(start, end);
});
</script>
<template>
    <div class="y-pagination">
        <y-btn
            :disabled="model == 1"
            size="sm"
            :color="color"
            outlined
            @click="model--"
        >
            <y-icon name="chevron-left" />
        </y-btn>

        <template v-if="!visiblePages.includes(1)">
            <y-btn size="sm" :color="color" outlined @click="model = 1">
                {{ 1 }}
            </y-btn>

            <y-icon class="mx-2" name="ellipsis-h" />
        </template>

        <y-btn
            v-for="page in visiblePages"
            :key="page"
            size="sm"
            :color="model === page ? selectedColor : color"
            :outlined="model !== page"
            @click="model = page"
        >
            {{ page }}
        </y-btn>

        <template v-if="!visiblePages.includes(totalPages)">
            <y-icon class="mx-2" name="ellipsis-h" />

            <y-btn
                size="sm"
                :color="color"
                outlined
                @click="model = totalPages"
            >
                {{ totalPages }}
            </y-btn>
        </template>

        <y-btn
            :disabled="model == totalPages"
            size="sm"
            :color="color"
            outlined
            @click="model++"
        >
            <y-icon name="chevron-right" />
        </y-btn>
    </div>
</template>

<style lang="scss">
.y-pagination {
    @apply flex w-full justify-center items-end;

    .y-btn {
        @apply h-full mx-1;
    }
}
</style>

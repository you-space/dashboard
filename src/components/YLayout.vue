<template>
    <div class="h-screen flex flex-wrap" @resize="resize">
        <slot />
    </div>
</template>
<script lang="ts">
import {
    defineComponent,
    provide,
    ref,
    onBeforeUnmount,
    onMounted,
    watch,
} from "vue";

interface LayoutElement {
    height?: number | string;
    width?: number | string;
}

export const headerKey = "layout:header";
export const drawerKey = "layout:drawer";
export const contentKey = "layout:content";

export default defineComponent({
    setup() {
        const header = ref<LayoutElement>({});
        const drawer = ref<LayoutElement>({});
        const content = ref<LayoutElement>({});

        provide(headerKey, header);
        provide(drawerKey, drawer);
        provide(contentKey, content);

        onMounted(() => {
            window.addEventListener("resize", resize);
        });

        onBeforeUnmount(() => {
            window.removeEventListener("resize", resize);
        });

        function resize() {
            if (drawer.value && header.value) {
                drawer.value.height = `calc(100% - ${header.value.height}px)`;
            }

            if (content.value && drawer.value) {
                content.value.height = `calc(100% - ${header.value.height}px)`;
                content.value.width = `calc(100% - ${drawer.value.width}px)`;
            }
        }

        watch(() => header.value.height, resize);
        watch(() => drawer.value.width, resize);

        return {
            drawer,
            content,
            resize,
        };
    },
});
</script>

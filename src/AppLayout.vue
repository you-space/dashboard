<template>
    <router-view v-slot="{ Component, route }">
        <component :is="getLayout(Component)" v-if="Component">
            <component
                :is="Component"
                :key="route.meta.usePathKey ? route.path : undefined"
            />
        </component>
    </router-view>
</template>
//
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        function getLayout(component: any) {
            if (!component.type.layout) {
                return "layout-default";
            }
            return `layout-${component.type.layout}`;
        }

        return { getLayout };
    },
});
</script>

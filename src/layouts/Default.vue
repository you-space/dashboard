<script lang="ts" setup>
import { ref } from "vue";
const drawer = ref(true);
const pages = ref([
    {
        label: "Home",
        to: "/",
        icon: "home",
    },
]);
</script>
<template>
    <y-layout>
        <y-layout-toolbar>
            <y-icon
                clickable
                style="width: 72px"
                class="text-center"
                name="bars"
                @click="drawer = !drawer"
            />

            <div class="font-bold text-lg">
                {{ $store.state.app.name }}
            </div>
        </y-layout-toolbar>
        <y-layout-drawer v-model="drawer">
            <y-list>
                <y-item
                    v-for="(page, index) in pages"
                    :key="index"
                    :to="page.to"
                    class="overflow-hidden"
                    no-padding
                >
                    <y-icon
                        :name="page.icon"
                        style="width: 72px"
                        class="text-center py-3"
                    />

                    <div v-show="drawer">
                        {{ page.label }}
                    </div>
                </y-item>
            </y-list>
        </y-layout-drawer>
        <y-layout-content>
            <slot />
        </y-layout-content>
    </y-layout>
</template>

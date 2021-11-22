<script lang="ts" setup>
import { ref } from "vue";
const drawer = ref(true);
const pages = ref([
    {
        label: "Home",
        to: "/",
        icon: "home",
    },
    {
        label: "Videos",
        to: "/videos",
        icon: "play-circle",
    },
    {
        label: "Plugins",
        to: "/plugins",
        icon: "dice",
    },
    {
        label: "Providers",
        to: "/providers",
        icon: "vector-square",
    },
]);
</script>
<template>
    <y-layout>
        <y-layout-toolbar>
            <div style="width: 72px" class="flex items-center justify-center">
                <y-icon clickable name="bars" @click="drawer = !drawer" />
            </div>

            <a href="/" class="font-bold text-lg">
                {{ $store.state.app.name }}
            </a>

            <div class="flex-1"></div>

            <div style="width: 72px" class="flex items-center justify-center">
                <y-icon
                    clickable
                    :name="$store.state.app.darkMode ? 'sun' : 'moon'"
                    @click="
                        $store.commit(
                            'app/setDarkMode',
                            !$store.state.app.darkMode
                        )
                    "
                />
            </div>
        </y-layout-toolbar>
        <y-layout-drawer v-model="drawer">
            <y-list>
                <y-item
                    v-for="(page, index) in pages"
                    :key="index"
                    :to="page.to"
                    class="overflow-hidden py-2"
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
        <y-layout-content class="bg-gray-100">
            <slot />
        </y-layout-content>
    </y-layout>
</template>

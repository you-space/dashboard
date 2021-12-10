<script lang="ts" setup>
import { useStore } from "@/store";
import { ref, onMounted } from "vue";

const store = useStore();
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

function toggleDarkMode() {
    store.commit("app/setDarkMode", !store.state.app.darkMode);
}

function toggleDrawer(value: boolean) {
    drawer.value = value;

    localStorage.setItem("theme:drawer:show", value.toString());
}

onMounted(() => {
    const show = localStorage.getItem("theme:drawer:show");

    if (show) {
        toggleDrawer(show === "true");
    }
});
</script>
<template>
    <y-layout>
        <y-layout-toolbar>
            <div style="width: 72px" class="flex items-center justify-center">
                <y-btn
                    @click="toggleDrawer(!drawer)"
                    text
                    color="gray-500"
                    dark-color="white"
                >
                    <y-icon name="bars" />
                </y-btn>
            </div>

            <a href="/" class="font-bold text-lg">
                {{ $store.state.app.name }}
            </a>

            <div class="flex-1"></div>

            <div style="width: 72px" class="flex items-center justify-center">
                <y-btn
                    text
                    color="gray-500"
                    dark-color="white"
                    @click="toggleDarkMode"
                >
                    <y-icon
                        :name="$store.state.app.darkMode ? 'sun' : 'moon'"
                    />
                </y-btn>
            </div>
        </y-layout-toolbar>
        <y-layout-drawer v-model="drawer">
            <y-list>
                <y-item
                    v-for="(page, index) in pages"
                    :key="index"
                    :to="page.to"
                    class="overflow-hidden py-3"
                    no-padding
                >
                    <y-icon
                        :name="page.icon"
                        style="width: 72px"
                        class="text-center"
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

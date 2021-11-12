<script setup lang="ts">
// import { ref } from 'vue'
import Logo from "@/assets/logo.svg";
</script>

<template>
    <div class="flex items-center justify-center h-full w-full">
        <div class="text-center">
            <img :src="Logo" :alt="$store.state.app.name" class="mb-4" />
            <div>Home page</div>
        </div>
    </div>
</template>

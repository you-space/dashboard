<script setup lang="ts">
import { dialog } from "@/plugins/dialog";
</script>

<template>
    <router-view />

    <y-dialog
        v-for="d in dialog.components.value"
        model-value="d.model"
        @update:model-value="d.onCancel"
        :key="d.id"
    >
        <y-card class="max-w-lg">
            <y-card-section v-if="d.title" class="font-bold text-lg uppercase">
                {{ d.title }}
            </y-card-section>

            <y-card-section v-if="d.content">
                {{ d.content }}
            </y-card-section>

            <y-card-section class="justify-end">
                <y-btn @click="d.onCancel" class="mr-2" color="red-500">
                    Cancel
                </y-btn>
                <y-btn @click="d.onConfirm" color="green-500"> Confirm </y-btn>
            </y-card-section>
        </y-card>
    </y-dialog>
</template>

<script setup lang="ts">
defineProps({
    padding: {
        type: String,
        default: "6",
    },
});
</script>
<template>
    <div
        class="h-full-w-full overflow-auto"
        :class="[padding ? `p-${padding}` : '']"
    >
        <slot />
    </div>
</template>
